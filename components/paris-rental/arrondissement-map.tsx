'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Arrondissement {
  number: number
  name: string
  category: 'iconic' | 'trendy' | 'quiet' | 'value'
  propertyCount: number
  avgPrice: number
  description: string
}

const arrondissements: Arrondissement[] = [
  { number: 1, name: 'Louvre', category: 'iconic', propertyCount: 32, avgPrice: 380, description: 'Museums, historic landmarks' },
  { number: 2, name: 'Stock Exchange', category: 'iconic', propertyCount: 28, avgPrice: 350, description: 'Business district' },
  { number: 3, name: 'Temple', category: 'trendy', propertyCount: 35, avgPrice: 320, description: 'Marais, boutiques' },
  { number: 4, name: 'Île-de-Cité', category: 'trendy', propertyCount: 30, avgPrice: 390, description: 'Notre-Dame, Latin Quarter' },
  { number: 5, name: 'Panthéon', category: 'quiet', propertyCount: 40, avgPrice: 280, description: 'University, bookshops' },
  { number: 6, name: 'Luxembourg', category: 'quiet', propertyCount: 38, avgPrice: 310, description: 'Gardens, galleries' },
  { number: 7, name: 'Palais-Bourbon', category: 'quiet', propertyCount: 35, avgPrice: 340, description: 'Eiffel Tower, upscale' },
  { number: 8, name: 'Élysée', category: 'iconic', propertyCount: 42, avgPrice: 420, description: 'Champs-Élysées, luxury' },
  { number: 9, name: 'Opéra', category: 'value', propertyCount: 28, avgPrice: 270, description: 'Opera House, shopping' },
  { number: 10, name: 'Enclos Saint-Laurent', category: 'value', propertyCount: 26, avgPrice: 240, description: 'Gare du Nord, canals' },
  { number: 11, name: 'Popincourt', category: 'trendy', propertyCount: 45, avgPrice: 260, description: 'Nightlife, vibrant' },
  { number: 12, name: 'Reuilly', category: 'value', propertyCount: 22, avgPrice: 210, description: 'Bois de Vincennes' },
  { number: 13, name: 'Gobelins', category: 'value', propertyCount: 20, avgPrice: 200, description: 'Asian quarter' },
  { number: 14, name: 'Observatoire', category: 'value', propertyCount: 24, avgPrice: 220, description: 'Montparnasse' },
  { number: 15, name: 'Vaugirard', category: 'value', propertyCount: 28, avgPrice: 230, description: 'Residential, parks' },
  { number: 16, name: 'Passy', category: 'iconic', propertyCount: 35, avgPrice: 370, description: 'Upscale, museums' },
  { number: 17, name: 'Batignolles-Monceau', category: 'value', propertyCount: 30, avgPrice: 260, description: 'Green spaces' },
  { number: 18, name: 'Montmartre', category: 'trendy', propertyCount: 38, avgPrice: 290, description: 'Sacré-Cœur, bohemian' },
  { number: 19, name: 'Buttes-aux-Cailles', category: 'value', propertyCount: 25, avgPrice: 190, description: 'Parc des Buttes' },
  { number: 20, name: 'Ménilmontant', category: 'value', propertyCount: 23, avgPrice: 180, description: 'Authentic, local' },
]

const categoryColors = {
  iconic: { bg: 'bg-yellow-50', border: 'border-yellow-300', badge: 'bg-yellow-100 text-yellow-800' },
  trendy: { bg: 'bg-pink-50', border: 'border-pink-300', badge: 'bg-pink-100 text-pink-800' },
  quiet: { bg: 'bg-green-50', border: 'border-green-300', badge: 'bg-green-100 text-green-800' },
  value: { bg: 'bg-blue-50', border: 'border-blue-300', badge: 'bg-blue-100 text-blue-800' },
}

export function ArrandissementMap() {
  const [selectedArr, setSelectedArr] = useState<number | null>(null)

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
        {arrondissements.map((arr) => {
          const colors = categoryColors[arr.category]
          return (
            <button
              key={arr.number}
              onClick={() => setSelectedArr(arr.number)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedArr === arr.number
                  ? `${colors.bg} ${colors.border} ring-2 ring-offset-2`
                  : `${colors.bg} border-gray-200 hover:${colors.border}`
              }`}
            >
              <div className="font-bold text-lg text-slate-900">{arr.number}°</div>
              <div className="text-xs font-medium text-slate-700 mt-1">{arr.name}</div>
              <Badge className={`${categoryColors[arr.category].badge} mt-2 text-xs`}>
                {arr.propertyCount} apt.
              </Badge>
            </button>
          )
        })}
      </div>

      {selectedArr && (
        <Card className="p-6 bg-gradient-to-r from-slate-50 to-white">
          {(() => {
            const arr = arrondissements.find(a => a.number === selectedArr)
            if (!arr) return null
            const colors = categoryColors[arr.category]
            return (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {arr.number}° Arrondissement - {arr.name}
                    </h3>
                    <Badge className={`${colors.badge} mt-2`}>
                      {arr.category.charAt(0).toUpperCase() + arr.category.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">€{arr.avgPrice}</p>
                    <p className="text-sm text-slate-600">avg. per night</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-4">{arr.description}</p>
                <div className="flex flex-wrap gap-2">
                  <div className="px-4 py-2 bg-blue-100 rounded-lg text-sm font-medium text-blue-900">
                    {arr.propertyCount} available apartments
                  </div>
                  <div className="px-4 py-2 bg-green-100 rounded-lg text-sm font-medium text-green-900">
                    3-90+ night stays
                  </div>
                  <div className="px-4 py-2 bg-purple-100 rounded-lg text-sm font-medium text-purple-900">
                    Direct booking
                  </div>
                </div>
              </div>
            )
          })()}
        </Card>
      )}
    </div>
  )
}
