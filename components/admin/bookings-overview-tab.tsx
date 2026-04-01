'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Euro, Clock } from 'lucide-react'

interface Booking {
  id: string
  property_name: string
  guest_name: string
  guest_email: string
  check_in: string
  check_out: string
  total_price: number
  status: 'confirmed' | 'pending' | 'cancelled'
  created_at: string
}

export function BookingsOverviewTab() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchBookings()
  }, [filter])

  const fetchBookings = async () => {
    try {
      const response = await fetch(`/api/admin/bookings?status=${filter}`)
      const data = await response.json()
      setBookings(data)
    } catch (error) {
      console.error('[v0] Failed to fetch bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-slate-500">Loading bookings...</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-amber-100 text-amber-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <div>
      <div className="mb-6 flex gap-2">
        {['all', 'confirmed', 'pending', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {bookings.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No bookings found</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-slate-900">{booking.property_name}</h4>
                  <p className="text-sm text-slate-600 mt-1">{booking.guest_name}</p>
                </div>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div className="flex items-center text-slate-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {new Date(booking.check_in).toLocaleDateString()} -
                    {new Date(booking.check_out).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Users className="w-4 h-4 mr-2" />
                  {booking.guest_email}
                </div>
                <div className="flex items-center text-slate-600">
                  <Euro className="w-4 h-4 mr-2" />
                  €{booking.total_price}
                </div>
                <div className="flex items-center text-slate-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {new Date(booking.created_at).toLocaleDateString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
