"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface QuizResultsProps {
  totalQuestions?: number
  correctAnswers?: number
  wrongAnswers?: number
  score?: number
}

export default function QuizResultPage({
  totalQuestions = 20,
  correctAnswers = 18,
  wrongAnswers = 2,
  score = 90,
}: QuizResultsProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-lg rounded-3xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Quiz Results <span className="text-4xl">🏆</span>
          </h1>
          <p className="text-lg text-purple-600 font-medium">Excellent! You're a quiz master!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard label="Total Questions" value={totalQuestions} />
          <StatCard label="Correct Answers" value={correctAnswers} />
          <StatCard label="Wrong Answers" value={wrongAnswers} />
        </div>

        {/* Score Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-lg font-semibold text-gray-800">Your Score</label>
            <span className="text-lg font-semibold text-gray-800">{score}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Info Text */}
        <p className="text-center text-gray-500 text-sm mb-10">Scores are not saved for guest sessions.</p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 rounded-full text-lg"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            className="border-2 border-gray-300 text-gray-800 font-semibold px-8 py-6 rounded-full text-lg hover:bg-gray-50 bg-transparent"
            onClick={() => (window.location.href = "/")}
          >
            Go Home
          </Button>
        </div>
      </Card>
    </div>
  )
}

interface StatCardProps {
  label: string
  value: number
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 text-center">
      <p className="text-gray-600 font-medium mb-2">{label}</p>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
    </div>
  )
}
