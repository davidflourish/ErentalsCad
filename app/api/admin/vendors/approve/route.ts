import { requireAuth, logAuditAction } from '@/lib/rbac'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    await requireAuth(['super_admin'])

    const { vendorId } = await request.json()

    if (!vendorId) {
      return NextResponse.json({ error: 'Missing vendorId' }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from('profiles')
      .update({
        vendor_status: 'approved',
        approved_at: new Date().toISOString(),
      })
      .eq('id', vendorId)

    if (error) throw error

    // Log audit action
    await logAuditAction('vendor_approved', 'vendor', vendorId)

    // TODO: Send approval email to vendor

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Vendor approval error:', error)
    return NextResponse.json({ error: 'Failed to approve vendor' }, { status: 500 })
  }
}
