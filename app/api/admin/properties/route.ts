import { requireAuth } from '@/lib/rbac'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    await requireAuth(['super_admin'])

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    const supabase = await createClient()

    let query = supabase.from('properties').select('*')

    if (status && status !== 'all') {
      if (status === 'active') {
        query = query.eq('active', true)
      } else if (status === 'inactive') {
        query = query.eq('active', false)
      }
    }

    const { data: properties, error } = await query

    if (error) throw error

    return NextResponse.json(properties)
  } catch (error) {
    console.error('[v0] Properties API error:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAuth(['super_admin'])

    const { searchParams } = request.nextUrl
    const propertyId = searchParams.get('id')

    if (!propertyId) {
      return NextResponse.json({ error: 'Missing property ID' }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from('properties').delete().eq('id', propertyId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Delete property error:', error)
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 })
  }
}
