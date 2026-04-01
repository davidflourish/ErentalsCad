'use client'

import { useState } from 'react'
import { ParisTravelHero } from './hero-section'
import { ArrandissementMap } from './arrondissement-map'
import { FeaturedProperties } from './featured-properties'
import { SearchFilters } from './search-filters'

import { ConciergeServices } from './concierge-services'
import { ComplianceBadges } from './compliance-badges'
import { Testimonials } from './testimonials'
import { Footer } from './footer'

export function FlourishParisNestLanding() {
  // ErentalsCad Landing Component
  const [showSearch, setShowSearch] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <ParisTravelHero onExplore={() => setShowSearch(true)} />
      
      {showSearch && (
        <div className="bg-gradient-to-b from-slate-50 to-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <SearchFilters />
          </div>
        </div>
      )}

      {/* <div className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              All 20 Arrondissements Covered
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From iconic 1st to authentic 20th - discover premium furnished apartments across the entire city
            </p>
          </div>
          <ArrandissementMap />
        </div>
      </div> */}

      <div className="bg-blue-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <FeaturedProperties />
        </div>
      </div>

      <div className="bg-slate-900 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <ConciergeServices />
        </div>
      </div>

      <div className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <ComplianceBadges />
        </div>
      </div>

      <div className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Testimonials />
        </div>
      </div>

      <Footer />
    </div>
  )
}
