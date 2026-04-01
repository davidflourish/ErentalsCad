'use client'

import { Calendar, MapPin, Euro, Check } from 'lucide-react'

interface ReceiptData {
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

export function BookingReceipt({ data }: { data: ReceiptData }) {
  const serviceFeePct = 0 // No service fee for direct bookings
  const serviceFee = (data.totalPrice * serviceFeePct) / 100
  const subtotal = data.totalPrice
  const grandTotal = subtotal + serviceFee

  return (
    <div className="max-w-3xl mx-auto bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">ErentalsCad</h1>
            <p className="text-slate-600 text-sm">Premium Furnished Apartments Across Paris</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-2">
              <Check className="w-7 h-7 text-green-600" />
            </div>
            <p className="text-sm font-semibold text-green-600">PAID</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-600">Booking ID</p>
            <p className="font-mono font-semibold text-slate-900">{data.id}</p>
          </div>
          <div>
            <p className="text-slate-600">Transaction ID</p>
            <p className="font-mono font-semibold text-slate-900">{data.transactionId}</p>
          </div>
          <div>
            <p className="text-slate-600">Booking Date</p>
            <p className="font-semibold text-slate-900">{data.bookingDate}</p>
          </div>
          <div>
            <p className="text-slate-600">Guest</p>
            <p className="font-semibold text-slate-900">{data.guestName}</p>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="border-b border-slate-200 pb-6 mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Property Details</h2>
        <div className="space-y-3">
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-slate-900">{data.propertyName}</p>
              <p className="text-slate-600 text-sm">{data.propertyAddress}</p>
              <p className="text-slate-600 text-sm">{data.arrondissement} Arrondissement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stay Details */}
      <div className="border-b border-slate-200 pb-6 mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Stay Details</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-slate-600 text-sm">Check-in</p>
            <p className="font-semibold text-slate-900">{data.checkInDate}</p>
            <p className="text-slate-600 text-xs">3:00 PM</p>
          </div>
          <div>
            <p className="text-slate-600 text-sm">Check-out</p>
            <p className="font-semibold text-slate-900">{data.checkOutDate}</p>
            <p className="text-slate-600 text-xs">11:00 AM</p>
          </div>
          <div>
            <p className="text-slate-600 text-sm">Duration</p>
            <p className="font-semibold text-slate-900">{data.nights} nights</p>
            <p className="text-slate-600 text-xs">Flexible Cancellation</p>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="border-b border-slate-200 pb-6 mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Included Services</h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex gap-2">
            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            Welcome Kit (complimentary wine, croissants, Paris guide)
          </li>
          <li className="flex gap-2">
            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            24/7 Concierge Support
          </li>
          <li className="flex gap-2">
            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            All Utilities Included
          </li>
          <li className="flex gap-2">
            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            WiFi & Streaming Services
          </li>
          <li className="flex gap-2">
            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            Weekly Housekeeping
          </li>
        </ul>
      </div>

      {/* Pricing Summary */}
      <div className="border-b border-slate-200 pb-6 mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Payment Summary</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">€{data.pricePerNight.toFixed(2)} × {data.nights} nights</span>
            <span className="font-medium text-slate-900">€{subtotal.toFixed(2)}</span>
          </div>
          {serviceFee > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-600">Service Fee ({serviceFeePct}%)</span>
              <span className="font-medium text-slate-900">€{serviceFee.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-bold">
            <span>Total Amount Paid</span>
            <span className="text-blue-600">€{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Method & Terms */}
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-slate-900 mb-2">Payment Method</h3>
          <p className="text-slate-600 text-sm">Direct Bank Transfer / Email Invoice</p>
          <p className="text-slate-600 text-sm">Transaction verified and confirmed</p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 mb-2">Cancellation Policy</h3>
          <p className="text-slate-600 text-sm">
            Free cancellation up to 7 days before check-in. After that, 50% refund applies. No refund within 3 days of check-in.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-600 text-center">
            For questions or modifications, please contact our concierge team at concierge@flourishparisnest.com or call +33 1 XX XX XX XX
          </p>
          <p className="text-xs text-slate-600 text-center mt-2">
            Thank you for choosing FlourishParisNest. We look forward to welcoming you to Paris!
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
        <p>FlourishParisNest © 2026 - Premium Furnished Apartments Across All 20 Arrondissements</p>
        <p>Registration Number: DSRIF-2026-001 | Tax ID: FR00000000000</p>
      </div>
    </div>
  )
}
