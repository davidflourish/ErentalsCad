'use server'

import emailjs from '@emailjs/nodejs'

/**
 * Server-side email handler for booking inquiries
 * Keeps EmailJS configuration secure on the server
 */

export async function sendBookingInquiryEmail(params: {
  user_name: string
  user_email: string
  phone: string
  check_in: string
  check_out: string
  guests: string
  requests: string
  property: string
  price: string
  location: string
  registration: string
}) {
  try {
    // Initialize EmailJS on server
    emailjs.init({
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      privateKey: process.env.EMAILJS_PRIVATE_KEY,
    })

    // Send email using server-side initialization
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_gjpcqd6',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'l5dl0vl',
      {
        ...params,
      }
    )

    console.log('[v0] Server: Email sent successfully', response)

    return {
      success: true,
      messageId: response.status,
    }
  } catch (error) {
    console.error('[v0] Server: Email send error:', error)
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Failed to send booking inquiry email'
    )
  }
}
