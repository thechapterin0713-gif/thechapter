import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    price: "0",
    period: "",
    description: "인적성 준비를 시작하는 분들을 위한 무료 플랜",
    features: [
      "하루 5문제 풀이",
      "기본 결과 확인",
      "2개 기업 시험 접근",
    ],
    cta: "무료로 시작",
    href: "/register",
    featured: false,
  },
  {
    name: "Basic",
    price: "199,000",
    period: "/월",
    description: "본격적으로 인적성을 준비하는 취준생을 위한 플랜",
    features: [
      "모든 기출문제 접근",
      "무제한 문제 풀이",
      "기본 성적 분석",
      "카테고리별 취약점 리포트",
      "모든 기업 시험 접근",
    ],
    cta: "Basic 시작하기",
    href: "/register?plan=basic",
    featured: false,
  },
  {
    name: "Pro",
    price: "349,000",
    period: "/월",
    description: "합격을 목표로 집중 준비하는 분들을 위한 프리미엄 플랜",
    features: [
      "Basic 플랜 모든 기능",
      "AI 맞춤 학습 추천",
      "실시간 모의고사",
      "멘토링 예약",
      "상세 해설 제공",
      "우선 고객지원",
    ],
    cta: "Pro 시작하기",
    href: "/register?plan=pro",
    featured: true,
  },
];

export default function PricingPage() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900">
            합격에 투자하세요
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            나에게 맞는 플랜을 선택하고, 체계적으로 인적성 시험을 준비하세요
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.featured
                  ? "border-2 border-blue-600 shadow-xl shadow-blue-600/10"
                  : "border border-slate-200"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  인기
                </span>
              )}
              <h3 className="text-lg font-semibold text-slate-900">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-slate-900">
                  {plan.price === "0" ? "무료" : `₩${plan.price}`}
                </span>
                {plan.period && (
                  <span className="text-slate-500">{plan.period}</span>
                )}
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`mt-8 block w-full text-center py-3 rounded-xl text-sm font-semibold transition-colors ${
                  plan.featured
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
