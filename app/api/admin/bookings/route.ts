import { requireAuth } from '@/lib/rbac'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    await requireAuth(['super_admin'])

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    const supabase = await createClient()

    let query = supabase.from('bookings').select(
      `
      id,
      property_id,
      user_id,
      check_in_date,
      check_out_date,
      total_price,
      status,
      guest_name,
      guest_email,
      created_at,
      properties:property_id(name),
      profiles:user_id(first_name, last_name)
    `
    )

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    const { data: bookings, error } = await query.order('created_at', { ascending: false })

    if (error) throw error

    // Transform data for display
    const transformedBookings = bookings?.map((booking: any) => ({
      id: booking.id,
      property_name: booking.properties?.name || 'Unknown Property',
      guest_name: booking.guest_name || `${booking.profiles?.first_name || ''} ${booking.profiles?.last_name || ''}`.trim(),
      guest_email: booking.guest_email || 'N/A',
      check_in: booking.check_in_date,
      check_out: booking.check_out_date,
      total_price: booking.total_price,
      status: booking.status,
      created_at: booking.created_at,
    }))

    return NextResponse.json(transformedBookings)
  } catch (error) {
    console.error('[v0] Bookings API error:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
}
