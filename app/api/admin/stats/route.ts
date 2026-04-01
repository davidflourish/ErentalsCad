import { requireAuth } from '@/lib/rbac'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await requireAuth(['super_admin'])

    const supabase = await createClient()

    // Fetch stats from profiles with vendor_status
    const [
      { count: totalVendors },
      { count: approvedVendors },
      { count: pendingVendors },
      { count: totalProperties },
      { count: totalBookings },
    ] = await Promise.all([
      supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true })
        .neq('vendor_status', 'none'),
      supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true })
        .eq('vendor_status', 'approved'),
      supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true })
        .eq('vendor_status', 'pending'),
      supabase.from('properties').select('id', { count: 'exact', head: true }).eq('active', true),
      supabase.from('bookings').select('id', { count: 'exact', head: true }),
    ])

    // Calculate revenue
    const { data: bookings } = await supabase
      .from('bookings')
      .select('total_price')
      .eq('status', 'confirmed')

    const revenue = bookings?.reduce((sum, b) => sum + (b.total_price || 0), 0) || 0

    return NextResponse.json({
      totalVendors: totalVendors || 0,
      approvedVendors: approvedVendors || 0,
      pendingVendors: pendingVendors || 0,
      totalProperties: totalProperties || 0,
      totalBookings: totalBookings || 0,
      revenue,
    })
  } catch (error) {
    console.error('[v0] Stats API error:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
}
