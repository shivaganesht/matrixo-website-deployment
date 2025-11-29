# matriXO Website

A modern, responsive event ticketing platform for matriXO - an EdTech startup supported by KPRISE (KPR Foundation for Innovation and Social Empowerment).

## Features

- 🎨 **Modern Design**: Sleek, minimal, Gen Z-friendly UI with dark mode support
- ⚡ **Fast Performance**: Built with Next.js 14 for optimal performance
- 🎯 **Event Management**: Complete event listing, detail pages, and ticketing flow
- 📱 **Mobile-First**: Fully responsive design across all devices
- 🎭 **Smooth Animations**: Framer Motion powered animations throughout
- 🎫 **Ticketing System**: Dynamic pricing, early bird offers, ticket management
- 📊 **Analytics Ready**: SEO optimized with Open Graph tags
- 🔒 **Type-Safe**: Built with TypeScript for reliability

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Notifications**: Sonner
- **Date Handling**: date-fns
- **Database**: MongoDB (optional)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd "c:\Users\shiva\OneDrive\Desktop\matriXO Website"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
matriXO Website/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── events/              # Events pages
│   │   └── [slug]/         # Dynamic event detail pages
│   ├── services/            # Services page
│   ├── team/                # Team page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── about/              # About page components
│   ├── contact/            # Contact page components
│   ├── events/             # Event components
│   ├── home/               # Home page components
│   ├── services/           # Services components
│   ├── team/               # Team components
│   ├── Footer.tsx          # Footer component
│   └── Navbar.tsx          # Navigation component
├── data/                    # Static data files
│   └── events.json         # Event data
├── public/                  # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Key Pages

### Home (`/`)
- Hero section with brand messaging
- Statistics showcase
- About snippet
- Key features
- Partner logos
- Call-to-action sections

### Events (`/events`)
- Filterable event listing
- Search functionality
- Event cards with details
- Ticket availability indicators

### Event Detail (`/events/[slug]`)
- Full event information
- Agenda and schedule
- Speaker profiles
- Ticket purchasing flow
- Interactive booking modal

### Services (`/services`)
- Service offerings
- Pricing plans
- Feature comparisons
- Integration details

### About (`/about`)
- Company story
- Mission & vision
- Core values
- Incubation information

### Team (`/team`)
- Team member profiles
- Social links
- Contact information

### Contact (`/contact`)
- Contact form
- Contact information
- Business hours
- Social media links

## Event Data Structure

Events are stored in `data/events.json` with the following structure:

```json
{
  "id": "unique-id",
  "slug": "url-friendly-slug",
  "title": "Event Title",
  "tagline": "Event tagline",
  "description": "Full description",
  "date": "2025-12-15T09:00:00",
  "venue": "Venue name and address",
  "location": "City, State",
  "totalCapacity": 2000,
  "ticketsSold": 1650,
  "tickets": [
    {
      "id": "ticket-id",
      "name": "Ticket Name",
      "price": 350,
      "originalPrice": 400,
      "available": 150,
      "description": "Ticket description",
      "perks": ["Perk 1", "Perk 2"]
    }
  ],
  "partners": ["Partner 1", "Partner 2"],
  "sponsors": ["Sponsor 1", "Sponsor 2"],
  "tags": ["Tag1", "Tag2"]
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Manual Build

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
# Add your environment variables here
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_SITE_URL=https://matrixo.in
```

## Customization

### Updating Event Data
Edit `data/events.json` to add, update, or remove events.

### Changing Colors
Modify `tailwind.config.js` to update the color scheme:
- `neon-blue`: Primary accent color
- `neon-purple`: Secondary accent color
- `neon-pink`: Tertiary accent color

### Adding Team Members
Edit `components/team/TeamContent.tsx` to update team information.

## SEO Features

- Dynamic meta tags per page
- Open Graph tags for social sharing
- Structured data for events
- Sitemap generation ready
- robots.txt configuration

## Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS optimization with Tailwind
- Font optimization
- Static page generation where possible

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a proprietary project for matriXO. For questions or contributions, contact the development team.

## License

© 2025 matriXO. All rights reserved.

## Support

For support, email hello@matrixo.in or visit our contact page.

## Acknowledgments

- Supported by KPRISE (KPR Foundation for Innovation and Social Empowerment)
- Partners: TEDxIARE, TEDxCMRIT, Smartzy Edu, TEDxSreyas Institute
- Built with modern web technologies
