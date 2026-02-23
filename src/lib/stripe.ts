import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export const PLANS = {
  basic: {
    name: "Basic",
    price: 199000,
    priceId: process.env.STRIPE_BASIC_PRICE_ID!,
    features: [
      "모든 기출문제 접근",
      "기본 성적 분석",
      "카테고리별 취약점 리포트",
    ],
  },
  pro: {
    name: "Pro",
    price: 349000,
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    features: [
      "Basic 플랜 모든 기능",
      "AI 맞춤 학습 추천",
      "실시간 모의고사",
      "멘토링 예약",
      "무제한 시험 응시",
    ],
  },
} as const;
