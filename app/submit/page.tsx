import Link from "next/link";
import NeedForm from "@/components/NeedForm";

export default function SubmitPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-on-surface">
      {/* Ambient grid + glow */}
      <div className="bg-grid-pattern pointer-events-none fixed inset-0 z-0" />
      <div className="pointer-events-none fixed left-1/2 top-0 z-0 h-96 w-1/2 -translate-x-1/2 rounded-full bg-secondary/10 blur-[120px]" />

      {/* Top bar */}
      <nav className="relative z-20 mx-auto flex max-w-container-max flex-row-reverse items-center justify-between px-lg py-md">
        <Link href="/" className="font-geist text-2xl font-bold tracking-tighter">
          رواج <span className="text-secondary">Rawaj</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-xs font-mono text-label-sm text-outline transition-colors hover:text-secondary"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
          إلغاء
        </Link>
      </nav>

      <div className="relative z-10 mx-auto max-w-2xl px-lg pb-xl pt-md">
        <NeedForm />

        <footer className="mt-xl text-center">
          <Link
            href="/dashboard"
            className="ar font-mono text-label-sm text-outline transition-colors hover:text-secondary"
          >
            هل أنت رائد أعمال؟ افتح لوحة ذكاء السوق ←
          </Link>
        </footer>
      </div>
    </main>
  );
}
