'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Star, Loader, AlertCircle } from 'lucide-react'

interface Review {
  id: string
  rating: number
  comment: string
  created_at: string
  guest_name?: string
}

interface ReviewListProps {
  propertyId: string
}

export function ReviewList({ propertyId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [avgRating, setAvgRating] = useState(0)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const supabase = createClient()
        
        const { data, error: fetchError } = await supabase
          .from('reviews')
          .select('*')
          .eq('property_id', propertyId)
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError

        setReviews(data || [])

        if (data && data.length > 0) {
          const avg = data.reduce((sum: number, review: Review) => sum + review.rating, 0) / data.length
          setAvgRating(Math.round(avg * 10) / 10)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load reviews')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [propertyId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <p className="text-red-800 text-sm">{error}</p>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">No reviews yet. Be the first to review this property!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(avgRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <p className="text-2xl font-bold text-slate-900">{avgRating}</p>
        </div>
        <div>
          <p className="text-slate-600">{reviews.length} reviews</p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex items-start justify-between mb-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-500">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-slate-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
