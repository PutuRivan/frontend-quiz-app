import { formatTime } from "@/libs/utils";
import { Clock } from "lucide-react";
import { Progress } from "../ui/progress";

interface QuizHeaderProps {
  currentQuestion: number;
  questions: any[];
  timeLeft: number;
  progress: number;
}

export default function QuizHeader({ currentQuestion, questions, timeLeft, progress }: QuizHeaderProps) {
  return (
    <>
      <header className="mb-8 flex items-center justify-between rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
            <span className="text-lg font-bold text-white">⚡</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">QuizMaster</h1>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-slate-600">
            Question {currentQuestion + 1}/{questions.length}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2">
          <Clock className="h-5 w-5 text-purple-600" />
          <span className="font-semibold text-purple-600">{formatTime(timeLeft)}</span>
        </div>
      </header>

      <div className="mb-8">
        <Progress value={progress} className="h-2" />
      </div>
    </>

  )
}
