import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import NavBar from "@/components/NavBar";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "رواج — اعرف سوقك قبل ما تبدأ",
  description:
    "رواج: منصة ذكاء السوق لمجتمع القوع. اكتشف احتياجات مجتمعك قبل أن تبدأ مشروعك. Know your market before you start. Tatweer 2026 · Challenge #3.",
  manifest: "/manifest.json",
  applicationName: "Rawaj",
  appleWebApp: {
    capable: true,
    title: "رواج",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#051424",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`dark ${cairo.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Geist (English) + JetBrains Mono (data labels) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen relative overflow-x-hidden bg-[#051424] text-[#d4e4fa] antialiased selection:bg-[#4fdbc8]/30 selection:text-white">
        <NavBar />
        <div className="pt-24 min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
