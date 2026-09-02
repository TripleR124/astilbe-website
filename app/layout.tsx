import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "astilbe",
  description:
    "Celebrating the underground: US, UK, and beyond",
  creator: "Rafael Regalado",
  icons: {
    icon: "/images/favicon.jpg",
  },
  openGraph: {
    title: "astilbe",
    description:
      "Celebrating the underground: US, UK, and beyond",
    type: "website",
    locale: "en_US",
    siteName: "astilbe",
  },
  twitter: {
    card: "summary",
    title: "astilbe ",
    description:
      "Celebrating the underground: US, UK, and beyond",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
