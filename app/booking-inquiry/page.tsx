'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Clock, Mail, Shield, Phone, Award, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function BookingInquiryContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const email = searchParams.get('email') || 'your email'
  const [timeLeft, setTimeLeft] = useState('72 hours')

  useEffect(() => {
    const timer = setInterval(() => {
      const futureDate = new Date()
      futureDate.setHours(futureDate.getHours() + 72)
      const now = new Date()
      const diff = futureDate.getTime() - now.getTime()

      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`)
      } else {
        setTimeLeft('Less than 1 hour')
      }
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-50"></div>
              <CheckCircle size={80} className="relative text-green-600" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Inquiry Submitted!</h1>
          <p className="text-xl text-slate-600">Your booking inquiry has been received successfully.</p>
        </div>

        {/* Confirmation Email */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-slate-900">Confirmation Sent</h2>
          </div>
          <p className="text-slate-700">
            We've sent a confirmation email with all your inquiry details.
            Please check your inbox and spam folder.
          </p>
        </div>

        {/* Next Steps Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-orange-600" size={24} />
            <h2 className="text-xl font-semibold text-slate-900">What Happens Next</h2>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">1</div>
                <div className="w-1 h-16 bg-green-300 mt-2"></div>
              </div>
              <div className="pt-1">
                <h3 className="font-semibold text-slate-900 text-lg">Inquiry Received</h3>
                <p className="text-slate-600 mt-1">Your request has been successfully submitted to our team.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
                <div className="w-1 h-16 bg-blue-300 mt-2"></div>
              </div>
              <div className="pt-1">
                <h3 className="font-semibold text-slate-900 text-lg">Admin Review</h3>
                <p className="text-slate-600 mt-1">Our team will review your inquiry and availability within <strong>24-48 hours</strong>.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">3</div>
                <div className="w-1 h-16 bg-purple-300 mt-2"></div>
              </div>
              <div className="pt-1">
                <h3 className="font-semibold text-slate-900 text-lg">Response Email</h3>
                <p className="text-slate-600 mt-1">You will receive a detailed response with pricing and next steps.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-orange-600" />
              <p className="font-semibold text-orange-900">Expected Response: <span className="text-lg">24-72 hours</span></p>
            </div>
            <p className="text-sm text-orange-800">We aim to respond as quickly as possible.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-center text-slate-700 mb-4">What would you like to do next?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => router.push('/#apartments')}
                className="bg-slate-100 text-slate-900 py-3 rounded-lg font-semibold hover:bg-slate-200 transition"
              >
                Browse More Properties
              </button>
              <Link
                href="/"
                className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function BookingInquiryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your booking inquiry...</p>
        </div>
      </div>
    }>
      <BookingInquiryContent />
    </Suspense>
  )
}