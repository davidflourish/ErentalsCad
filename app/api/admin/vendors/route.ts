import { requireAuth } from '@/lib/rbac'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await requireAuth(['super_admin'])

    const supabase = await createClient()

    const { data: vendors, error } = await supabase
      .from('profiles')
      .select('id, business_name, email, vendor_status, created_at')
      .neq('vendor_status', 'none')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(vendors || [])
  } catch (error) {
    console.error('[v0] Vendors API error:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
}
