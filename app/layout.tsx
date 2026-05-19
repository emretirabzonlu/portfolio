import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import LenisProvider from "@/components/providers/LenisProvider";
import LoadingScreen from "@/components/ui/LoadingScreen";
import GradientMesh from "@/components/ui/GradientMesh";
import EasterEggs from "@/components/ui/EasterEggs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Emre Tırabzonlu — Full Stack Developer",
    template: "%s | Emre Tırabzonlu",
  },
  description:
    ".NET ve React ekosistemleriyle uçtan uca, ölçeklenebilir kurumsal sistemler inşa eden Full Stack Developer. ERP, e-ticaret, mobil ve AI projelerinde 3+ yıl deneyim.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    ".NET",
    "React",
    "React Native",
    "TypeScript",
    "Kocaeli",
    "Türkiye",
  ],
  authors: [{ name: "Emre Tırabzonlu", url: "https://emretirabzonlu.dev" }],
  creator: "Emre Tırabzonlu",
  metadataBase: new URL("https://emretirabzonlu.dev"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://emretirabzonlu.dev",
    title: "Emre Tırabzonlu — Full Stack Developer",
    description: ".NET ve React ile uçtan uca kurumsal sistemler.",
    siteName: "Emre Tırabzonlu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emre Tırabzonlu — Full Stack Developer",
    description: ".NET ve React ile uçtan uca kurumsal sistemler.",
    creator: "@emretirabzonlu",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${geistMono.variable} dark`}
    >
      <body className="bg-background text-foreground antialiased min-h-screen relative">
        {/* Ambient gradient mesh — behind all content */}
        <GradientMesh />

        <LenisProvider>
          <CustomCursor />
          <LoadingScreen />
          <EasterEggs />
          {children}
        </LenisProvider>

        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
