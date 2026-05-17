import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { Profile, Employee } from '../types'
import toast from 'react-hot-toast'

export interface AuthUser {
  id: string
  email: string
  profile: Profile | null
  employee: Employee | null
}

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  employee: Employee | null
  authUser: AuthUser | null
  loading: boolean
  signInWithEmail: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch profile data
  const fetchProfile = async (userId: string) => {
    try {
      console.log('📋 Fetching profile for user:', userId)
      const startTime = Date.now()

      const profilePromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Profile query timeout')), 8000)
      )

      const { data, error } = await Promise.race([profilePromise, timeoutPromise]) as any

      const elapsed = Date.now() - startTime
      console.log(`⏱️ Profile query completed in ${elapsed}ms`)

      if (error) {
        console.error('❌ Profile fetch error:', error)
        setProfile(null)
        return null
      }
      console.log('✅ Profile fetched:', data)
      setProfile(data)
      return data
    } catch (error: any) {
      console.error('❌ Error fetching profile:', error.message)
      setProfile(null)
      return null
    }
  }

  // Fetch employee data (for clinicians)
  const fetchEmployee = async (email: string) => {
    try {
      console.log('👔 Fetching employee for email:', email)
      const startTime = Date.now()

      const employeePromise = supabase
        .from('employees')
        .select('*')
        .eq('email', email)
        .maybeSingle()

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Employee query timeout')), 8000)
      )

      const { data, error } = await Promise.race([employeePromise, timeoutPromise]) as any

      const elapsed = Date.now() - startTime
      console.log(`⏱️ Employee query completed in ${elapsed}ms`)

      if (error) {
        console.error('❌ Employee fetch error:', error)
        setEmployee(null)
        return null
      }

      if (!data) {
        console.log('ℹ️ No employee record found for email:', email)
        setEmployee(null)
        return null
      }

      console.log('✅ Employee fetched:', data)
      setEmployee(data)
      return data
    } catch (error: any) {
      console.error('❌ Error fetching employee:', error.message)
      setEmployee(null)
      return null
    }
  }

  // Initialize auth state
  useEffect(() => {
    console.log('🔐 Initializing auth...')
    let safetyTimeout: NodeJS.Timeout
    let isMounted = true

    // Check if this is a magic link callback
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const hasAuthTokens = hashParams.has('access_token') || hashParams.has('refresh_token')

    if (hasAuthTokens) {
      console.log('🔗 Magic link detected - will be processed by onAuthStateChange')
    }

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return

      console.log('🔄 Auth state changed:', event, {
        session: !!session,
        user: session?.user?.email
      })

      // Skip early SIGNED_IN unless it's a magic link
      if (event === 'SIGNED_IN' && !hasAuthTokens) {
        console.log('⏭️ Skipping early SIGNED_IN - waiting for INITIAL_SESSION')
        return
      }

      // Update state
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        console.log('👤 User session established:', session.user.email)

        // Fetch profile and employee data in parallel
        try {
          if (session.user.email) {
            const results = await Promise.allSettled([
              fetchProfile(session.user.id),
              fetchEmployee(session.user.email)
            ])
            console.log('📊 Fetch results:', {
              profile: results[0].status,
              employee: results[1].status
            })
          } else {
            await fetchProfile(session.user.id)
          }
        } catch (err) {
          console.error('❌ Error fetching profile/employee:', err)
        }

        console.log('✅ Auth and data fetch complete')
        if (safetyTimeout) clearTimeout(safetyTimeout)
        setLoading(false)
      } else {
        console.log('👋 No session - user logged out')
        setProfile(null)
        setEmployee(null)
        if (safetyTimeout) clearTimeout(safetyTimeout)
        setLoading(false)
      }

      if (event === 'SIGNED_IN') {
        console.log('✅ User signed in successfully')
        // Clean up URL hash after successful sign in
        if (window.location.hash) {
          console.log('🧹 Cleaning up URL hash')
          window.history.replaceState(null, '', window.location.pathname)
        }
      }
    })

    // Manually trigger session check if not a magic link
    if (!hasAuthTokens) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        console.log('📦 Manual session check result:', !!session, session?.user?.email)
      }).catch(err => {
        console.error('❌ Error in manual session check:', err)
      })
    }

    // Set a safety timeout
    safetyTimeout = setTimeout(() => {
      console.warn('⚠️ Auth timeout after 10 seconds')
      setLoading(false)
    }, 10000)

    return () => {
      console.log('🧹 Cleaning up auth subscription')
      isMounted = false
      if (safetyTimeout) clearTimeout(safetyTimeout)
      subscription.unsubscribe()
    }
  }, [])

  // Sign in with magic link
  const signInWithEmail = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`
      console.log('📧 Sending magic link to:', email)

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl,
          shouldCreateUser: true,
        },
      })

      if (error) throw error

      toast.success('Check your email for the magic link!')
    } catch (error: any) {
      console.error('❌ Error signing in:', error)
      toast.error(error.message || 'Failed to send magic link')
      throw error
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setUser(null)
      setSession(null)
      setProfile(null)
      setEmployee(null)
      toast.success('Signed out successfully')
    } catch (error: any) {
      console.error('Error signing out:', error)
      toast.error(error.message || 'Failed to sign out')
      throw error
    }
  }

  const authUser: AuthUser | null = user
    ? {
        id: user.id,
        email: user.email!,
        profile,
        employee,
      }
    : null

  const value = {
    user,
    session,
    profile,
    employee,
    authUser,
    loading,
    signInWithEmail,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
