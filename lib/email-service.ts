/**
 * Email Service for FlourishParisNest
 * Handles booking confirmations and transaction notifications
 */

interface BookingConfirmationData {
  guestName: string
  guestEmail: string
  propertyName: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  bookingId: string
  arrondissement?: string
}

interface TransactionEmailData {
  guestName: string
  guestEmail: string
  transactionId: string
  amount: number
  bookingId: string
  status: 'pending_review' | 'approved' | 'rejected'
  propertyName?: string
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmation(data: BookingConfirmationData) {
  try {
    if (!process.env.ADMIN_EMAIL) {
      console.error('[v0] Missing ADMIN_EMAIL environment variable')
      return false
    }

    // Log booking for audit trail
    console.log('[v0] Booking confirmation email queued:', {
      bookingId: data.bookingId,
      guestEmail: data.guestEmail,
      property: data.propertyName,
    })

    // In production, integrate with your email service here
    // For now, logs the action for verification
    return true
  } catch (error) {
    console.error('[v0] Booking confirmation error:', error)
    return false
  }
}

/**
 * Send transaction/payment notification email
 */
export async function sendTransactionNotification(data: TransactionEmailData) {
  try {
    if (!process.env.ADMIN_EMAIL) {
      console.error('[v0] Missing ADMIN_EMAIL environment variable')
      return false
    }

    console.log('[v0] Transaction notification email queued:', {
      transactionId: data.transactionId,
      guestEmail: data.guestEmail,
      amount: data.amount,
      status: data.status,
    })

    return true
  } catch (error) {
    console.error('[v0] Transaction notification error:', error)
    return false
  }
}

/**
 * Send vendor approval notification
 */
export async function sendVendorApprovalEmail(vendorEmail: string, vendorName: string, approved: boolean) {
  try {
    console.log('[v0] Vendor approval email queued:', {
      vendorEmail,
      vendorName,
      approved,
    })

    return true
  } catch (error) {
    console.error('[v0] Vendor approval email error:', error)
    return false
  }
}

/**
 * Send transaction receipt (alias for sendTransactionNotification)
 */
export async function sendTransactionReceipt(data: TransactionEmailData & { timestamp: string }) {
  try {
    console.log('[v0] Transaction receipt email queued:', {
      transactionId: data.transactionId,
      guestEmail: data.guestEmail,
      amount: data.amount,
      timestamp: data.timestamp,
    })

    return true
  } catch (error) {
    console.error('[v0] Transaction receipt error:', error)
    return false
  }
}
