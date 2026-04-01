'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signUpAction(email: string, password: string, fullName: string) {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || process.env.NEXT_PUBLIC_SITE_URL}/auth/sign-up-success`,
      },
    })

    if (error) {
      return { error: error.message }
    }

    return {
      success: true,
      message: 'Check your email for confirmation link',
      user: data.user,
    }
  } catch (error) {
    console.error('[v0] Sign up error:', error)
    return { error: 'An unexpected error occurred' }
  }
}

export async function signInAction(email: string, password: string) {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }

    redirect('/dashboard')
  } catch (error) {
    console.error('[v0] Sign in error:', error)
    return { error: 'An unexpected error occurred' }
  }
}

export async function signOutAction() {
  const supabase = await createClient()

  try {
    await supabase.auth.signOut()
    redirect('/')
  } catch (error) {
    console.error('[v0] Sign out error:', error)
    return { error: 'Failed to sign out' }
  }
}

export async function getUser() {
  const supabase = await createClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('[v0] Get user error:', error)
    return null
  }
}

export async function updateUserProfile(updates: { full_name?: string; avatar_url?: string }) {
  const supabase = await createClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Not authenticated' }
    }

    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true, user: data.user }
  } catch (error) {
    console.error('[v0] Update profile error:', error)
    return { error: 'Failed to update profile' }
  }
}

export async function resetPassword(email: string) {
  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    })

    if (error) {
      return { error: error.message }
    }

    return {
      success: true,
      message: 'Check your email for password reset link',
    }
  } catch (error) {
    console.error('[v0] Reset password error:', error)
    return { error: 'Failed to send reset email' }
  }
}
