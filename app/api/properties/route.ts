import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { searchParams } = new URL(request.url)
    const arrondissement = searchParams.get('arrondissement')
    const minPrice = searchParams.get('min_price')
    const maxPrice = searchParams.get('max_price')
    const bedrooms = searchParams.get('bedrooms')
    const checkIn = searchParams.get('check_in')
    const checkOut = searchParams.get('check_out')

    let query = supabase.from('properties').select('*').eq('active', true)

    // Apply filters
    if (arrondissement) {
      query = query.eq('arrondissement', parseInt(arrondissement))
    }

    if (minPrice) {
      query = query.gte('price_per_night', parseFloat(minPrice))
    }

    if (maxPrice) {
      query = query.lte('price_per_night', parseFloat(maxPrice))
    }

    if (bedrooms) {
      query = query.eq('bedrooms', parseInt(bedrooms))
    }

    const { data: properties, error } = await query.order('price_per_night', { ascending: true })

    if (error) {
      console.error('[v0] Properties fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
    }

    // Filter by availability dates if provided
    let filteredProperties = properties || []

    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn)
      const checkOutDate = new Date(checkOut)

      filteredProperties = filteredProperties.filter((property: any) => {
        // Simple availability check - in production, check against bookings table
        return true // Placeholder
      })
    }

    return NextResponse.json(
      {
        properties: filteredProperties,
        count: filteredProperties.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('[v0] Properties API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check if user is vendor or admin
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized - Must be logged in' }, { status: 403 })
    }

    // Check user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('vendor_status')
      .eq('id', user.id)
      .single()

    if (!profile || (profile.vendor_status !== 'approved' && profile.vendor_status !== 'admin')) {
      return NextResponse.json({ error: 'Unauthorized - Vendor approval required' }, { status: 403 })
    }

    const {
      name,
      description,
      arrondissement,
      location,
      bedrooms,
      bathrooms,
      price_per_night,
      amenities,
      images,
      max_guests,
      registration_number,
    } = await request.json()

    // Validate required fields
    if (!name || !arrondissement || !bedrooms || !price_per_night) {
      return NextResponse.json({ error: 'Missing required fields: name, arrondissement, bedrooms, price_per_night' }, { status: 400 })
    }

    const { data: property, error } = await supabase.from('properties').insert({
      name,
      description: description || null,
      arrondissement,
      location: location || null,
      bedrooms,
      bathrooms: bathrooms || 1,
      price_per_night,
      max_guests: max_guests || bedrooms * 2,
      amenities: amenities || [],
      images: images || [],
      registration_number: registration_number || null,
      vendor_id: user.id,
      active: true,
    })

    if (error) {
      console.error('[v0] Property creation error:', error)
      return NextResponse.json({ error: 'Failed to create property' }, { status: 500 })
    }

    return NextResponse.json({ success: true, property: property[0] }, { status: 201 })
  } catch (error) {
    console.error('[v0] Property POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
