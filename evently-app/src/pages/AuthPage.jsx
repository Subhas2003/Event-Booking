import { useLayoutEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import gsap from 'gsap'
import HeroScene from '../components/ThreeBackground.jsx'
import { selectIsAuthenticated, signIn, signUp } from '../store/authSlice.js'

const COPY = {
  login: {
    eyebrow: 'Welcome back, explorer',
    title: 'Your next great night starts here.',
    description: 'Pick up where you left off and get back to the experiences worth remembering.',
    heading: 'Sign in to Evently',
    submit: 'Enter Evently',
    alternate: 'New to Evently?',
    alternateAction: 'Create an account',
    alternatePath: '/signup',
  },
  signup: {
    eyebrow: 'Join the live side',
    title: 'Make room for more moments.',
    description: 'Create your free account to save events, unlock faster checkout, and follow the scenes you love.',
    heading: 'Create your account',
    submit: 'Start exploring',
    alternate: 'Already have an account?',
    alternateAction: 'Sign in',
    alternatePath: '/login',
  },
}

export default function AuthPage({ mode }) {
  const copy = COPY[mode]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion) {
        gsap.set('.auth-shell, .auth-panel, .auth-copy > *', { clearProps: 'opacity,transform' })
        return
      }

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.auth-shell', { opacity: 0, y: 24, scale: 0.985 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 })
        .fromTo('.auth-panel', { opacity: 0, x: 18 }, { opacity: 1, x: 0, duration: 0.55 }, '-=0.38')
        .fromTo('.auth-copy > *', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.42')
    })
    return () => context.revert()
  }, [mode])

  if (isAuthenticated) return <Navigate to="/" replace />

  const updateField = (event) => {
    setError('')
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const email = form.email.trim().toLowerCase()

    if (!email || !email.includes('@')) {
      setError('Enter a valid email address to continue.')
      return
    }
    if (form.password.length < 8) {
      setError('Your password needs at least 8 characters.')
      return
    }
    if (mode === 'signup' && !form.name.trim()) {
      setError('Tell us your name so we can personalize Evently.')
      return
    }
    if (mode === 'signup' && form.password !== form.confirmPassword) {
      setError('The passwords do not match.')
      return
    }

    const user = { name: form.name.trim() || email.split('@')[0], email }
    dispatch(mode === 'login' ? signIn(user) : signUp(user))
    navigate('/')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-surface px-margin-sm py-6 md:px-margin lg:px-margin-lg">
      <HeroScene className="absolute inset-0 opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(160,120,255,0.18),transparent_28%),radial-gradient(circle_at_88%_75%,rgba(76,215,246,0.12),transparent_26%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1360px] items-center justify-center">
        <div className="auth-shell grid w-full max-w-6xl overflow-hidden rounded-2xl border border-white/[0.1] bg-surface-container-low/85 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <section className="auth-copy relative hidden min-h-[720px] flex-col justify-between overflow-hidden p-10 lg:flex xl:p-14">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 via-transparent to-tertiary-container/10" />
            <div className="relative">
              <Link to="/" className="inline-flex items-center gap-2 font-display text-headline-md text-on-surface">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary-container to-tertiary font-display text-sm font-extrabold text-on-primary">E</span>
                <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">Evently</span>
              </Link>
            </div>
            <div className="relative max-w-xl text-white">
              <p className="mb-4 font-display text-label-sm uppercase tracking-[0.2em] text-tertiary">{copy.eyebrow}</p>
              <h1 className="font-display text-4xl text-on-surface xl:text-display-hero-mobile">{copy.title}</h1>
              <p className="mt-5 max-w-md text-body-md text-on-surface-variant">{copy.description}</p>
              <div className="mt-8 flex flex-wrap gap-2 font-display text-label-sm text-on-surface-variant">
                <span className="rounded-full bg-surface-container-high px-3 py-2">2,400+ live experiences</span>
                <span className="rounded-full bg-surface-container-high px-3 py-2">Instant QR passes</span>
              </div>
            </div>
            <p className="relative font-body-sm text-outline text-white">Curated for curious people in Kolkata and beyond.</p>
          </section>

          <section className="auth-panel flex min-h-[680px] items-center bg-surface-container/90 p-6 sm:p-10 lg:p-12">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <Link to="/" className="inline-flex items-center gap-2 font-display text-headline-md text-on-surface">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary-container to-tertiary font-display text-sm font-extrabold text-on-primary">E</span>
                  <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">Evently</span>
                </Link>
              </div>
              <p className="font-display text-label-sm uppercase tracking-[0.18em] text-secondary">Evently access</p>
              <h2 className="mt-2 font-display text-white text-4xl text-on-surface ">{copy.heading}</h2>
              <p className="mt-2 text-body-sm text-on-surface-variant text-white">Your ticket wallet, wishlist, and favorite scenes in one place.</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-white">
                {mode === 'signup' && <Field label="Full name" name="name" value={form.name} onChange={updateField} placeholder="Aarav Sharma" autoComplete="name" />}
                <Field label="Email address" name="email" value={form.email} onChange={updateField} placeholder="you@example.com" type="email" autoComplete="email" />
                <Field label="Password" name="password" value={form.password} onChange={updateField} placeholder="8+ characters" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
                {mode === 'signup' && <Field label="Confirm password" name="confirmPassword" value={form.confirmPassword} onChange={updateField} placeholder="Repeat your password" type="password" autoComplete="new-password" />}

                {mode === 'login' && <div className="flex items-center justify-between text-caption text-on-surface-variant"><label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-primary" /> Remember me</label><button type="button" className="text-primary hover:text-secondary">Forgot password?</button></div>}
                {mode === 'signup' && <label className="flex items-start gap-2 text-caption text-on-surface-variant"><input type="checkbox" required className="mt-0.5 h-4 w-4 accent-primary" /> I agree to the Evently terms and privacy policy.</label>}
                {error && <p role="alert" className="rounded-lg border border-error/30 bg-error-container/20 px-3 py-2 text-body-sm text-error">{error}</p>}
                <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary via-primary-container to-secondary px-4 py-3.5 font-display text-label-lg text-on-primary shadow-[0_4px_18px_rgba(160,120,255,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(255,176,205,0.45)]">
                  {copy.submit}<span aria-hidden="true" className="text-xl leading-none transition-transform group-hover:translate-x-1">→</span>
                </button>
              </form>

              <div className="my-7 flex items-center gap-3 text-caption text-outline text-white"><span className="h-px flex-1 bg-outline-variant/50" />or continue with<span className="h-px flex-1 bg-outline-variant/50" /></div>
              <div className="grid grid-cols-2 font-bold text-white gap-3"><SocialButton icon="G" label="Google" /><SocialButton icon="f" label="Facebook" /></div>
              <p className="mt-8 text-center text-white text-body-sm text-on-surface-variant">{copy.alternate} <Link to={copy.alternatePath} className="font-display text-label-md text-primary hover:text-secondary">{copy.alternateAction}</Link></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function Field({ label, name, value, onChange, ...props }) {
  return <label className="block"><span className="mb-2 block font-display text-label-md text-on-surface">{label}</span><input name={name} value={value} onChange={onChange} required className="w-full rounded-xl border border-white/[0.1] bg-surface-container-lowest/80 px-4 py-3 text-body-md text-on-surface outline-none transition-colors placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20" {...props} /></label>
}

function SocialButton({ icon, label }) {
  return <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-surface-container-high/60 px-4 py-3 font-display text-label-md text-on-surface transition-colors hover:border-primary/50 hover:bg-surface-container-high"><span className="font-display text-title-lg text-tertiary">{icon}</span>{label}</button>
}