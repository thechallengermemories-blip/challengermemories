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
  metadataBase: new URL("https://vivekjoshi.online"),

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
    url: "https://vivekjoshi.online",
    siteName: "Challenger Tribute",

    images: [
      {
        url: "https://vivekjoshi.online/herobanner.webp",
        width: 1200,
        height: 630,
        alt: "Challenger Tribute Banner",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Challenger Tribute",
    description:
      "Share your story about how the Challenger crew inspired you.",
    images: ["https://vivekjoshi.online/herobanner.webp"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
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