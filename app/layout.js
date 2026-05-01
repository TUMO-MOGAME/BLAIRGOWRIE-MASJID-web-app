import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WebGLBackground from './components/WebGLBackground';
import ThemeToggle from './components/ThemeToggle';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  'https://blairgowrie-masjid-web-app.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Blairgowrie Masjid — A Sanctuary for Spiritual Growth',
    template: '%s | Blairgowrie Masjid',
  },
  description: 'Blairgowrie Masjid — A center for prayer, learning, community service, and bridge-building in Blairgowrie, Randburg.',
  openGraph: {
    type: 'website',
    siteName: 'Blairgowrie Masjid',
    title: 'Blairgowrie Masjid — A Sanctuary for Spiritual Growth',
    description: 'A center for prayer, learning, community service, and bridge-building in Blairgowrie, Randburg.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blairgowrie Masjid — A Sanctuary for Spiritual Growth',
    description: 'A center for prayer, learning, community service, and bridge-building in Blairgowrie, Randburg.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body>
        <WebGLBackground />
        <div className="scroll-content">
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
