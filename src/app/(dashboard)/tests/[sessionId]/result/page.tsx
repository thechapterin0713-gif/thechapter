import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{
    score?: string;
    correct?: string;
    total?: string;
  }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const score = Number(resolvedSearchParams.score || 0);
  const correct = Number(resolvedSearchParams.correct || 0);
  const total = Number(resolvedSearchParams.total || 10);

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-green-600";
    if (s >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreMessage = (s: number) => {
    if (s >= 90) return "훌륭합니다! 이 실력이면 합격에 가까워요!";
    if (s >= 80) return "좋은 성적이에요! 조금만 더 노력하면 합격입니다!";
    if (s >= 60) return "괜찮아요! 꾸준히 연습하면 분명 좋아질 거예요.";
    return "아직 갈 길이 있지만, 포기하지 마세요! 연습이 답입니다.";
  };

  const getScoreBg = (s: number) => {
    if (s >= 80) return "from-green-50 to-emerald-50";
    if (s >= 60) return "from-amber-50 to-yellow-50";
    return "from-red-50 to-orange-50";
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">시험 결과</h1>
      </div>

      {/* 점수 카드 */}
      <Card
        className={`bg-gradient-to-br ${getScoreBg(score)} border-0 shadow-lg`}
      >
        <CardContent className="py-12 text-center">
          <p className="text-sm text-slate-500 mb-2">최종 점수</p>
          <p className={`text-7xl font-bold ${getScoreColor(score)}`}>
            {score}
            <span className="text-2xl">점</span>
          </p>
          <p className="mt-4 text-slate-600">{getScoreMessage(score)}</p>
        </CardContent>
      </Card>

      {/* 상세 결과 */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-sm text-slate-500">정답</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {correct}문제
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-sm text-slate-500">오답</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {total - correct}문제
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-sm text-slate-500">총 문제</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {total}문제
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 카테고리별 분석 (데모) */}
      <Card>
        <CardContent className="py-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            카테고리별 정답률
          </h3>
          <div className="space-y-4">
            {[
              { name: "수리논리", rate: 80 },
              { name: "추리", rate: 67 },
              { name: "언어논리", rate: 100 },
            ].map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">{cat.name}</span>
                  <span
                    className={`font-medium ${
                      cat.rate >= 80
                        ? "text-green-600"
                        : cat.rate >= 60
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {cat.rate}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      cat.rate >= 80
                        ? "bg-green-500"
                        : cat.rate >= 60
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${cat.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 액션 버튼 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/dashboard/tests"
          className="inline-flex h-11 px-6 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          다시 풀기
        </Link>
        <Link
          href="/dashboard/analytics"
          className="inline-flex h-11 px-6 items-center justify-center rounded-xl border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          성적 분석 보기
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex h-11 px-6 items-center justify-center rounded-xl border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          대시보드로 돌아가기
        </Link>
      </div>
    </div>
  );
}
