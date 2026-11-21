import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Motion } from "@/components/ui";
import DoorIntro from "@/components/DoorIntro";
const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = {
  title: {
    default: "Maison & Co. | Luxury Real Estate",
    template: "%s | Maison & Co.",
  },
  description:
    "Exceptional properties, thoughtfully selected. Luxury homes, villas and apartments worldwide.",
  openGraph: {
    title: "Maison & Co. | Luxury Real Estate",
    description:
      "Discover spaces that bring together architecture, lifestyle and timeless value.",
    type: "website",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
            <DoorIntro/>
        <Motion>

          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:z-[60] focus:bg-white focus:p-3"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Motion>
      </body>
    </html>
  );
}
