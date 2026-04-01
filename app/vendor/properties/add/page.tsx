'use client'

import { PropertyUploadForm } from '@/components/vendor/property-upload-form'

export default function AddPropertyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Add New Property</h1>
          <p className="text-lg text-slate-600">
            Fill in the details below to list your apartment on FlourishParisNest
          </p>
        </div>
        <PropertyUploadForm />
      </div>
    </div>
  )
}
