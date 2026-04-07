import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: {
    default: 'Blairgowrie Masjid — A Sanctuary for Spiritual Growth',
    template: '%s | Blairgowrie Masjid',
  },
  description: 'Blairgowrie Masjid is dedicated to establishing a vibrant spiritual home in Blairgowrie, Randburg. A center for prayer, learning, community service, and bridge-building.',
  keywords: ['masjid', 'mosque', 'blairgowrie', 'randburg', 'islamic', 'prayer', 'community', 'south africa'],
  openGraph: {
    title: 'Blairgowrie Masjid',
    description: 'Serving the community with spiritual growth and educational excellence',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main style={{ paddingTop: '4.5rem' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
