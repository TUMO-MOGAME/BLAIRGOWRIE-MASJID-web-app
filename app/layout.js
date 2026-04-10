import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WebGLBackground from './components/WebGLBackground';
import ThemeToggle from './components/ThemeToggle';

export const metadata = {
  title: {
    default: 'Blairgowrie Masjid — A Sanctuary for Spiritual Growth',
    template: '%s | Blairgowrie Masjid',
  },
  description: 'Blairgowrie Masjid — A center for prayer, learning, community service, and bridge-building in Blairgowrie, Randburg.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
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
