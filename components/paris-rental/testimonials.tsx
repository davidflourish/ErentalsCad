'use client'

import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  country: string
  role: string
  avatar: string
  rating: number
  text: string
  property: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    country: 'USA',
    role: 'Travel Blogger',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 5,
    text: 'ErentalsCad saved me €400 on my 7-night stay compared to Airbnb. The welcome kit was such a nice touch, and the concierge helped me book a private chef for my anniversary dinner. Highly recommend!',
    property: 'Marais 2-Bed Loft',
  },
  {
    name: 'Marco Rossi',
    country: 'Italy',
    role: 'CEO',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marco',
    rating: 5,
    text: 'Perfect for my business trip. The apartment in the 8th was luxurious, with fast WiFi and elevator access. Direct booking process was seamless. Will definitely book again for my next visit to Paris.',
    property: 'Champs-Élysées Studio',
  },
  {
    name: 'Emily Chen',
    country: 'Australia',
    role: 'Photographer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    rating: 5,
    text: 'The Eiffel Tower view from the 7th arrondissement apartment was stunning. Amazing natural light for my photography work. The owner was incredibly helpful and responsive. Worth every euro!',
    property: 'Haussmann 2-Bed with View',
  },
  {
    name: 'James Thompson',
    country: 'UK',
    role: 'Retired Couple',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    rating: 5,
    text: 'We stayed for 30 nights and loved having a real home base. The 3-bedroom in the 5th was perfect for our family. Great discounts for longer stays. The concierge arranged everything we needed.',
    property: 'Latin Quarter Family Apt',
  },
  {
    name: 'Yuki Tanaka',
    country: 'Japan',
    role: 'Student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki',
    rating: 5,
    text: 'The Montmartre studio was cozy and authentic. The price was unbeatable, and being in such a vibrant neighborhood was perfect. The welcome kit helped me get acclimated quickly. Merci!',
    property: 'Montmartre Studio',
  },
  {
    name: 'Lisa Hoffman',
    country: 'Germany',
    role: 'Designer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    rating: 5,
    text: 'The transparency about registration numbers and DPE ratings gave me confidence. No surprises, no hidden fees. The Belleville apartment had great character and amazing local vibes.',
    property: 'Belleville 2-Bed',
  },
]

export function Testimonials() {
  const avgRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Loved by Our Guests
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-2xl font-bold text-slate-900">{avgRating.toFixed(1)}</span>
          <span className="text-lg text-slate-600">out of 5</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {testimonials.map((testimonial, idx) => (
          <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-slate-700 mb-6 italic">"{testimonial.text}"</p>

            {/* Property Tag */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                {testimonial.property}
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t">
              <img
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-bold text-slate-900">{testimonial.name}</p>
                <p className="text-xs text-slate-600">{testimonial.role} • {testimonial.country}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100">
          <p className="text-4xl font-bold text-blue-600 mb-2">12K+</p>
          <p className="font-semibold text-slate-900">Happy Guests</p>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100">
          <p className="text-4xl font-bold text-green-600 mb-2">4.9★</p>
          <p className="font-semibold text-slate-900">Average Rating</p>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100">
          <p className="text-4xl font-bold text-purple-600 mb-2">300+</p>
          <p className="font-semibold text-slate-900">Verified Properties</p>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100">
          <p className="text-4xl font-bold text-orange-600 mb-2">20</p>
          <p className="font-semibold text-slate-900">All Arrondissements</p>
        </Card>
      </div>
    </div>
  )
}
