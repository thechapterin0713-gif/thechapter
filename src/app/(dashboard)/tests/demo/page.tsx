import { TestInterface } from "@/components/tests/test-interface";

// 데모 문제 데이터
const DEMO_QUESTIONS = [
  {
    id: "q1",
    content:
      "다음 수열의 빈칸에 들어갈 숫자는?\n\n2, 6, 12, 20, 30, ?",
    options: ["36", "40", "42", "44"],
    category: "수리논리",
    difficulty: "easy" as const,
  },
  {
    id: "q2",
    content:
      "A는 B보다 키가 크고, C는 B보다 키가 작다. D는 A보다 키가 크다. 키가 가장 작은 사람은?",
    options: ["A", "B", "C", "D"],
    category: "추리",
    difficulty: "easy" as const,
  },
  {
    id: "q3",
    content:
      "다음 중 나머지 셋과 성질이 다른 하나는?",
    options: ["사과", "바나나", "당근", "포도"],
    category: "언어논리",
    difficulty: "easy" as const,
  },
  {
    id: "q4",
    content:
      "어떤 회사의 매출이 전년 대비 20% 증가하여 3,600만 원이 되었다. 전년도 매출은 얼마인가?",
    options: ["2,880만 원", "3,000만 원", "3,200만 원", "3,400만 원"],
    category: "수리논리",
    difficulty: "medium" as const,
  },
  {
    id: "q5",
    content:
      "모든 장미는 꽃이다. 어떤 꽃은 빨간색이다. 다음 중 반드시 참인 것은?",
    options: [
      "모든 장미는 빨간색이다",
      "어떤 빨간 것은 장미이다",
      "어떤 꽃은 장미이다",
      "어떤 장미는 빨간색이다",
    ],
    category: "추리",
    difficulty: "medium" as const,
  },
  {
    id: "q6",
    content:
      "36명의 학생이 있는 반에서 수학을 좋아하는 학생이 20명, 영어를 좋아하는 학생이 18명이고, 둘 다 좋아하는 학생이 8명이다. 둘 다 좋아하지 않는 학생은 몇 명인가?",
    options: ["4명", "6명", "8명", "10명"],
    category: "수리논리",
    difficulty: "medium" as const,
  },
  {
    id: "q7",
    content:
      "다음 단어들의 공통점으로 가장 적절한 것은?\n\n비행기, 새, 풍선, 연",
    options: ["자연물이다", "하늘을 날 수 있다", "가볍다", "바람이 필요하다"],
    category: "언어논리",
    difficulty: "easy" as const,
  },
  {
    id: "q8",
    content:
      "A, B, C, D, E 5명이 일렬로 서 있다. A는 맨 앞에, E는 맨 뒤에 서 있다. B는 C보다 앞에 서 있고, D는 C 바로 뒤에 서 있다. B는 몇 번째에 서 있는가?",
    options: ["2번째", "3번째", "4번째", "알 수 없다"],
    category: "추리",
    difficulty: "hard" as const,
  },
  {
    id: "q9",
    content:
      "시속 60km로 달리는 자동차가 2시간 30분 동안 이동한 거리는?",
    options: ["120km", "130km", "140km", "150km"],
    category: "수리논리",
    difficulty: "easy" as const,
  },
  {
    id: "q10",
    content:
      "'고진감래(苦盡甘來)'의 뜻으로 가장 적절한 것은?",
    options: [
      "시작이 반이다",
      "쓴 것이 다하면 단 것이 온다",
      "참을 인 세 번이면 살인도 면한다",
      "하늘은 스스로 돕는 자를 돕는다",
    ],
    category: "언어논리",
    difficulty: "easy" as const,
  },
];

export default function DemoTestPage({
  searchParams,
}: {
  searchParams: Promise<{ examName?: string }>;
}) {
  // 서버 컴포넌트이므로 searchParams를 직접 사용
  return <DemoTestContent />;
}

function DemoTestContent() {
  return (
    <TestInterface
      sessionId="demo"
      questions={DEMO_QUESTIONS}
      timeLimit={30}
      examName="GSAT (데모)"
    />
  );
}
