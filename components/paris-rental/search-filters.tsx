'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { MapPin, Euro, Home, Filter } from 'lucide-react'

export function SearchFilters() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [bedrooms, setBedrooms] = useState<string>('all')
  const [checkIn, setCheckIn] = useState<string>('')
  const [checkOut, setCheckOut] = useState<string>('')

  const districts = [
    { value: 'all', label: 'All Arrondissements' },
    { value: 'iconic', label: 'Iconic Central (1-8, 16)' },
    { value: 'trendy', label: 'Trendy/Bohemian (4, 11, 18)' },
    { value: 'quiet', label: 'Quiet Residential (5, 6, 7)' },
    { value: 'value', label: 'Budget Gems (9, 10, 12-15, 19-20)' },
  ]

  const priceRanges = [
    { value: 'all', label: 'Any Price' },
    { value: '0-150', label: '€0 - €150/night' },
    { value: '150-250', label: '€150 - €250/night' },
    { value: '250-400', label: '€250 - €400/night' },
    { value: '400+', label: '€400+/night' },
  ]

  return (
    <Card className="p-6 md:p-8 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-blue-600" />
        <h3 className="text-xl font-semibold text-slate-900">Search Apartments</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* District Select */}
        <div>
          <Label htmlFor="district" className="text-sm font-medium text-slate-700 mb-2 block">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </div>
          </Label>
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger id="district">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district.value} value={district.value}>
                  {district.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Select */}
        <div>
          <Label htmlFor="price" className="text-sm font-medium text-slate-700 mb-2 block">
            <div className="flex items-center gap-2">
              <Euro className="w-4 h-4" />
              Price
            </div>
          </Label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger id="price">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms Select */}
        <div>
          <Label htmlFor="bedrooms" className="text-sm font-medium text-slate-700 mb-2 block">
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Bedrooms
            </div>
          </Label>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger id="bedrooms">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="1">1 Bedroom</SelectItem>
              <SelectItem value="2">2 Bedrooms</SelectItem>
              <SelectItem value="3">3+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amenities Filter */}
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-2 block">
            Special Features
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select feature" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ac">AC/Cooling</SelectItem>
              <SelectItem value="balcony">Balcony/Terrace</SelectItem>
              <SelectItem value="eiffel">Eiffel View</SelectItem>
              <SelectItem value="pet">Pet Friendly</SelectItem>
              <SelectItem value="washer">Washer/Dryer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="checkin" className="text-sm font-medium text-slate-700 mb-2 block">
            Check-in Date
          </Label>
          <Input
            id="checkin"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="checkout" className="text-sm font-medium text-slate-700 mb-2 block">
            Check-out Date
          </Label>
          <Input
            id="checkout"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>

      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold">
        Search Properties
      </Button>
    </Card>
  )
}
