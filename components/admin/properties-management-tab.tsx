'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Home, MapPin, Euro, Users, Edit, Trash2 } from 'lucide-react'

interface Property {
  id: string
  name: string
  location: string
  arrondissement: string
  price_per_night: number
  bedrooms: number
  bathrooms: number
  max_guests: number
  status: 'active' | 'inactive'
  vendor_id: string
  registration_number: string
}

export function PropertiesManagementTab() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'active' | 'all'>('active')

  useEffect(() => {
    fetchProperties()
  }, [filter])

  const fetchProperties = async () => {
    try {
      const response = await fetch(`/api/admin/properties?status=${filter}`)
      const data = await response.json()
      setProperties(data)
    } catch (error) {
      console.error('[v0] Failed to fetch properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (propertyId: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        await fetch(`/api/admin/properties/${propertyId}`, { method: 'DELETE' })
        setProperties((prev) => prev.filter((p) => p.id !== propertyId))
      } catch (error) {
        console.error('[v0] Failed to delete property:', error)
      }
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-slate-500">Loading properties...</div>
  }

  return (
    <div>
      <div className="mb-6 flex gap-2">
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          onClick={() => setFilter('active')}
        >
          Active Only
        </Button>
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All Properties
        </Button>
      </div>

      {properties.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No properties found</p>
      ) : (
        <div className="grid gap-4">
          {properties.map((property) => (
            <Card key={property.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Home className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{property.name}</h4>
                    <div className="flex items-center text-sm text-slate-600 mt-1 gap-2">
                      <MapPin className="w-4 h-4" />
                      {property.arrondissement} Arrondissement
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Reg: {property.registration_number}</p>
                  </div>
                </div>
                <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                  {property.status}
                </Badge>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                <div className="flex items-center text-slate-600">
                  <Euro className="w-4 h-4 mr-2" />
                  €{property.price_per_night}/night
                </div>
                <div className="text-slate-600">{property.bedrooms} Bedrooms</div>
                <div className="text-slate-600">{property.bathrooms} Bathrooms</div>
                <div className="flex items-center text-slate-600">
                  <Users className="w-4 h-4 mr-2" />
                  {property.max_guests} Guests
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(property.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
