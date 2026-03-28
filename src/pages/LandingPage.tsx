import Link from 'next/link'
import {
  Zap,
  Dumbbell,
  Apple,
  TrendingUp,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Shield,
} from 'lucide-react'

const features = [
  {
    icon: Dumbbell,
    title: 'Workout Tracker',
    desc: 'Log every set, rep and weight. 300+ exercises with form guides. Build custom plans that actually fit your life.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    icon: Apple,
    title: 'Nutrition & Macros',
    desc: 'Track calories, protein, carbs and fat without the paywall. Search from 1M+ foods. Hit your goals every day.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    desc: 'See your body transform with beautiful charts. Track weight, body measurements, PRs and consistency streaks.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
]

const benefits = [
  'Free forever – no credit card required',
  'No ads, no upsells, no paywalls',
  'Your data stays yours – export anytime',
  'Open source – inspect the code yourself',
  'Works on any device – mobile & desktop',
  'Built by athletes, for athletes',
]

const stats = [
  { label: 'GitHub Stars', value: '0', icon: Star },
  { label: 'Contributors', value: '1', icon: Users },
  { label: 'Open Source', value: '100%', icon: Shield },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Nav */}
      <nav className="border-b border-gray-800 sticky top-0 z-50 bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">FitFlow</span>
            <span className="hidden sm:inline-flex text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Open Source</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Leon-Kuehn/fitness-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          Free &amp; Open Source Forever
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
          The Fitness App That{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
            Actually Works
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Track workouts, nutrition and progress without subscriptions,
          paywalls or data harvesting. FitFlow is free, open source and
          built for serious athletes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-base px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            Start Tracking Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/Leon-Kuehn/fitness-app"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-700 hover:border-gray-500 text-white text-base px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Star on GitHub
          </a>
        </div>
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-black text-white mb-1">{value}</div>
              <div className="text-sm text-gray-500 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Everything you need. Nothing you don&apos;t.</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Most fitness apps lock basic features behind $15/month plans. FitFlow gives you everything for free.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Why FitFlow beats paid alternatives
            </h2>
            <p className="text-gray-400 mb-8">
              MyFitnessPal charges $20/month. Hevy charges $10/month. FitFlow charges $0 – and always will.
            </p>
            <div className="space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <div className="text-center py-8">
              <div className="text-5xl font-black text-indigo-400 mb-2">$0</div>
              <div className="text-white font-semibold text-lg mb-1">Forever Free</div>
              <div className="text-gray-400 text-sm mb-8">No credit card. No trial. No catch.</div>
              <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white w-full flex items-center justify-center gap-2 text-base py-3 rounded-lg transition-colors">
                Start Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Open Source CTA */}
      <section className="border-t border-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ExternalLink className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Open Source &amp; Community Driven</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            FitFlow is built in public. Star us on GitHub, open issues, submit PRs.
            Every feature is built based on real athlete needs.
          </p>
          <a
            href="https://github.com/Leon-Kuehn/fitness-app"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-700 hover:border-gray-500 text-white inline-flex items-center gap-2 px-6 py-2.5 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-500 rounded-md flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">FitFlow</span>
          </div>
          <p className="text-xs text-gray-500">
            MIT License • Open Source • Free Forever
          </p>
          <a
            href="https://github.com/Leon-Kuehn/fitness-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-300 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  )
}
