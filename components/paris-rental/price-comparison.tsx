'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingDown, DollarSign } from 'lucide-react'

interface PricePoint {
  platform: string
  price: number
  fees: number
  total: number
}

const priceComparison: PricePoint[] = [
  { platform: 'ErentalsCad', price: 280, fees: 0, total: 280 },
  { platform: 'Airbnb Premium', price: 280, fees: 84, total: 364 },
  { platform: 'Booking.com', price: 280, fees: 56, total: 336 },
  { platform: 'Lodgis', price: 280, fees: 42, total: 322 },
  { platform: 'Paris Attitude', price: 280, fees: 70, total: 350 },
]

export function PriceComparison() {
  const maxTotal = Math.max(...priceComparison.map(p => p.total))
  const savings = priceComparison.slice(1).map(p => ({
    platform: p.platform,
    savings: p.total - priceComparison[0].total
  }))

  return (
    <div>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <TrendingDown className="w-8 h-8 text-green-600" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            20-35% Cheaper Direct
          </h2>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          No middleman fees. Direct bookings mean more value for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Bar Chart */}
        <Card className="p-6">
          <h3 className="font-bold text-lg text-slate-900 mb-6">Price Comparison (7-night stay)</h3>
          <div className="space-y-6">
            {priceComparison.map((item, idx) => (
              <div key={item.platform}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${idx === 0 ? 'text-blue-600 font-bold' : 'text-slate-700'}`}>
                    {item.platform}
                  </span>
                  <span className="font-bold text-slate-900">€{(item.total * 7).toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                  <div
                    className={`h-full flex items-center px-3 text-xs font-semibold text-white transition-all ${
                      idx === 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(item.total / maxTotal) * 100}%` }}
                  >
                    {idx === 0 && '✓ Direct'}
                  </div>
                </div>
                {item.fees > 0 && (
                  <p className="text-xs text-slate-500 mt-1">
                    €{item.price} room + €{item.fees} fees
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Savings Breakdown */}
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-start gap-3">
              <DollarSign className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-green-900 mb-2">Average Savings</h4>
                <p className="text-3xl font-bold text-green-600 mb-1">€280-700</p>
                <p className="text-sm text-green-700">per 7-night stay</p>
              </div>
            </div>
          </Card>

          {savings.map((item) => (
            <Card key={item.platform} className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-900">{item.platform}</span>
                <Badge className="bg-green-100 text-green-800">
                  +€{(item.savings * 7).toLocaleString()}
                </Badge>
              </div>
            </Card>
          ))}

          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Why so cheap?</strong> No commission middlemen. We work directly with property owners and pass 100% savings to guests.
            </p>
          </Card>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">0%</div>
          <h4 className="font-bold text-slate-900 mb-2">Commission Fees</h4>
          <p className="text-sm text-slate-600">Direct bookings with property owners, no platform fees</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">Flexible</div>
          <h4 className="font-bold text-slate-900 mb-2">Payment Terms</h4>
          <p className="text-sm text-slate-600">Deposit-based bookings with transparent pricing</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">Instant</div>
          <h4 className="font-bold text-slate-900 mb-2">Booking</h4>
          <p className="text-sm text-slate-600">No waiting - instant or request-to-book options</p>
        </Card>
      </div>
    </div>
  )
}
