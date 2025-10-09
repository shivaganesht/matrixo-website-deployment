import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - matriXO',
  description: 'Latest news, updates, and insights from matriXO.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white section-padding">
        <div className="container-custom px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Blog & <span className="gradient-text">News</span>
            </h1>
            <p className="text-2xl text-gray-300">
              Coming Soon
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
