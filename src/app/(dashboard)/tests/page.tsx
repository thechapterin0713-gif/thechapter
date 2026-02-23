import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EXAM_TYPES = [
  {
    id: "1",
    name: "GSAT",
    company: "삼성",
    description: "삼성 직무적성검사 - 수리논리, 추리, 시각적사고, 언어논리",
    timeLimit: 60,
    questionCount: 30,
    categories: ["수리논리", "추리", "시각적사고", "언어논리"],
  },
  {
    id: "2",
    name: "SKCT",
    company: "SK",
    description: "SK종합역량검사 - 인지역량, 실행역량, 심층역량",
    timeLimit: 50,
    questionCount: 30,
    categories: ["인지역량", "실행역량", "심층역량"],
  },
  {
    id: "3",
    name: "LG인적성",
    company: "LG",
    description: "LG 인적성검사 - 언어이해, 언어추리, 수리력, 도형추리",
    timeLimit: 45,
    questionCount: 30,
    categories: ["언어이해", "언어추리", "수리력", "도형추리"],
  },
  {
    id: "4",
    name: "HMAT",
    company: "현대자동차",
    description: "현대자동차그룹 직무적성검사 - 언어, 수리, 추리, 공간지각",
    timeLimit: 55,
    questionCount: 30,
    categories: ["언어", "수리", "추리", "공간지각"],
  },
];

export default function TestsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">문제 풀기</h1>
        <p className="text-slate-500 mt-1">
          시험 유형을 선택하고 실전처럼 문제를 풀어보세요
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {EXAM_TYPES.map((exam) => (
          <Card key={exam.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{exam.name}</CardTitle>
                <span className="text-sm text-slate-500">{exam.company}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 mb-4">{exam.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {exam.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex px-2.5 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-sm text-slate-500">
                  <span>{exam.questionCount}문제</span>
                  <span>{exam.timeLimit}분</span>
                </div>
                <Link
                  href={`/dashboard/tests/demo?examTypeId=${exam.id}&examName=${exam.name}`}
                  className="inline-flex h-9 px-4 items-center rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  시험 시작
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
