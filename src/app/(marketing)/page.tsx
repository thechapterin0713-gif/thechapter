import Link from "next/link";

const EXAM_TYPES = [
  { name: "GSAT", company: "삼성", color: "bg-blue-100 text-blue-700" },
  { name: "SKCT", company: "SK", color: "bg-red-100 text-red-700" },
  { name: "LG인적성", company: "LG", color: "bg-pink-100 text-pink-700" },
  { name: "현대자동차", company: "현대", color: "bg-sky-100 text-sky-700" },
  { name: "CJ종합적성", company: "CJ", color: "bg-orange-100 text-orange-700" },
  { name: "롯데L-TAB", company: "롯데", color: "bg-rose-100 text-rose-700" },
];

const FEATURES = [
  {
    title: "실전과 동일한 문제풀이",
    description:
      "실제 시험과 동일한 환경에서 타이머, 진행률 표시와 함께 문제를 풀어보세요.",
    icon: "📝",
  },
  {
    title: "카테고리별 성적 분석",
    description:
      "수리, 추리, 언어 등 카테고리별 정답률과 취약 영역을 한눈에 파악하세요.",
    icon: "📊",
  },
  {
    title: "AI 맞춤 학습 추천",
    description:
      "AI가 분석한 취약점을 기반으로 맞춤형 학습 계획을 제안합니다.",
    icon: "🤖",
  },
  {
    title: "다양한 기업 시험 대비",
    description:
      "삼성, SK, LG, 현대 등 주요 대기업 인적성 시험을 한 곳에서 준비하세요.",
    icon: "🏢",
  },
];

const STATS = [
  { value: "10,000+", label: "문제 보유" },
  { value: "50,000+", label: "누적 사용자" },
  { value: "94%", label: "합격률" },
  { value: "4.8/5", label: "사용자 평점" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              {EXAM_TYPES.map((exam) => (
                <span
                  key={exam.name}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${exam.color}`}
                >
                  {exam.name}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
              대기업 인적성,
              <br />
              <span className="text-blue-600">더챕터</span>와 함께
              <br />
              체계적으로 준비하세요
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              실전과 동일한 환경에서 문제를 풀고, AI가 분석한 맞춤 학습 리포트로
              효율적으로 합격을 준비하세요.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex h-12 px-8 items-center justify-center rounded-xl bg-blue-600 text-base font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
              >
                무료로 시작하기
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-12 px-8 items-center justify-center rounded-xl border border-slate-300 text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                요금제 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              합격을 위한 모든 기능
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              더챕터가 제공하는 체계적인 학습 시스템으로 효율적으로 준비하세요
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-slate-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            지금 바로 시작하세요
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            무료 플랜으로 기본 문제풀이를 체험해보세요.
            <br />
            언제든지 업그레이드할 수 있습니다.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex h-12 px-8 items-center justify-center rounded-xl bg-white text-base font-semibold text-blue-600 hover:bg-blue-50 transition-colors shadow-lg"
          >
            무료로 시작하기
          </Link>
        </div>
      </section>
    </>
  );
}
