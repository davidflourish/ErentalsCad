'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Loader, Plus, AlertCircle, Edit, Trash2 } from 'lucide-react'

interface Property {
  id: string
  name: string
  address: string
  price_per_night: number
  bedrooms: number
  bathrooms: number
  active: boolean
  created_at: string
}

export default function VendorPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const supabase = createClient()

        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
          setError('You must be logged in')
          return
        }

        const { data, error: fetchError } = await supabase
          .from('properties')
          .select('*')
          .eq('owner_id', user.id)
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError
        setProperties(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load properties')
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const handleDelete = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId)

      if (error) throw error
      setProperties(properties.filter(p => p.id !== propertyId))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete property')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Properties</h1>
          <Link href="/vendor/properties/add">
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Property
            </Button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {properties.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-slate-600 mb-4">You haven't added any properties yet.</p>
            <Link href="/vendor/properties/add">
              <Button className="bg-blue-600 hover:bg-blue-700">Add Your First Property</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <div key={property.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{property.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{property.address}</p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                    <div className="bg-slate-100 p-2 rounded text-center">
                      <p className="text-slate-600">Beds</p>
                      <p className="font-semibold text-slate-900">{property.bedrooms}</p>
                    </div>
                    <div className="bg-slate-100 p-2 rounded text-center">
                      <p className="text-slate-600">Baths</p>
                      <p className="font-semibold text-slate-900">{property.bathrooms}</p>
                    </div>
                    <div className="bg-slate-100 p-2 rounded text-center">
                      <p className="text-slate-600">Price</p>
                      <p className="font-semibold text-slate-900">€{property.price_per_night}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-3 h-3 rounded-full ${property.active ? 'bg-green-500' : 'bg-slate-400'}`} />
                    <span className="text-sm text-slate-600">
                      {property.active ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/vendor/properties/edit/${property.id}`} className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 text-sm">
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
