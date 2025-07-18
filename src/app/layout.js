import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/app/globals.css';
import PageTransition from '@/components/PageTransition';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>Saat Phere | Ethnic & Bridal Wear</title>
          <meta name="description" content="Discover elegance, tradition, and style for every occasion. Shop readymade suits, lehengas, gowns, and more at Saat Phere." />
          <link rel="icon" href="/logo.png" />
          <meta property="og:title" content="Saat Phere | Ethnic & Bridal Wear" />
          <meta property="og:description" content="Discover elegance, tradition, and style for every occasion. Shop readymade suits, lehengas, gowns, and more at Saat Phere." />
          <meta property="og:image" content="/logo.png" />
          <meta property="og:type" content="website" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Merriweather:wght@700&display=swap" rel="stylesheet" />
        </head>
        <body className="bg-background min-h-screen flex flex-col">
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
