'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Heart, Waves, Users } from 'lucide-react'
import { luxuryProperties } from './luxury-apartments-data'

export function LuxuryApartmentsDisplay() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {luxuryProperties.map((property) => (
        <Card key={property.id} className="overflow-hidden hover:shadow-2xl transition-all border border-amber-200">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
            <div className="absolute top-3 right-3 flex gap-2">
              <Badge className="bg-amber-600 text-white">Premium</Badge>
              <Badge className="bg-blue-600 text-white">{property.dpeRating} DPE</Badge>
              {property.hasEiffelView && (
                <Badge className="bg-yellow-500 text-white">Eiffel View</Badge>
              )}
            </div>
            <button className="absolute top-3 left-3 p-2 bg-white rounded-full hover:bg-gray-100">
              <Heart className="w-5 h-5 text-red-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Title & Location */}
            <h3 className="font-bold text-lg text-slate-900 mb-2">{property.title}</h3>
            <div className="flex items-center gap-2 text-slate-600 mb-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{property.arrondissement}° Arrondissement</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(property.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{property.rating}</span>
              <span className="text-xs text-slate-500">({property.reviews})</span>
            </div>

            {/* Rooms & Amenities */}
            <div className="flex items-center gap-3 mb-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {property.bedrooms} bed
              </span>
              <span>•</span>
              <span>{property.bathrooms} bath</span>
            </div>

            {/* Amenity Icons */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {property.hasBalcony && (
                <div className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  <Waves className="w-3 h-3" />
                  Balcony
                </div>
              )}
              {property.amenities.slice(0, 2).map((amenity) => (
                <div key={amenity} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded">
                  {amenity}
                </div>
              ))}
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-2xl font-bold text-slate-900">€{property.price}</p>
                <p className="text-xs text-slate-500">per night</p>
              </div>
              <Link href={`/booking-inquiry?propertyId=${property.id}&title=${encodeURIComponent(property.title)}&arrondissement=${property.arrondissement}&price=${property.price}&bedrooms=${property.bedrooms}&bathrooms=${property.bathrooms}&registration=${encodeURIComponent(property.registrationNumber)}`}>
                <Button className="bg-amber-600 hover:bg-amber-700">Book Now</Button>
              </Link>
            </div>

            {/* Registration Number */}
            <p className="text-xs text-slate-500 mt-3 pt-3 border-t">
              Reg: {property.registrationNumber}
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}
