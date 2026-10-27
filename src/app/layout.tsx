import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { Toaster } from "@/components/ui/sonner";

const fontSora = Sora({
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fontDmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body-family",
  display: "swap",
  weight: ["400", "500"],
});

const fontCaveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script-family",
  display: "swap",
  weight: ["500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#F8F7F2",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://feeling-healthy.vercel.app"),
  title: "Feeling Healthy — Holistic Health & Wellbeing",
  description:
    "Feeling Healthy is a holistic health and wellbeing centre offering massage, counselling, naturopathy, nutrition and more.",
  openGraph: {
    title: "Feeling Healthy — Holistic Health & Wellbeing",
    description:
      "Feeling Healthy is a holistic health and wellbeing centre offering massage, counselling, naturopathy, nutrition and more.",
    siteName: "Feeling Healthy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feeling Healthy — Holistic Health & Wellbeing",
    description:
      "Feeling Healthy is a holistic health and wellbeing centre offering massage, counselling, naturopathy, nutrition and more.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Feeling Healthy",
  description: "Holistic health and wellbeing for body and mind.",
  address: { "@type": "PostalAddress", streetAddress: "[Clinic Address]" },
  telephone: "[Phone Number]",
  email: "[Email Address]",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fontSora.variable} ${fontDmSans.variable} ${fontCaveat.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pb-0">{children}</main>
          <Footer />
          <FloatingButtons />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
