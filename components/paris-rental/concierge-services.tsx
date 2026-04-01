'use client'

import React from "react"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Utensils, Plane, Navigation2, Shirt, BookOpen, ShoppingBag } from 'lucide-react'

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  isFree: boolean
  cost?: string
}

const services: Service[] = [
  {
    icon: <ShoppingBag className="w-8 h-8" />,
    title: 'Welcome Kit',
    description: 'French wine, fresh croissants, Paris guide PDF, and local essentials',
    isFree: true,
  },
  {
    icon: <Plane className="w-8 h-8" />,
    title: 'Airport Transfer',
    description: 'Private or shared transfer from CDG, Orly, or Beauvais',
    isFree: false,
    cost: 'from €35',
  },
  {
    icon: <Utensils className="w-8 h-8" />,
    title: 'Private Chef',
    description: 'In-apartment dining with professional chef prepared meals',
    isFree: false,
    cost: 'from €80',
  },
  {
    icon: <Navigation2 className="w-8 h-8" />,
    title: 'Metro Navigo Pass',
    description: 'Weekly unlimited public transport pass for easy city exploration',
    isFree: false,
    cost: 'from €35',
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: 'Guided Tours',
    description: 'Professional guided tours (Louvre, Versailles, food tours, night tours)',
    isFree: false,
    cost: 'from €60',
  },
  {
    icon: <Shirt className="w-8 h-8" />,
    title: 'Concierge Service',
    description: '24/7 support for reservations, recommendations, emergency assistance',
    isFree: true,
  },
]

export function ConciergeServices() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Hotel-Level Concierge Service
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          We handle the details. You enjoy Paris. Every stay includes 24/7 support and expert recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service, idx) => (
          <Card key={idx} className="p-6 bg-slate-800 border-slate-700 text-white hover:border-blue-500 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="text-blue-400">{service.icon}</div>
              {service.isFree && (
                <Badge className="bg-green-500 text-white">FREE</Badge>
              )}
            </div>
            <h3 className="font-bold text-lg mb-2">{service.title}</h3>
            <p className="text-gray-300 text-sm mb-4">{service.description}</p>
            {service.cost && (
              <p className="text-blue-400 font-semibold text-sm">{service.cost}</p>
            )}
          </Card>
        ))}
      </div>

      {/* Why Choose Our Concierge */}
      <Card className="p-8 bg-blue-600 text-white">
        <h3 className="text-2xl font-bold mb-6">Why Our Concierge Stands Out</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-4xl font-bold mb-2">24/7</p>
            <p className="text-blue-100">Round-the-clock support in English, French & Spanish</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">Local Experts</p>
            <p className="text-blue-100">Paris natives who know hidden gems and insider tips</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">Instant Response</p>
            <p className="text-blue-100">Average 2-minute response time for urgent requests</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
