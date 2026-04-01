'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Clock, Mail, Shield, Phone, MapPin, Award } from 'lucide-react'
import Link from 'next/link'

export default function BookingConfirmationPage() {
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
      }
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-50"></div>
              <CheckCircle size={80} className="relative text-green-600" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Reservation Complete!</h1>
          <p className="text-xl text-slate-600">Your booking inquiry has been submitted successfully.</p>
        </div>

        {/* Confirmation Email */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-slate-900">Confirmation Sent</h2>
          </div>
          <p className="text-slate-700">We've sent a confirmation email with all your reservation details. Check your inbox and spam folder.</p>
        </div>

        {/* Next Steps Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-orange-600" size={24} />
            <h2 className="text-xl font-semibold text-slate-900">What Happens Next</h2>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">✓</div>
                <div className="w-1 h-16 bg-green-300 mt-2"></div>
              </div>
              <div className="pt-1">
                <h3 className="font-semibold text-slate-900 text-lg">Payment Received</h3>
                <p className="text-slate-600 mt-1">Your payment details have been securely received and verified.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
                <div className="w-1 h-16 bg-blue-300 mt-2"></div>
              </div>
              <div className="pt-1">
                <h3 className="font-semibold text-slate-900 text-lg">Admin Review & Confirmation</h3>
                <p className="text-slate-600 mt-1">Our admin team will review your reservation and verify all details within <strong>24-48 hours</strong>.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">3</div>
                <div className="w-1 h-16 bg-purple-300 mt-2"></div>
              </div>
              <div className="pt-1">
                <h3 className="font-semibold text-slate-900 text-lg">Next Steps Email</h3>
                <p className="text-slate-600 mt-1">We'll send you complete check-in instructions, property details, and access codes via email.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">4</div>
              </div>
              <div className="pt-1">
                <h3 className="font-semibold text-slate-900 text-lg">Enjoy Your Stay</h3>
                <p className="text-slate-600 mt-1">Check in on your arrival date and enjoy your luxury Parisian apartment!</p>
              </div>
            </div>
          </div>

          {/* Timeline Indicator */}
          <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-orange-600" />
              <p className="font-semibold text-orange-900">Maximum Response Time: <span className="text-lg">72 hours</span></p>
            </div>
            <p className="text-sm text-orange-800">We typically respond within 24-48 hours. You'll receive a detailed email with all next steps.</p>
          </div>
        </div>

        {/* Trust & Security Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Security Guarantee */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-green-600" size={24} />
              <h3 className="font-semibold text-slate-900">Secure & Protected</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>SSL encrypted payment processing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>PCI-DSS compliant transactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Your data is never shared with third parties</span>
              </li>
            </ul>
          </div>

          {/* Support Available */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="text-blue-600" size={24} />
              <h3 className="font-semibold text-slate-900">24/7 Support</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Dedicated support team standing by</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Response within 24 hours guaranteed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Multiple communication channels available</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Why Trust Us */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Award size={28} />
            <h2 className="text-2xl font-bold">Why Trust ErentalsCad</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <p className="text-blue-100 text-sm mb-2">VERIFIED PROPERTIES</p>
              <p className="font-semibold text-lg">50+ Luxury Apartments</p>
              <p className="text-blue-100 text-sm mt-1">All registered and officially licensed</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-2">CUSTOMER SATISFACTION</p>
              <p className="font-semibold text-lg">4.8/5 Rating</p>
              <p className="text-blue-100 text-sm mt-1">From 500+ verified bookings</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-2">FAST RESPONSE</p>
              <p className="font-semibold text-lg">2-Hour Average</p>
              <p className="text-blue-100 text-sm mt-1">Reply time for inquiries</p>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-amber-900 mb-4">Important Information</h3>
          <ul className="space-y-3 text-sm text-amber-900">
            <li className="flex gap-3">
              <span className="font-bold">→</span>
              <span><strong>Check Your Email:</strong> Watch for our confirmation email with all reservation details</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">→</span>
              <span><strong>Free Cancellation:</strong> You can cancel your reservation up to 48 hours before check-in for a full refund</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">→</span>
              <span><strong>Response Time:</strong> We will contact you within 24-72 hours with next steps and check-in details</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">→</span>
              <span><strong>Payment Status:</strong> Your payment has been securely processed and confirmed</span>
            </li>
          </ul>
        </div>

        {/* Contact & Action Buttons */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Have Questions?</h3>
            <div className="grid grid-cols-1 gap-4">
              <a
                href="mailto:erentalscaddex@gmail.com"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                <Mail size={20} />
                Send us an Email: erentalscaddex@gmail.com
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-center text-slate-700 mb-4">
              What would you like to do next?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => router.push('/#apartments')}
                className="text-center bg-slate-100 text-slate-900 py-3 rounded-lg font-semibold hover:bg-slate-200 transition"
              >
                Browse Properties
              </button>
              <Link
                href="/"
                className="text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12 text-slate-600">
          <p className="text-sm">Confirmation ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          <p className="text-xs mt-2">
            A detailed confirmation email will be sent to you within the next 72 hours
          </p>
        </div>
      </div>
    </main>
  )
}
