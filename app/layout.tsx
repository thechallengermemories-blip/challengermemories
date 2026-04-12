import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.challengermemories.com"),

  title: {
    default: "Challenger Memories | Tribute to the Challenger Crew",
    template: "%s | Challenger Memories",
  },

  description:
    "Share and read meaningful stories inspired by the Challenger Space Shuttle crew. Preserving legacy, inspiration, and remembrance.",

  keywords: [
    "Challenger Space Shuttle",
    "Challenger crew tribute",
    "NASA Challenger stories",
    "Space shuttle Challenger legacy",
    "Challenger astronauts inspiration",
    "tribute to Challenger crew",
    "NASA history tribute",
    "share your story Challenger",
  ],

  authors: [{ name: "Challenger Memories Project" }],
  creator: "Challenger Memories",

  openGraph: {
    title: "Challenger Memories",
    description:
      "Share stories inspired by the Challenger Space Shuttle crew and preserve their legacy.",
    url: "https://www.challengermemories.com",
    siteName: "Challenger Memories",

    images: [
      {
        url: "/og-image.png",   // 1200x630 image for WhatsApp & Instagram
        width: 1200,
        height: 630,
        alt: "Challenger Memories",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Challenger Memories",
    description:
      "Stories inspired by the Challenger Space Shuttle crew.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  alternates: {
    canonical: "https://www.challengermemories.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="bg-[#020617] text-white antialiased">
        {children}
      </body>
    </html>
  );
}