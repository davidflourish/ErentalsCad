'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Heart, Wifi, Wind, Waves, Users } from 'lucide-react'

interface Property {
  id: string
  title: string
  arrondissement: number
  price: number
  bedrooms: number
  bathrooms: number
  rating: number
  reviews: number
  image: string
  registrationNumber: string
  dpeRating: 'A' | 'B' | 'C' | 'D' | 'E'
  amenities: string[]
  hasBalcony: boolean
  hasEiffelView: boolean
}

const featuredProperties: Property[] = [
  // Arrondissement 1 - Louvre
  {
    id: '1-1',
    title: 'Classic Louvre 2-Bed Apartment',
    arrondissement: 8,
    price: 2650,
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.9,
    reviews: 142,
    image: '/apartments/apartment-living-1.jpg',
    registrationNumber: '75001PAR2024001',
    dpeRating: 'B',
    amenities: ['AC', 'Elevator', 'Washer/Dryer'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  {
    id: '1-2',
    title: 'Cozy Louvre Studio',
    arrondissement: 6,
    price: 1280,
    bedrooms: 2,
    bathrooms: 12,
    rating: 4.8,
    reviews: 89,
    image: '/apartments/apartment-kitchen-1.jpg',
    registrationNumber: '75001PAR2024002',
    dpeRating: 'A',
    amenities: ['Wifi', 'Modern Kitchen'],
    hasBalcony: false,
    hasEiffelView: false,
  },
  {
    id: '1-3',
    title: 'Modern Louvre 1-Bed',
    arrondissement: 7,
    price: 995,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.7,
    reviews: 76,
    image: '/apartments/apartment-bedroom-1.jpg',
    registrationNumber: '75001PAR2024003',
    dpeRating: 'B',
    amenities: ['Balcony', 'Wifi'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  {
    id: '1-4',
    title: 'Louvre Family Apartment',
    arrondissement: 16,
    price: 2420,
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.9,
    reviews: 164,
    image: '/apartments/apartment-living-2.jpg',
    registrationNumber: '75001PAR2024004',
    dpeRating: 'B',
    amenities: ['AC', 'Elevator', 'Washer/Dryer', 'Garden'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  {
    id: '1-5',
    title: 'Luxe Louvre Penthouse Studio',
    arrondissement: 9,
    price: 1350,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.95,
    reviews: 201,
    image: '/apartments/apartment-kitchen-2.jpg',
    registrationNumber: '75001PAR2024005',
    dpeRating: 'A',
    amenities: ['AC', 'Elevator', 'Concierge'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  // Arrondissement 2 - Bourse
  {
    id: '2-1',
    title: 'Historic Bourse 2-Bed',
    arrondissement: 6,
    price: 1220,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.8,
    reviews: 125,
    image: '/apartments/apartment-bedroom-2.jpg',
    registrationNumber: '75002PAR2024001',
    dpeRating: 'B',
    amenities: ['AC', 'Wifi', 'Washer/Dryer'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  {
    id: '2-2',
    title: 'Bourse Charming Studio',
    arrondissement: 7,
    price: 1260,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.7,
    reviews: 92,
    image: '/apartments/apartment-bathroom-1.jpg',
    registrationNumber: '75002PAR2024002',
    dpeRating: 'A',
    amenities: ['Wifi', 'Modern Kitchen'],
    hasBalcony: false,
    hasEiffelView: false,
  },
  {
    id: '2-3',
    title: 'Bourse Modern 1-Bed',
    arrondissement: 2,
    price: 850,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.6,
    reviews: 78,
    image: '/apartments/apartment-kitchen-3.jpg',
    registrationNumber: '75002PAR2024003',
    dpeRating: 'B',
    amenities: ['Balcony', 'Wifi'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  {
    id: '2-4',
    title: 'Bourse Family Apartment',
    arrondissement: 16,
    price: 2980,
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.8,
    reviews: 154,
    image: '/apartments/apartment-living-3.jpg',
    registrationNumber: '75002PAR2024004',
    dpeRating: 'B',
    amenities: ['AC', 'Elevator', 'Washer/Dryer'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  {
    id: '2-5',
    title: 'Bourse Premium Studio',
    arrondissement: 6,
    price: 940,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.9,
    reviews: 189,
    image: '/apartments/apartment-bedroom-3.jpg',
    registrationNumber: '75002PAR2024005',
    dpeRating: 'A',
    amenities: ['AC', 'Elevator', 'Concierge'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  // Arrondissement 3 - Temple
  {
    id: '3-1',
    title: 'Temple District 2-Bed',
    arrondissement: 8,
    price: 1330,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.85,
    reviews: 138,
    image: '/apartments/apartment-bathroom-2.jpg',
    registrationNumber: '75003PAR2024001',
    dpeRating: 'B',
    amenities: ['AC', 'Wifi', 'Washer/Dryer'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  {
    id: '3-2',
    title: 'Temple Charming Studio',
    arrondissement: 4,
    price: 1270,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.75,
    reviews: 97,
    image: '/apartments/apartment-kitchen-4.jpg',
    registrationNumber: '75003PAR2024002',
    dpeRating: 'A',
    amenities: ['Wifi', 'Modern Kitchen'],
    hasBalcony: false,
    hasEiffelView: false,
  },
  {
    id: '3-3',
    title: 'Temple Modern 1-Bed',
    arrondissement: 9,
    price: 1600,
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.7,
    reviews: 85,
    image: '/apartments/apartment-living-1.jpg',
    registrationNumber: '75003PAR2024003',
    dpeRating: 'B',
    amenities: ['Balcony', 'Wifi'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  {
    id: '3-4',
    title: 'Temple Family Apartment',
    arrondissement: 6,
    price: 1590,
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.85,
    reviews: 162,
    image: '/apartments/apartment-kitchen-1.jpg',
    registrationNumber: '75003PAR2024004',
    dpeRating: 'B',
    amenities: ['AC', 'Elevator', 'Washer/Dryer'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  {
    id: '3-5',
    title: 'Temple Luxury Studio',
    arrondissement: 3,
    price: 1430,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.92,
    reviews: 197,
    image: '/apartments/apartment-bedroom-1.jpg',
    registrationNumber: '75003PAR2024005',
    dpeRating: 'A',
    amenities: ['AC', 'Elevator', 'Concierge'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  // Arrondissement 4 - Marais (partial - showing first 5)
  {
    id: '4-1',
    title: 'Marais Loft - Trendy 1-Bed',
    arrondissement: 4,
    price: 880,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.8,
    reviews: 98,
    image: '/apartments/apartment-living-2.jpg',
    registrationNumber: '75004PAR2024002',
    dpeRating: 'A',
    amenities: ['Wifi', 'Modern Kitchen'],
    hasBalcony: false,
    hasEiffelView: false,
  },
  {
    id: '4-2',
    title: 'Marais Elegant 2-Bed',
    arrondissement: 4,
    price: 1340,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.8,
    reviews: 115,
    image: '/apartments/apartment-kitchen-3.jpg',
    registrationNumber: '75004PAR2024006',
    dpeRating: 'B',
    amenities: ['AC', 'Wifi', 'Washer/Dryer'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  {
    id: '4-3',
    title: 'Marais Artistic Studio',
    arrondissement: 6,
    price: 1255,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.7,
    reviews: 82,
    image: '/apartments/apartment-bedroom-2.jpg',
    registrationNumber: '75004PAR2024007',
    dpeRating: 'A',
    amenities: ['Balcony', 'Wifi'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  {
    id: '4-4',
    title: 'Marais Family Apartment',
    arrondissement: 7,
    price: 2400,
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.85,
    reviews: 148,
    image: '/apartments/apartment-living-3.jpg',
    registrationNumber: '75004PAR2024008',
    dpeRating: 'B',
    amenities: ['AC', 'Elevator', 'Washer/Dryer'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  {
    id: '4-5',
    title: 'Marais Deluxe Studio',
    arrondissement: 9,
    price: 1440,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.9,
    reviews: 205,
    image: '/apartments/apartment-bathroom-1.jpg',
    registrationNumber: '75004PAR2024009',
    dpeRating: 'A',
    amenities: ['AC', 'Elevator', 'Concierge'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  // Arrondissement 5 - Latin Quarter
  {
    id: '5-1',
    title: 'Latin Quarter 3-Bed Family Apartment',
    arrondissement: 9,
    price: 1750,
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.9,
    reviews: 164,
    image: '/apartments/apartment-bathroom-2.jpg',
    registrationNumber: '75005PAR2024004',
    dpeRating: 'B',
    amenities: ['AC', 'Elevator', 'Washer/Dryer', 'Garden'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  {
    id: '5-2',
    title: 'Latin Quarter Scholarly 1-Bed',
    arrondissement: 5,
    price: 1265,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.75,
    reviews: 88,
    image: '/apartments/apartment-kitchen-4.jpg',
    registrationNumber: '75005PAR2024010',
    dpeRating: 'A',
    amenities: ['Wifi', 'Modern Kitchen'],
    hasBalcony: false,
    hasEiffelView: false,
  },
  {
    id: '5-3',
    title: 'Latin Quarter Modern 2-Bed',
    arrondissement: 1,
    price: 1325,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.8,
    reviews: 104,
    image: '/apartments/apartment-living-1.jpg',
    registrationNumber: '75005PAR2024011',
    dpeRating: 'B',
    amenities: ['Balcony', 'Wifi'],
    hasBalcony: true,
    hasEiffelView: false,
  },
  {
    id: '5-4',
    title: 'Latin Quarter Cozy Studio',
    arrondissement: 7,
    price: 1245,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.65,
    reviews: 71,
    image: '/apartments/apartment-bedroom-1.jpg',
    registrationNumber: '75005PAR2024012',
    dpeRating: 'C',
    amenities: ['Wifi', 'Central Location'],
    hasBalcony: false,
    hasEiffelView: false,
  },
  {
    id: '5-5',
    title: 'Latin Quarter Premium 2-Bed',
    arrondissement: 16,
    price: 2420,
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.9,
    reviews: 176,
    image: '/apartments/apartment-kitchen-1.jpg',
    registrationNumber: '75005PAR2024013',
    dpeRating: 'A',
    amenities: ['AC', 'Elevator', 'Concierge'],
    hasBalcony: true,
    hasEiffelView: false,
  },
]

export function FeaturedProperties() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Featured Premium Apartments
        </h2>
        <p className="text-lg text-slate-600">
          Hand-selected properties across Paris - verified, compliant, ready to book
        </p>
      </div>

      {/* Standard Featured Properties */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
              <div className="absolute top-3 right-3 flex gap-2">
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
                {property.amenities.slice(0, 1).map((amenity) => (
                  <div key={amenity} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
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
                  <Button className="bg-blue-600 hover:bg-blue-700">Book Now</Button>
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

      <div className="text-center mt-12">
        <Link href="/luxury-apartments">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 px-8">
            Explore All Luxury Apartments
          </Button>
        </Link>
      </div>
    </div>
  )
}
