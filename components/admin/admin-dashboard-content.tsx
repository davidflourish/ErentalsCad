'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3,
  Users,
  Home,
  Calendar,
  CheckCircle,
  AlertCircle,
  Eye,
  Ban,
  LogOut,
} from 'lucide-react'
import { VendorApprovalTab } from './vendor-approval-tab'
import { PropertiesManagementTab } from './properties-management-tab'
import { BookingsOverviewTab } from './bookings-overview-tab'

interface AdminDashboardContentProps {
  userId: string | null
}

type TabType = 'overview' | 'vendors' | 'properties' | 'bookings'

export function AdminDashboardContent({ userId }: AdminDashboardContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [stats, setStats] = useState({
    totalVendors: 0,
    approvedVendors: 0,
    pendingVendors: 0,
    totalProperties: 0,
    totalBookings: 0,
    revenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('[v0] Failed to fetch stats:', error)
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
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">FlourishParisNest Management</p>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-slate-600 hover:text-red-600"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Vendors */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Vendors</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {loading ? '-' : stats.totalVendors}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          {/* Pending Approval */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Pending Approval</p>
                <p className="text-3xl font-bold text-amber-600 mt-2">
                  {loading ? '-' : stats.pendingVendors}
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </Card>

          {/* Active Properties */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Active Properties</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {loading ? '-' : stats.totalProperties}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Home className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          {/* Total Bookings */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-indigo-600 mt-2">
                  {loading ? '-' : stats.totalBookings}
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </Card>

          {/* Total Revenue */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {loading ? '-' : `€${stats.revenue.toLocaleString()}`}
                </p>
              </div>
              <div className="bg-slate-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-slate-600" />
              </div>
            </div>
          </Card>

          {/* Approved Vendors */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Approved Vendors</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {loading ? '-' : stats.approvedVendors}
                </p>
              </div>
              <div className="bg-slate-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b border-slate-200">
            {(
              [
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'vendors', label: 'Vendors', icon: Users },
                { id: 'properties', label: 'Properties', icon: Home },
                { id: 'bookings', label: 'Bookings', icon: Calendar },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <tab.icon className="w-4 h-4 inline mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="text-center py-12">
                <p className="text-slate-600 mb-4">Welcome to FlourishParisNest Admin</p>
                <p className="text-slate-500 text-sm">
                  Use the tabs above to manage vendors, properties, and bookings
                </p>
              </div>
            )}
            {activeTab === 'vendors' && <VendorApprovalTab />}
            {activeTab === 'properties' && <PropertiesManagementTab />}
            {activeTab === 'bookings' && <BookingsOverviewTab />}
          </div>
        </div>
      </div>
    </div>
  )
}
