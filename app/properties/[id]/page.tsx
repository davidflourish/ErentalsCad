'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Wind,
  Waves,
  Star,
  Mail,
  Phone,
  Calendar,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Property {
  id: string
  name: string
  description: string
  location: string
  arrondissement: string
  price_per_night: number
  bedrooms: number
  bathrooms: number
  max_guests: number
  amenities: string[]
  registration_number: string
  images: string[]
  status: string
  vendor: {
    business_name: string
    phone: string
    email: string
  }
  reviews: Array<{
    id: string
    rating: number
    comment: string
    created_at: string
  }>
}

export default function PropertyPage() {
  const params = useParams()
  const propertyId = params.id as string
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProperty()
  }, [propertyId])

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/properties/${propertyId}`)
      if (!response.ok) throw new Error('Property not found')
      const data = await response.json()
      setProperty(data)
    } catch (err) {
      setError('Failed to load property')
      console.error('[v0] Property fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading property...</p>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const avgRating =
    property.reviews.length > 0
      ? (property.reviews.reduce((sum, r) => sum + r.rating, 0) / property.reviews.length).toFixed(1)
      : null

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-slate-900">
            FlourishParisNest
          </Link>
          <Link href="/booking-inquiry">
            <Button className="bg-blue-600 hover:bg-blue-700">Book Now</Button>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Gallery */}
        {property.images.length > 0 && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {property.images.slice(0, 4).map((image, idx) => (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-lg ${idx === 0 ? 'md:col-span-2' : ''}`}
                style={{ aspectRatio: idx === 0 ? '16/9' : '1/1' }}
              >
                <Image
                  src={image || '/placeholder.svg'}
                  alt={`Property image ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-4xl font-bold text-slate-900">{property.name}</h1>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center gap-2 text-slate-600 mb-4">
                <MapPin className="w-5 h-5" />
                {property.arrondissement} Arrondissement, Paris
              </div>
              {avgRating && (
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(Number(avgRating)) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                    />
                  ))}
                  <span className="text-slate-600 ml-2">
                    {avgRating} ({property.reviews.length} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About this property</h2>
              <p className="text-slate-700 leading-relaxed">{property.description}</p>
            </Card>

            {/* Amenities */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities?.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                    {amenity}
                  </div>
                ))}
              </div>
            </Card>

            {/* Reviews */}
            {property.reviews.length > 0 && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Guest Reviews</h2>
                <div className="space-y-4">
                  {property.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-slate-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <p className="text-slate-600 text-sm font-medium mb-2">Price per night</p>
              <p className="text-4xl font-bold text-slate-900 mb-6">€{property.price_per_night}</p>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex items-center gap-3 text-slate-700">
                  <Bed className="w-5 h-5" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Bath className="w-5 h-5" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Users className="w-5 h-5" />
                  <span>Up to {property.max_guests} guests</span>
                </div>
              </div>

              <Link href="/booking-inquiry">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </Link>
            </Card>

            {/* Vendor Info */}
            {property.vendor && (
              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Contact Host</h3>
                <p className="font-medium text-slate-900 mb-3">{property.vendor.business_name}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4" />
                    {property.vendor.phone}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4" />
                    {property.vendor.email}
                  </div>
                </div>
              </Card>
            )}

            {/* Registration */}
            <Card className="p-6 bg-slate-50">
              <p className="text-xs text-slate-600 mb-2">Registration Number</p>
              <p className="font-mono text-sm font-semibold text-slate-900">
                {property.registration_number}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
