'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Booking {
  id: string
  guest_name: string
  guest_email: string
  property_id: string
  check_in_date: string
  check_out_date: string
  total_price: number
  status: string
  created_at: string
}

interface Transaction {
  id: string
  transaction_id: string
  amount: number
  status: string
  booking_id: string
  created_at: string
}

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push('/auth/login')
          return
        }

        setUser(user)

        // Fetch bookings
        const bookingsRes = await fetch('/api/bookings')
        if (bookingsRes.ok) {
          const { bookings } = await bookingsRes.json()
          setBookings(bookings || [])
        }

        // Fetch transactions
        const txRes = await fetch('/api/transactions')
        if (txRes.ok) {
          const { transactions } = await txRes.json()
          setTransactions(transactions || [])
        }
      } catch (error) {
        console.error('[v0] Dashboard fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-slate-400">Welcome, {user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <p className="text-slate-400 mb-2">Total Bookings</p>
            <p className="text-3xl font-bold text-white">{bookings.length}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <p className="text-slate-400 mb-2">Pending Transactions</p>
            <p className="text-3xl font-bold text-white">{transactions.filter((t) => t.status === 'pending_review').length}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <p className="text-slate-400 mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-white">
              €{transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300">Guest</th>
                  <th className="text-left py-3 px-4 text-slate-300">Check-in</th>
                  <th className="text-left py-3 px-4 text-slate-300">Check-out</th>
                  <th className="text-left py-3 px-4 text-slate-300">Price</th>
                  <th className="text-left py-3 px-4 text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 px-4 text-center text-slate-400">
                      No bookings yet
                    </td>
                  </tr>
                ) : (
                  bookings.slice(0, 5).map((booking) => (
                    <tr key={booking.id} className="border-b border-slate-700 hover:bg-slate-700">
                      <td className="py-3 px-4 text-white">{booking.guest_name}</td>
                      <td className="py-3 px-4 text-slate-300">{new Date(booking.check_in_date).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-slate-300">{new Date(booking.check_out_date).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-white font-semibold">€{booking.total_price.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'confirmed'
                              ? 'bg-green-900 text-green-200'
                              : booking.status === 'pending_payment'
                                ? 'bg-yellow-900 text-yellow-200'
                                : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-slate-300">Amount</th>
                  <th className="text-left py-3 px-4 text-slate-300">Status</th>
                  <th className="text-left py-3 px-4 text-slate-300">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 px-4 text-center text-slate-400">
                      No transactions yet
                    </td>
                  </tr>
                ) : (
                  transactions.slice(0, 5).map((tx) => (
                    <tr key={tx.id} className="border-b border-slate-700 hover:bg-slate-700">
                      <td className="py-3 px-4 text-white font-mono text-xs">{tx.transaction_id}</td>
                      <td className="py-3 px-4 text-white font-semibold">€{tx.amount.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            tx.status === 'completed'
                              ? 'bg-green-900 text-green-200'
                              : tx.status === 'pending_review'
                                ? 'bg-blue-900 text-blue-200'
                                : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{new Date(tx.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-12 flex gap-4">
          <Link href="/" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
