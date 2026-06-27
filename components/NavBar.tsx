"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/LanguageContext";

export default function NavBar() {
  const pathname = usePathname();
  const { lang, toggle, t } = useLang();

  const isLanding = pathname === "/";
  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/opportunity");
  const isSubmit = pathname === "/submit";

  const navStyle = isLanding
    ? {
        background: "rgba(15,30,40,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
      }
    : {
        background: "#1a3a4a",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
      };

  const logoAccent = isLanding ? "#f0c070" : "#c4956a";
  const activeColor = isLanding ? "#f0c070" : "#c4956a";

  const linkCls = (active: boolean) =>
    `font-sans tracking-wide transition-colors ${
      active ? "font-bold" : "text-white/75 hover:text-white"
    }`;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto rounded-b-xl"
      style={navStyle}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 cursor-pointer font-bold tracking-tight hover:opacity-90 transition-opacity"
      >
        <span className="text-xl font-bold" style={{ color: logoAccent }}>
          رواج
        </span>
        <span className="text-sm font-mono text-white/60">/ Rawaj</span>
      </Link>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-8 text-sm">
        <Link
          href="/"
          className={linkCls(isLanding)}
          style={isLanding ? { color: activeColor } : undefined}
        >
          {t("nav_home")}
        </Link>
        <Link
          href="/dashboard"
          className={linkCls(isDashboard)}
          style={isDashboard ? { color: activeColor } : undefined}
        >
          {t("nav_dashboard")}
        </Link>
        <Link
          href="/submit"
          className={linkCls(isSubmit)}
          style={isSubmit ? { color: activeColor } : undefined}
        >
          {t("nav_submit")}
        </Link>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="hidden sm:inline-flex text-white text-xs font-bold px-4 py-2 rounded transition-all hover:opacity-90 hover:scale-[1.03]"
          style={{ background: "#c4956a" }}
        >
          {t("nav_btn")}
        </Link>
        <Link
          href="/submit"
          className="sm:hidden inline-flex text-white text-xs font-bold px-3 py-1.5 rounded transition-colors"
          style={{ background: "#c4956a" }}
        >
          {t("nav_mobile_btn")} 🐪
        </Link>
        <button
          onClick={toggle}
          aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
          className="text-[11px] font-mono border border-white/20 rounded px-2 py-1 text-white/60 uppercase hover:border-white/50 hover:text-white transition-colors cursor-pointer"
        >
          {t("nav_lang")}
        </button>
      </div>
    </nav>
  );
}
