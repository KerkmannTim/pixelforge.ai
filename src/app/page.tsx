'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    setEmail(session?.user?.email || null)
    setLoading(false)
  }

  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setEmail(null)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-white">
          PixelForge<span className="text-indigo-500">.ai</span>
        </div>
        {!email ? (
          <button
            onClick={handleLogin}
            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full font-medium border border-white/10 flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S14.86 2 12.2 2C6.73 2 2 6.48 2 12s4.73 10 10.2 10c5.16 0 8.68-3.64 8.68-9.09 0-1.21-.15-1.81-.15-1.81z"/>
            </svg>
            Mit Google anmelden
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-gray-300 text-sm">{email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-white">
          Kuratierte KI-Bilder.<br/>
          <span className="text-indigo-500">Fair bepreist nach Qualität.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
          Kein Müll. Keine Abos. Du zahlst nur, was das Bild wirklich wert ist.
        </p>
        {!email && (
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-6 max-w-xl mx-auto">
            <p className="text-indigo-300">🔐 Melde dich an um Bilder herunterzuladen</p>
          </div>
        )}
        {email && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 max-w-xl mx-auto">
            <p className="text-emerald-300">✅ Angemeldet - Bilder herunterladen!</p>
          </div>
        )}
      </main>

      {/* Gallery */}
      <section className="border-t border-white/5 bg-black/20 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center text-white">Beispiel-Galerie</h2>
          <p className="text-gray-400 text-center mb-16">Je höher das Rating, desto höher der Preis</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Cyberpunk', rating: 95, price: 0.99, img: 'photo-1535295972055-1c762f4483e5', color: 'text-emerald-400' },
              { name: 'Landschaft', rating: 65, price: 0.69, img: 'photo-1464822759023-fed622ff2c3b', color: 'text-amber-400' },
              { name: 'Abstrakt', rating: 25, price: 0.29, img: 'photo-1541701494587-cb58502866ab', color: 'text-pink-400' },
            ].map((item) => (
              <div key={item.name} className="bg-gray-900 rounded-2xl overflow-hidden border border-white/5">
                <img
                  src={`https://images.unsplash.com/${item.img}?w=800&h=600`}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="font-bold text-white">{item.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {item.rating >= 90 ? 'Perfekt' : item.rating >= 60 ? 'Gut' : 'Basis'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`${item.color} font-mono text-sm`}>★ {item.rating}/100</div>
                      <div className="text-2xl font-black text-white">{item.price.toFixed(2).replace('.', ',')} €</div>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Download: ${item.name}\nPreis: ${item.price.toFixed(2).replace('.', ',')} €`)}
                    className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-medium"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-gray-500 text-sm">
        <p>© 2026 PixelForge.ai</p>
      </footer>
    </div>
  )
}
