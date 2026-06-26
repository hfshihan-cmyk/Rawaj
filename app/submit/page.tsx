import Link from "next/link";
import NeedForm from "@/components/NeedForm";

export default function SubmitPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-white">
      <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="ar text-3xl font-extrabold text-gray-900 sm:text-4xl">
            رواج — القوع 🐪
          </h1>
          <p className="ar mt-2 text-lg font-semibold text-teal-700">
            شو تحتاج ولا تلاقيه في القوع؟
          </p>
          <p className="en mt-1">
            Rawaj · Tell us what you need but can&apos;t find in Al Qua&apos;a
          </p>
        </header>

        <NeedForm />

        <footer className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="ar text-sm font-semibold text-gray-500 hover:text-teal-700 hover:underline"
          >
            هل أنت رائد أعمال؟ افتح لوحة ذكاء السوق ←
          </Link>
        </footer>
      </div>
    </main>
  );
}
