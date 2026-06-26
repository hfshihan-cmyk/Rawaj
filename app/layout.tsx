import type { Metadata, Viewport } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "رواج — اعرف سوقك قبل ما تبدأ",
  description:
    "رواج: منصة ذكاء السوق لمجتمع القوع. اكتشف احتياجات مجتمعك قبل أن تبدأ مشروعك. Know your market before you start.",
  manifest: "/manifest.json",
  applicationName: "Rawaj",
  appleWebApp: {
    capable: true,
    title: "رواج",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable}`}>
      <body>{children}</body>
    </html>
  );
}
