import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const propertyId = params.id

    const supabase = await createClient()

    const { data: property, error: propError } = await supabase
      .from('properties')
      .select(
        `
        id,
        name,
        description,
        location,
        arrondissement,
        price_per_night,
        bedrooms,
        bathrooms,
        max_guests,
        amenities,
        registration_number,
        images,
        status,
        vendor_id
      `
      )
      .eq('id', propertyId)
      .eq('active', true)
      .single()

    if (propError || !property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    // Fetch vendor info from profiles
    const { data: vendor } = await supabase
      .from('profiles')
      .select('id, business_name, email')
      .eq('id', property.vendor_id)
      .single()

    // Fetch reviews
    const { data: reviews } = await supabase
      .from('reviews')
      .select('id, rating, comment, created_at')
      .eq('property_id', propertyId)
      .order('created_at', { ascending: false })

    return NextResponse.json({
      ...property,
      vendor,
      reviews: reviews || [],
    })
  } catch (error) {
    console.error('[v0] Property fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 })
  }
}
