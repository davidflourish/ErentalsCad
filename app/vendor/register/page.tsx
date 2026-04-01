'use client'

import { VendorRegistrationForm } from '@/components/vendor/vendor-registration-form'

export default function VendorRegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Become an ErentalsCad Partner</h1>
          <p className="text-lg text-slate-600">
            List your Paris apartments on our platform and start earning today
          </p>
        </div>
        <VendorRegistrationForm />
      </div>
    </div>
  )
}
