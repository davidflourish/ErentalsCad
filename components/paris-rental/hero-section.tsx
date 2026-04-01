'use client'

import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

interface HeroProps {
  onExplore: () => void
}

export function ParisTravelHero({ onExplore }: HeroProps) {
  return (
    <div className="relative w-full h-screen md:h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1500&h=800&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Live Like a Parisian
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Premium furnished apartments across all 20 arrondissements. Direct bookings, 20-35% cheaper than competitors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {/* <Button 
              onClick={onExplore}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Explore Now
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              Watch Tour
            </Button> */}
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12 text-sm">
            <div>
              <p className="text-2xl font-bold">300+</p>
              <p className="text-gray-200">Properties</p>
            </div>
            <div>
              <p className="text-2xl font-bold">20</p>
              <p className="text-gray-200">Arrondissements</p>
            </div>
            <div>
              <p className="text-2xl font-bold">4.9★</p>
              <p className="text-gray-200">Rating</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </div>
      </div>
    </div>
  )
}
