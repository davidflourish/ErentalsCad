import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { LuxuryApartmentsDisplay } from '@/components/paris-rental/luxury-apartments-display'

export const metadata = {
  title: 'Luxury Premium Apartments | Paris Rental',
  description: 'Explore our exclusive collection of luxury apartments in Paris - refined elegance for discerning travelers.',
}

export default function LuxuryApartmentsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="outline" className="mb-6 bg-white/10 border-white/30 hover:bg-white/20 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back Home
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Luxury Premium Collection</h1>
          <p className="text-xl text-amber-100">
            Our most exclusive apartments - refined elegance for discerning travelers
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <p className="text-lg text-slate-600 max-w-3xl">
            Discover our hand-curated selection of luxury apartments across Paris's most prestigious arrondissements. 
            Each property combines sophisticated design, premium amenities, and authentic Parisian charm.
          </p>
        </div>

        {/* Apartments Grid */}
        <LuxuryApartmentsDisplay />

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Can't Find Your Perfect Apartment?
          </h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Contact our concierge team for personalized recommendations and special requests.
          </p>
          <Link href="/booking-inquiry">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 px-8">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
