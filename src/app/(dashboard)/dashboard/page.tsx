import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 데모 데이터 (DB 연동 전)
const RECENT_TESTS = [
  {
    id: "1",
    examName: "GSAT",
    company: "삼성",
    score: 82,
    date: "2026-02-20",
    totalQuestions: 30,
    correctAnswers: 25,
  },
  {
    id: "2",
    examName: "SKCT",
    company: "SK",
    score: 76,
    date: "2026-02-18",
    totalQuestions: 30,
    correctAnswers: 23,
  },
  {
    id: "3",
    examName: "LG인적성",
    company: "LG",
    score: 90,
    date: "2026-02-15",
    totalQuestions: 30,
    correctAnswers: 27,
  },
];

const EXAM_TYPES = [
  { id: "1", name: "GSAT", company: "삼성", questionCount: 150, timeLimit: 60 },
  { id: "2", name: "SKCT", company: "SK", questionCount: 120, timeLimit: 50 },
  {
    id: "3",
    name: "LG인적성",
    company: "LG",
    questionCount: 100,
    timeLimit: 45,
  },
  {
    id: "4",
    name: "HMAT",
    company: "현대자동차",
    questionCount: 130,
    timeLimit: 55,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">안녕하세요!</h1>
        <p className="text-slate-500 mt-1">
          오늘도 인적성 합격을 향해 화이팅하세요
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-500">총 풀이 수</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-500">평균 점수</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">82.7점</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-500">이번 주 풀이</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">2회</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-500">연속 학습</p>
            <p className="text-3xl font-bold text-green-600 mt-1">5일</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 시험 시작 */}
        <Card>
          <CardHeader>
            <CardTitle>시험 시작하기</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {EXAM_TYPES.map((exam) => (
                <Link
                  key={exam.id}
                  href={`/dashboard/tests?examTypeId=${exam.id}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{exam.name}</p>
                    <p className="text-sm text-slate-500">
                      {exam.company} | {exam.questionCount}문제 | {exam.timeLimit}분
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 최근 시험 기록 */}
        <Card>
          <CardHeader>
            <CardTitle>최근 시험 기록</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {RECENT_TESTS.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {test.examName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {test.company} | {test.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-xl font-bold ${
                        test.score >= 80
                          ? "text-green-600"
                          : test.score >= 60
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {test.score}점
                    </p>
                    <p className="text-xs text-slate-500">
                      {test.correctAnswers}/{test.totalQuestions}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
