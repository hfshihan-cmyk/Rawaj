"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/opportunity");
  const isSubmit = pathname === "/submit";

  const linkCls = (active: boolean) =>
    `font-sans tracking-wide transition-colors ${
      active ? "text-[#4fdbc8] font-bold" : "text-[#c6c6cc] hover:text-[#4fdbc8]"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass border-b border-white/5 flex flex-row-reverse justify-between items-center max-w-7xl mx-auto rounded-b-xl">
      <Link
        href="/"
        className="flex items-center gap-2 cursor-pointer font-bold tracking-tight text-[#d4e4fa] hover:text-[#4fdbc8] transition-colors"
      >
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#4fdbc8] to-[#ffb95f]">
          رواد الأعمال في القوع
        </span>
        <span className="text-sm font-mono text-[#c6c6cc]">/ Rawaj</span>
      </Link>

      {/* Desktop menu */}
      <div className="hidden md:flex flex-row-reverse items-center gap-8 text-sm">
        <Link href="/" className={linkCls(isLanding)}>
          الرئيسية
        </Link>
        <Link href="/dashboard" className={linkCls(isDashboard)}>
          لوحة الاستكشاف
        </Link>
        <Link href="/submit" className={linkCls(isSubmit)}>
          سجل احتياجاً
        </Link>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="hidden sm:inline-flex bg-[#14b8a6] text-[#051424] text-xs font-bold px-4 py-2 rounded hover:bg-[#4fdbc8] transition-all hover:shadow-[0_0_15px_rgba(79,219,200,0.3)] hover:scale-[1.03]"
        >
          لوحة التحكم Dashboard
        </Link>
        <Link
          href="/submit"
          className="sm:hidden inline-flex bg-[#14b8a6] text-[#051424] text-xs font-bold px-3 py-1.5 rounded hover:bg-[#4fdbc8] transition-colors"
        >
          سجل 🐪
        </Link>
        <span className="text-[11px] font-mono border border-white/10 rounded px-2 py-1 text-[#c6c6cc] uppercase">
          AR
        </span>
      </div>
    </nav>
  );
}
