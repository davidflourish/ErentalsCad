'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, Mail, Phone, MapPin } from 'lucide-react'

interface Vendor {
  id: string
  business_name: string
  email: string
  phone: string
  city: string
  country: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  tax_id: string
}

export function VendorApprovalTab() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [approving, setApproving] = useState<string | null>(null)

  useEffect(() => {
    fetchVendors()
  }, [])

  const fetchVendors = async () => {
    try {
      const response = await fetch('/api/admin/vendors')
      const data = await response.json()
      setVendors(data)
    } catch (error) {
      console.error('[v0] Failed to fetch vendors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApproveVendor = async (vendorId: string) => {
    setApproving(vendorId)
    try {
      const response = await fetch('/api/admin/vendors/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId }),
      })

      if (response.ok) {
        setVendors((prev) =>
          prev.map((v) => (v.id === vendorId ? { ...v, status: 'approved' } : v))
        )
      }
    } catch (error) {
      console.error('[v0] Failed to approve vendor:', error)
    } finally {
      setApproving(null)
    }
  }

  const handleRejectVendor = async (vendorId: string) => {
    setApproving(vendorId)
    try {
      const response = await fetch('/api/admin/vendors/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId }),
      })

      if (response.ok) {
        setVendors((prev) =>
          prev.map((v) => (v.id === vendorId ? { ...v, status: 'rejected' } : v))
        )
      }
    } catch (error) {
      console.error('[v0] Failed to reject vendor:', error)
    } finally {
      setApproving(null)
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-slate-500">Loading vendors...</div>
  }

  const pendingVendors = vendors.filter((v) => v.status === 'pending')
  const approvedVendors = vendors.filter((v) => v.status === 'approved')
  const rejectedVendors = vendors.filter((v) => v.status === 'rejected')

  return (
    <div className="space-y-8">
      {/* Pending Vendors */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-amber-600" />
          Pending Approval ({pendingVendors.length})
        </h3>
        {pendingVendors.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No pending vendors</p>
        ) : (
          <div className="grid gap-4">
            {pendingVendors.map((vendor) => (
              <Card key={vendor.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-slate-900">{vendor.business_name}</h4>
                    <p className="text-sm text-slate-600 mt-1">Tax ID: {vendor.tax_id}</p>
                  </div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Pending
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center text-slate-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {vendor.email}
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {vendor.phone}
                  </div>
                  <div className="flex items-center text-slate-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {vendor.city}, {vendor.country}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleApproveVendor(vendor.id)}
                    disabled={approving === vendor.id}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRejectVendor(vendor.id)}
                    disabled={approving === vendor.id}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Approved Vendors */}
      {approvedVendors.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Approved ({approvedVendors.length})
          </h3>
          <div className="grid gap-4">
            {approvedVendors.slice(0, 3).map((vendor) => (
              <Card key={vendor.id} className="p-4 bg-green-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">{vendor.business_name}</h4>
                    <p className="text-sm text-slate-600">{vendor.email}</p>
                  </div>
                  <Badge className="bg-green-600">Approved</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
