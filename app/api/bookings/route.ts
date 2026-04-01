import { createClient } from '@/lib/supabase/server'
import { sendBookingConfirmation } from '@/lib/email-service'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { propertyId, checkInDate, checkOutDate, totalPrice, guestName, guestEmail, arrondissement } =
      await request.json()

    // Validate input
    if (!propertyId || !checkInDate || !checkOutDate || !totalPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const checkIn = new Date(checkInDate)
    const checkOut = new Date(checkOutDate)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))

    if (nights <= 0) {
      return NextResponse.json({ error: 'Invalid dates' }, { status: 400 })
    }

    // Create booking in database
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        property_id: propertyId,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        total_price: totalPrice,
        status: 'pending_payment',
        guest_name: guestName || user.user_metadata?.full_name || 'Guest',
        guest_email: guestEmail || user.email,
        number_of_nights: nights,
      })
      .select()

    if (bookingError) {
      console.error('[v0] Booking creation error:', bookingError)
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }

    // Send confirmation email
    try {
      await sendBookingConfirmation({
        guestName: guestName || user.user_metadata?.full_name || 'Guest',
        guestEmail: guestEmail || user.email || '',
        propertyName: 'FlourishParisNest Apartment',
        checkInDate: checkIn.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        checkOutDate: checkOut.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        totalPrice,
        bookingId: booking[0]?.id || 'BOOKING-' + Date.now(),
        nights,
        arrondissement: arrondissement || 'Paris',
      })
    } catch (emailError) {
      console.error('[v0] Email sending failed, but booking created:', emailError)
      // Don't fail the booking if email fails
    }

    return NextResponse.json(
      {
        success: true,
        booking: booking[0],
        message: 'Booking created successfully. Check your email for confirmation.',
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('[v0] Booking API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch user's bookings
    const { data: bookings, error } = await supabase.from('bookings').select('*').eq('user_id', user.id).order('created_at', { ascending: false })

    if (error) {
      console.error('[v0] Bookings fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
    }

    return NextResponse.json({ bookings }, { status: 200 })
  } catch (error) {
    console.error('[v0] GET Booking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
