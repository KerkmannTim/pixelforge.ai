'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState('Verarbeite Login...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        
        if (session) {
          setStatus('✅ Erfolgreich! Weiterleitung...')
          setTimeout(() => router.push('/'), 1000)
        } else {
          setStatus('Keine Session - Weiterleitung...')
          setTimeout(() => router.push('/'), 2000)
        }
      } catch (err: any) {
        setStatus('Fehler: ' + err.message)
        setTimeout(() => router.push('/'), 3000)
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2 text-white">Anmeldung...</h1>
        <p className="text-gray-400">{status}</p>
      </div>
    </div>
  )
}
