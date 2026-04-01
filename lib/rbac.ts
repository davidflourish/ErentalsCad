import { createClient } from '@/lib/supabase/server'

export type UserRole = 'guest' | 'vendor' | 'super_admin'

interface UserContext {
  userId: string | null
  email: string | null
  role: UserRole
  vendorId: string | null
}

/**
 * Get current user's role and context
 */
export async function getUserContext(): Promise<UserContext> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      userId: null,
      email: null,
      role: 'guest',
      vendorId: null,
    }
  }

  // Check if super admin
  if (user.email === process.env.ADMIN_EMAIL || user.user_metadata?.is_admin) {
    return {
      userId: user.id,
      email: user.email || null,
      role: 'super_admin',
      vendorId: null,
    }
  }

  // Check if vendor - check profiles table for vendor_status
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, vendor_status')
    .eq('id', user.id)
    .single()

  if (profile && profile.vendor_status === 'approved') {
    return {
      userId: user.id,
      email: user.email || null,
      role: 'vendor',
      vendorId: user.id,
    }
  }

  // Default to guest
  return {
    userId: user.id,
    email: user.email || null,
    role: 'guest',
    vendorId: null,
  }
}

/**
 * Check if user has permission to perform action
 */
export async function checkPermission(requiredRole: UserRole[]): Promise<boolean> {
  const context = await getUserContext()
  return requiredRole.includes(context.role)
}

/**
 * Protect API routes
 */
export async function requireAuth(requiredRole?: UserRole[]) {
  const context = await getUserContext()

  if (!context.userId) {
    throw new Error('Unauthorized: Not authenticated')
  }

  if (requiredRole && !requiredRole.includes(context.role)) {
    throw new Error('Forbidden: Insufficient permissions')
  }

  return context
}

/**
 * Get vendor profile if vendor
 */
export async function getVendorProfile() {
  const context = await getUserContext()

  if (context.role !== 'vendor' || !context.vendorId) {
    throw new Error('Forbidden: Not a vendor')
  }

  const supabase = await createClient()

  const { data: vendor, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('id', context.vendorId)
    .single()

  if (error) {
    throw new Error('Failed to fetch vendor profile')
  }

  return vendor
}

/**
 * Log admin action to audit trail
 */
export async function logAuditAction(
  action: string,
  entityType: 'vendor' | 'property' | 'booking',
  entityId: string,
  changes?: Record<string, unknown>
) {
  const context = await getUserContext()

  if (context.role !== 'super_admin') {
    throw new Error('Forbidden: Only admins can log actions')
  }

  const supabase = await createClient()

  const { error } = await supabase.from('audit_logs').insert({
    admin_id: context.userId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    changes: changes || null,
  })

  if (error) {
    console.error('[v0] Audit log error:', error)
  }
}
