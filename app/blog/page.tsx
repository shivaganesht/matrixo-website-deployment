import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - matriXO',
  description: 'Latest news, updates, and insights from matriXO.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white section-padding">
        <div className="container-custom px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gray-900 dark:text-white">
              Blog & <span className="text-blue-600 dark:text-blue-500">News</span>
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              Coming Soon
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
