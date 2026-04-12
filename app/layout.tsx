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
    default: "Challenger Tribute | Stories Inspired by the Challenger Crew",
    template: "%s | Challenger Tribute",
  },

  description:
    "A heartfelt tribute website where people share stories about how the Challenger Space Shuttle crew inspired their lives. Explore memories, reflections, and meaningful experiences influenced by the Challenger mission.",

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

  authors: [{ name: "Challenger Tribute Project" }],
  creator: "Challenger Tribute Project",

  openGraph: {
    title: "Challenger Tribute | Stories Inspired by the Challenger Crew",
    description:
      "Read and share meaningful stories about how the Challenger crew inspired people around the world.",
    url: "https://www.challengermemories.com",
    siteName: "Challenger Memories",
    images: [
      {
        url: "https://www.challengermemories.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Challenger Memories Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Challenger Tribute | Stories Inspired by the Challenger Crew",
    description:
      "Read and share meaningful stories about how the Challenger crew inspired people around the world.",
    images: ["https://www.challengermemories.com/logo.png"],
  },

  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },

  manifest: "/favicon/site.webmanifest",

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