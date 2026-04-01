import { requireAuth } from '@/lib/rbac'
import { AdminDashboardContent } from '@/components/admin/admin-dashboard-content'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Admin Dashboard - ErentalsCad',
  description: 'Manage vendors, properties, and bookings',
}

export default async function AdminPage() {
  try {
    const context = await requireAuth(['super_admin'])
    return <AdminDashboardContent userId={context.userId} />
  } catch {
    redirect('/auth/login')
  }
}
