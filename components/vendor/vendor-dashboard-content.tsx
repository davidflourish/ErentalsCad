'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Home, Calendar, BarChart3, Plus, Edit, Trash2, LogOut } from 'lucide-react'
import Link from 'next/link'

interface VendorDashboardContentProps {
  userId: string | null
  vendorId: string | null
}

interface Property {
  id: string
  name: string
  price_per_night: number
  bedrooms: number
  max_guests: number
  status: string
  created_at: string
}

export function VendorDashboardContent({ vendorId }: VendorDashboardContentProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalBookings: 0,
    revenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVendorData()
  }, [])

  const fetchVendorData = async () => {
    try {
      const [propsRes, statsRes] = await Promise.all([
        fetch('/api/vendor/properties'),
        fetch('/api/vendor/stats'),
      ])

      const propsData = await propsRes.json()
      const statsData = await statsRes.json()

      setProperties(propsData)
      setStats(statsData)
    } catch (error) {
      console.error('[v0] Failed to fetch vendor data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Vendor Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your properties & bookings</p>
          </div>
          <div className="flex gap-2">
            <Link href="/vendor/add-property">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-5 h-5 mr-2" />
                Add Property
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-slate-600 hover:text-red-600"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Properties</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalProperties}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.totalBookings}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600 mt-2">€{stats.revenue}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Properties List */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Properties</h2>

          {loading ? (
            <p className="text-center py-8 text-slate-500">Loading properties...</p>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <Home className="w-12 h-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-600 mb-4">No properties yet</p>
              <Link href="/vendor/add-property">
                <Button className="bg-blue-600 hover:bg-blue-700">Add Your First Property</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {properties.map((property) => (
                <Card key={property.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{property.name}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-slate-600">
                        <span>€{property.price_per_night}/night</span>
                        <span>{property.bedrooms} bedrooms</span>
                        <span>{property.max_guests} guests max</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={property.status === 'active' ? 'default' : 'secondary'}
                      >
                        {property.status}
                      </Badge>
                      <Link href={`/vendor/edit-property/${property.id}`}>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
