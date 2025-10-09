import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import EventDetail from '@/components/events/EventDetail'
import eventsData from '@/data/events.json'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = eventsData.find(e => e.slug === params.slug)
  
  if (!event) {
    return {
      title: 'Event Not Found - matriXO',
    }
  }

  return {
    title: `${event.title} - matriXO`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [event.images.banner],
    },
  }
}

export async function generateStaticParams() {
  return eventsData.map((event) => ({
    slug: event.slug,
  }))
}

export default function EventPage({ params }: Props) {
  const event = eventsData.find(e => e.slug === params.slug)

  if (!event) {
    notFound()
  }

  return <EventDetail event={event} />
}
