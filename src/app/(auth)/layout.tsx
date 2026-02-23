import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
      <Link href="/" className="mb-8 text-2xl font-bold text-blue-600">
        더챕터
      </Link>
      {children}
      <p className="mt-8 text-sm text-slate-400">
        &copy; 2026 더챕터. All rights reserved.
      </p>
    </div>
  );
}
