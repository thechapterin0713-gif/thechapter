import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 데모 데이터
const SCORE_HISTORY = [
  { date: "2/10", score: 65 },
  { date: "2/12", score: 70 },
  { date: "2/14", score: 68 },
  { date: "2/16", score: 75 },
  { date: "2/18", score: 76 },
  { date: "2/20", score: 82 },
  { date: "2/22", score: 85 },
];

const CATEGORY_STATS = [
  { name: "수리논리", rate: 78, total: 45, correct: 35 },
  { name: "추리", rate: 72, total: 40, correct: 29 },
  { name: "언어논리", rate: 85, total: 35, correct: 30 },
  { name: "시각적사고", rate: 65, total: 30, correct: 20 },
];

const WEAKNESS_TIPS = [
  {
    category: "시각적사고",
    rate: 65,
    tip: "도형 회전, 대칭 문제를 집중적으로 풀어보세요. 패턴 인식 연습이 도움이 됩니다.",
  },
  {
    category: "추리",
    rate: 72,
    tip: "논리 추론 문제의 전제 조건을 꼼꼼히 분석하는 연습을 해보세요.",
  },
];

export default function AnalyticsPage() {
  const maxScore = Math.max(...SCORE_HISTORY.map((s) => s.score));
  const minScore = Math.min(...SCORE_HISTORY.map((s) => s.score));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">성적 분석</h1>
        <p className="text-slate-500 mt-1">
          시험 결과를 분석하고 취약점을 파악하세요
        </p>
      </div>

      {/* 요약 통계 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-500">총 시험 횟수</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">7회</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-500">평균 점수</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">74.4점</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-500">최고 점수</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {maxScore}점
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-500">점수 향상</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">
              +{maxScore - minScore}점
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 점수 추이 (간단한 바 차트) */}
      <Card>
        <CardHeader>
          <CardTitle>점수 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-48">
            {SCORE_HISTORY.map((entry) => (
              <div
                key={entry.date}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <span className="text-xs font-medium text-slate-600">
                  {entry.score}
                </span>
                <div
                  className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
                  style={{
                    height: `${((entry.score - 50) / 50) * 100}%`,
                    minHeight: "20px",
                  }}
                />
                <span className="text-xs text-slate-500">{entry.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 카테고리별 정답률 */}
        <Card>
          <CardHeader>
            <CardTitle>카테고리별 정답률</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {CATEGORY_STATS.map((cat) => (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-slate-700">
                      {cat.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs">
                        {cat.correct}/{cat.total}
                      </span>
                      <span
                        className={`font-semibold ${
                          cat.rate >= 80
                            ? "text-green-600"
                            : cat.rate >= 70
                            ? "text-amber-600"
                            : "text-red-600"
                        }`}
                      >
                        {cat.rate}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        cat.rate >= 80
                          ? "bg-green-500"
                          : cat.rate >= 70
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

        {/* 취약점 & 학습 가이드 */}
        <Card>
          <CardHeader>
            <CardTitle>취약 영역 & 학습 가이드</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {WEAKNESS_TIPS.map((item) => (
                <div
                  key={item.category}
                  className="p-4 rounded-xl bg-amber-50 border border-amber-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-amber-800">
                      {item.category}
                    </span>
                    <span className="text-sm text-amber-600">
                      {item.rate}%
                    </span>
                  </div>
                  <p className="text-sm text-amber-700">{item.tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
