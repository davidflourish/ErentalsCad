'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { BookingReceipt } from '@/components/paris-rental/booking-receipt'
import { Button } from '@/components/ui/button'
import { Check, Download, Home, Mail } from 'lucide-react'

interface BookingData {
  id: string
  propertyName: string
  propertyAddress: string
  arrondissement: string
  checkInDate: string
  checkOutDate: string
  nights: number
  pricePerNight: number
  totalPrice: number
  guestName: string
  guestEmail: string
  transactionId: string
  bookingDate: string
}

export default function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showReceipt, setShowReceipt] = useState(false)

  useEffect(() => {
    // Get booking data from URL params or session storage
    const bookingId = searchParams.get('bookingId')
    const propertyName = searchParams.get('propertyName') || 'Luxury Parisian Apartment'
    const propertyAddress = searchParams.get('address') || '75 Rue de Rivoli, 75004 Paris'
    const arrondissement = searchParams.get('arrondissement') || '4th'
    const checkIn = searchParams.get('checkIn') || new Date().toISOString().split('T')[0]
    const checkOut = searchParams.get('checkOut') || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const pricePerNight = parseFloat(searchParams.get('pricePerNight') || '150')
    const guestName = searchParams.get('guestName') || 'Guest'
    const guestEmail = searchParams.get('guestEmail') || ''
    const transactionId = searchParams.get('transactionId') || `TXN-${Date.now()}`

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    const totalPrice = nights * pricePerNight

    const data: BookingData = {
      id: bookingId || `BK-${Date.now()}`,
      propertyName,
      propertyAddress,
      arrondissement,
      checkInDate: checkInDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      checkOutDate: checkOutDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      nights,
      pricePerNight,
      totalPrice: Math.round(totalPrice * 100) / 100,
      guestName,
      guestEmail,
      transactionId,
      bookingDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    }

    setBookingData(data)
    setIsLoading(false)
  }, [searchParams])

  const handleDownloadReceipt = () => {
    const element = document.getElementById('receipt-content')
    if (!element) return

    const opt = {
      margin: 10,
      filename: `FlourishParisNest-Receipt-${bookingData?.transactionId}.pdf`,
      image: { type: 'image/png', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    }

    // For now, we'll use a simple print approach
    const printWindow = window.open('', '', 'height=600,width=800')
    if (printWindow) {
      printWindow.document.write(element.innerHTML)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleContinueBrowsing = () => {
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
          <p className="text-slate-600">Loading your booking details...</p>
        </div>
      </div>
    )
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Unable to load booking details.</p>
          <Button onClick={handleContinueBrowsing} className="bg-blue-600 hover:bg-blue-700">
            Return to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Booking Confirmed!</h1>
              <p className="text-slate-600 text-sm mt-1">Your reservation has been successfully processed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message Card */}
        <div className="bg-white rounded-lg shadow-md border-l-4 border-green-600 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Thank you for booking with FlourishParisNest!</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We're delighted you've chosen to stay in one of our premium Parisian apartments. Your reservation is now confirmed, and a detailed receipt has been sent to <span className="font-semibold text-slate-900">{bookingData.guestEmail}</span>.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Our concierge team will contact you shortly with additional details about your check-in, local recommendations, and special services available during your stay.
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Confirmation Email</h3>
            </div>
            <p className="text-sm text-slate-600">Sent to {bookingData.guestEmail}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Home className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Booking ID</h3>
            </div>
            <p className="text-sm text-slate-600 font-mono">{bookingData.id}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Check className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-slate-900">Status</h3>
            </div>
            <p className="text-sm text-green-600 font-semibold">Payment Confirmed</p>
          </div>
        </div>

        {/* Receipt Preview */}
        {!showReceipt ? (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Booking Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Property Details</h4>
                <div className="space-y-2 text-slate-600">
                  <p><span className="font-medium text-slate-900">{bookingData.propertyName}</span></p>
                  <p>{bookingData.propertyAddress}</p>
                  <p>Arrondissement: {bookingData.arrondissement}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Stay Details</h4>
                <div className="space-y-2 text-slate-600">
                  <p>Check-in: <span className="font-medium text-slate-900">{bookingData.checkInDate}</span></p>
                  <p>Check-out: <span className="font-medium text-slate-900">{bookingData.checkOutDate}</span></p>
                  <p>Duration: <span className="font-medium text-slate-900">{bookingData.nights} nights</span></p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6 mb-6">
              <div className="space-y-2 text-slate-600 mb-4">
                <div className="flex justify-between">
                  <span>€{bookingData.pricePerNight.toFixed(2)} × {bookingData.nights} nights</span>
                  <span className="font-medium">€{(bookingData.pricePerNight * bookingData.nights).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Fee</span>
                  <span className="font-medium">€0.00</span>
                </div>
              </div>
              
              <div className="flex justify-between text-lg font-bold text-slate-900 pt-4 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-blue-600">€{bookingData.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Transaction ID:</span> {bookingData.transactionId}
              </p>
            </div>

            <Button
              onClick={() => setShowReceipt(true)}
              variant="outline"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              View Full Receipt
            </Button>
          </div>
        ) : (
          <div id="receipt-content" className="bg-white rounded-lg shadow-md p-8 mb-8">
            <BookingReceipt data={bookingData} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {showReceipt && (
            <Button
              onClick={handleDownloadReceipt}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
          )}
          <Button
            onClick={handleContinueBrowsing}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Continue Browsing
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-600">
          <h3 className="font-bold text-slate-900 mb-3">What happens next?</h3>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Check your email for a detailed confirmation with payment receipt and booking details</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Our concierge team will contact you within 24 hours to confirm check-in arrangements</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Receive your welcome package info (complimentary wine, croissants, Paris guide)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Enjoy 24/7 concierge support during your stay</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
