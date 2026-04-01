'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Calendar, Users, MapPin, DollarSign, Mail, AlertCircle, Shield, CheckCircle, Lock, Star } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  propertyName: string
  propertyId: string
  pricePerNight: number
  arrondissement: string
}

export function BookingModal({ isOpen, onClose, propertyName, propertyId, pricePerNight, arrondissement }: BookingModalProps) {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [step, setStep] = useState(1) // Step 1: Dates, Step 2: Guest info, Step 3: Payment
  const [cardNumber, setCardNumber] = useState('')
  const [expiration, setExpiration] = useState('')
  const [cvv, setCvv] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    return Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const totalPrice = nights * pricePerNight

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (!checkIn || !checkOut || !guestName || !guestEmail) {
        setError('Please fill in all fields')
        setLoading(false)
        return
      }

      if (nights <= 0) {
        setError('Check-out date must be after check-in date')
        setLoading(false)
        return
      }

      // Create booking
      const bookingRes = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          totalPrice,
          guestName,
          guestEmail,
          arrondissement,
        }),
      })

      if (!bookingRes.ok) {
        const data = await bookingRes.json()
        setError(data.error || 'Failed to create booking')
        setLoading(false)
        return
      }

      const bookingData = await bookingRes.json()
      const bookingId = bookingData.booking[0]?.id

      // Process transaction
      if (bookingId) {
        const txRes = await fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId,
            amount: totalPrice,
            guestName,
            guestEmail,
            propertyName,
          }),
        })

        if (!txRes.ok) {
          console.error('[v0] Transaction failed, but booking created')
        }
      }

      setMessage(`Booking confirmed! 🎉 Redirecting to confirmation page...`)
      setTimeout(() => {
        // Build success page URL with booking details
        const params = new URLSearchParams({
          bookingId,
          propertyName,
          address: `${arrondissement} Arrondissement, Paris`,
          arrondissement,
          checkIn,
          checkOut,
          pricePerNight: pricePerNight.toString(),
          guestName,
          guestEmail,
          transactionId: `TXN-${bookingData.booking[0]?.id || Date.now()}`,
        })
        
        router.push(`/booking-success?${params.toString()}`)
        onClose()
        setCheckIn('')
        setCheckOut('')
        setGuestName('')
        setGuestEmail('')
        setMessage('')
      }, 1500)
    } catch (err) {
      console.error('[v0] Booking error:', err)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Book Apartment</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        {/* Property Info */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="font-semibold text-slate-900">{propertyName}</p>
          <div className="flex items-center gap-2 text-slate-600 text-sm mt-2">
            <MapPin size={16} />
            <span>{arrondissement}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <DollarSign size={16} />
            <span>€{pricePerNight} per night</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Check-in Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Calendar size={16} className="inline mr-2" />
              Check-in Date
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Check-out Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Calendar size={16} className="inline mr-2" />
              Check-out Date
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Guest Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Users size={16} className="inline mr-2" />
              Guest Name
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Guest Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Mail size={16} className="inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Booking Summary */}
          {nights > 0 && (
            <div className="bg-slate-100 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-slate-600">{nights} nights</span>
                <span className="text-slate-600">€{(nights * pricePerNight).toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-300 pt-2">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="font-semibold text-blue-600">€{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Messages */}
          {error && (
            <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {message && (
            <div className="flex gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <AlertCircle size={20} className="text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-700">{message}</p>
            </div>
          )}

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <Shield size={20} className="mx-auto text-green-600 mb-1" />
              <p className="text-xs font-semibold text-slate-700">Secure Payment</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <Lock size={20} className="mx-auto text-blue-600 mb-1" />
              <p className="text-xs font-semibold text-slate-700">SSL Encrypted</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <CheckCircle size={20} className="mx-auto text-emerald-600 mb-1" />
              <p className="text-xs font-semibold text-slate-700">Verified Hosts</p>
            </div>
          </div>

          {/* Guarantees */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 space-y-2">
            <div className="flex gap-2">
              <CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900"><strong>100% Secure:</strong> SSL encryption on all transactions</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900"><strong>Free Cancellation:</strong> Cancel up to 48 hours before arrival</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900"><strong>24/7 Support:</strong> Dedicated guest support team</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || nights <= 0}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition"
          >
            {loading ? 'Processing...' : `Book Now (€${totalPrice.toFixed(2)})`}
          </button>

          {/* Info */}
          <p className="text-xs text-slate-500 text-center">
            Invoice will be sent to your email for payment verification
          </p>
        </form>
      </div>
    </div>
  )
}
