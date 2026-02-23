import Link from "next/link";

const NAV_ITEMS = [
  { href: "/dashboard", label: "대시보드", icon: "📋" },
  { href: "/dashboard/tests", label: "문제 풀기", icon: "📝" },
  { href: "/dashboard/analytics", label: "성적 분석", icon: "📊" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="text-xl font-bold text-blue-600">
              더챕터
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              Free
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-sm font-medium text-slate-600">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <nav className="md:hidden sticky top-16 z-40 bg-white border-b border-slate-200 px-4 py-2 flex gap-2 overflow-x-auto">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 whitespace-nowrap"
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
