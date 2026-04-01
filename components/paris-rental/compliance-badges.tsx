'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Shield, FileCheck, AlertCircle } from 'lucide-react'

export function ComplianceBadges() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          100% Compliant & Verified
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          All properties meet 2026 French rental regulations. No hidden surprises, no legal risks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Registration & Compliance */}
        <Card className="p-6 border-2 border-green-200 bg-green-50">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">National Registration</h3>
              <p className="text-slate-700 mb-4">
                Every property displays a valid registration number (e.g., 75PAR9876543210). Required since May 20, 2026.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-slate-600">✓ Proof of primary residence verified</p>
                <p className="text-slate-600">✓ 90-day cap enforced for primary residences</p>
                <p className="text-slate-600">✓ Tourist tax included in pricing</p>
              </div>
            </div>
          </div>
        </Card>

        {/* DPE Ratings */}
        <Card className="p-6 border-2 border-blue-200 bg-blue-50">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Energy Ratings (DPE)</h3>
              <p className="text-slate-700 mb-4">
                All apartments rated A–E. Grade G banned since 2025. Stricter A–D requirements by 2034.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-slate-600">🏆 Grade A: Most efficient</p>
                <p className="text-slate-600">✓ Grade B-C: Standard comfort</p>
                <p className="text-slate-600">⚠ Grade D-E: Basic, lower pricing</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Verification Process */}
        <Card className="p-6 border-2 border-purple-200 bg-purple-50">
          <div className="flex items-start gap-4">
            <FileCheck className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Verified Properties</h3>
              <p className="text-slate-700 mb-4">
                Our team manually verifies every property. No shortcuts.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-slate-600">✓ Registration certificates uploaded</p>
                <p className="text-slate-600">✓ DPE certificates on file</p>
                <p className="text-slate-600">✓ Photos verified authentic</p>
                <p className="text-slate-600">✓ Owner identity confirmed</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Legal Compliance Info */}
        <Card className="p-6 border-2 border-amber-200 bg-amber-50">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">2026 Regulations</h3>
              <p className="text-slate-700 mb-4">
                Stay compliant. Fines up to €100,000+ for violations.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-slate-600">€10k–€100k+: Non-compliance fines</p>
                <p className="text-slate-600">90-day cap: For primary residences</p>
                <p className="text-slate-600">Tourist tax: 5% in Paris 2026</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* DPE Rating Guide */}
      <Card className="p-8">
        <h3 className="font-bold text-xl text-slate-900 mb-6">DPE Energy Rating Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { grade: 'A', color: 'bg-green-500', desc: 'Most Efficient' },
            { grade: 'B', color: 'bg-green-400', desc: 'Very Good' },
            { grade: 'C', color: 'bg-yellow-400', desc: 'Good' },
            { grade: 'D', color: 'bg-orange-400', desc: 'Moderate' },
            { grade: 'E', color: 'bg-red-500', desc: 'Poor (Legacy)' },
          ].map((rating) => (
            <div key={rating.grade} className="text-center">
              <div className={`${rating.color} h-24 rounded-lg flex items-center justify-center mb-3`}>
                <span className="text-white font-bold text-3xl">{rating.grade}</span>
              </div>
              <p className="font-semibold text-slate-900">{rating.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Compliance Badges for Listings */}
      <div className="mt-12 p-8 bg-slate-50 rounded-lg border border-slate-200">
        <h3 className="font-bold text-lg text-slate-900 mb-6">Every Listing Display</h3>
        <div className="flex flex-wrap gap-3">
          <Badge className="bg-green-100 text-green-800 text-sm px-4 py-2">
            ✓ Reg: 75PAR9876543210
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 text-sm px-4 py-2">
            DPE: B Rating
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 text-sm px-4 py-2">
            Primary Residence: No
          </Badge>
          <Badge className="bg-orange-100 text-orange-800 text-sm px-4 py-2">
            Tourist Tax: Included
          </Badge>
          <Badge className="bg-slate-100 text-slate-800 text-sm px-4 py-2">
            Verified Owner
          </Badge>
        </div>
      </div>
    </div>
  )
}
