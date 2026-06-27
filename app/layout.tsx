import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
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
        {/* Geist (English) + JetBrains Mono (data) + Material Symbols (icons) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
