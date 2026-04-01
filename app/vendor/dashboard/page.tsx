import { requireAuth } from '@/lib/rbac'
import { VendorDashboardContent } from '@/components/vendor/vendor-dashboard-content'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Vendor Dashboard - ErentalsCad',
  description: 'Manage your properties and bookings',
}

export default async function VendorDashboardPage() {
  try {
    const context = await requireAuth(['vendor'])
    return <VendorDashboardContent userId={context.userId} vendorId={context.vendorId} />
  } catch {
    redirect('/auth/login')
  }
}
