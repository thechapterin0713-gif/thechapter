import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            더챕터
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/pricing"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              요금제
            </Link>
            <Link
              href="/login"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              로그인
            </Link>
            <Link
              href="/register"
              className="inline-flex h-9 px-4 items-center rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              무료 시작하기
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <p className="text-lg font-bold text-blue-600">더챕터</p>
              <p className="text-sm text-slate-500 mt-2">
                대기업 인적성 시험 준비의 새로운 기준
              </p>
            </div>
            <div className="flex gap-12">
              <div>
                <p className="text-sm font-semibold text-slate-900">서비스</p>
                <ul className="mt-3 space-y-2">
                  <li>
                    <Link
                      href="/pricing"
                      className="text-sm text-slate-500 hover:text-slate-700"
                    >
                      요금제
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">지원</p>
                <ul className="mt-3 space-y-2">
                  <li>
                    <span className="text-sm text-slate-500">
                      support@thechapter.kr
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-400">
              &copy; 2026 더챕터. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
