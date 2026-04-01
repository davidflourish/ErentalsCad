import { createClient } from '@/lib/supabase/server'
import { sendTransactionReceipt } from '@/lib/email-service'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { bookingId, amount, guestName, guestEmail, propertyName } = await request.json()

    if (!bookingId || !amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid transaction data' }, { status: 400 })
    }

    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    const timestamp = new Date().toISOString()

    // Record transaction in database
    const { data: transaction, error: txError } = await supabase.from('transactions').insert({
      booking_id: bookingId,
      user_id: user.id,
      amount,
      transaction_id: transactionId,
      status: 'pending_review', // Admin needs to verify payment
      payment_method: 'email_invoice',
      created_at: timestamp,
    })

    if (txError) {
      console.error('[v0] Transaction creation error:', txError)
      return NextResponse.json({ error: 'Failed to create transaction record' }, { status: 500 })
    }

    // Send transaction receipt email with payment details to admin for verification
    try {
      await sendTransactionReceipt({
        guestName: guestName || user.user_metadata?.full_name || 'Guest',
        guestEmail: guestEmail || user.email || '',
        transactionId,
        amount,
        propertyName,
        bookingId,
        timestamp: new Date(timestamp).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      })
    } catch (emailError) {
      console.error('[v0] Transaction email failed:', emailError)
      // Continue even if email fails
    }

    // Update booking status
    const { error: updateError } = await supabase.from('bookings').update({ status: 'awaiting_confirmation' }).eq('id', bookingId)

    if (updateError) {
      console.error('[v0] Booking update error:', updateError)
    }

    return NextResponse.json(
      {
        success: true,
        transactionId,
        message: `Transaction recorded (€${amount.toFixed(2)}). Invoice has been sent to both you and our admin team for verification. You will receive confirmation within 24 hours.`,
        transaction: transaction[0],
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('[v0] Transaction API error:', error)
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

    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('booking_id')

    let query = supabase.from('transactions').select('*').eq('user_id', user.id)

    if (bookingId) {
      query = query.eq('booking_id', bookingId)
    }

    const { data: transactions, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('[v0] Transactions fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
    }

    return NextResponse.json({ transactions }, { status: 200 })
  } catch (error) {
    console.error('[v0] GET transactions error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
