"use client"

import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

interface Option {
  id: string
  label: string
}

interface Question {
  id: number
  question: string
  category: string
  options: Option[]
  correctAnswer: string
}

interface QuizContainerProps {
  questions: Question[]
  question: Question
  currentQuestion: number
  selectedAnswers: Record<number, string>
  answeredCount: number
  handleSelectAnswer: (optionId: string) => void
  handleNext: () => void
  handlePrevious: () => void
  handleQuestionClick: (index: number) => void
}

export default function QuizContainer({
  questions,
  question,
  currentQuestion,
  selectedAnswers,
  answeredCount,
  handleSelectAnswer,
  handleNext,
  handlePrevious,
  handleQuestionClick,
}: QuizContainerProps) {
  return (
    <section>
      {/* Question Navigation */}
      <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
        {questions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => handleQuestionClick(index)}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-semibold transition-all ${
              index === currentQuestion
                ? "bg-blue-600 text-white shadow-lg"
                : selectedAnswers[index]
                ? "bg-purple-200 text-purple-700"
                : "bg-purple-100 text-slate-600 hover:bg-purple-200"
            }`}
          >
            {selectedAnswers[index] ? <Check className="h-5 w-5" /> : index + 1}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div className="mb-8 rounded-3xl bg-linear-to-br from-blue-600 to-blue-800 p-8 text-white shadow-lg">
        <p className="mb-2 text-sm font-medium opacity-90">
          Question {currentQuestion + 1}
        </p>
        <h2 className="mb-4 text-3xl font-bold">{question.question}</h2>
        {/* <p className="text-sm opacity-75">Category: {question.category}</p> */}
      </div>

      {/* Answer Options */}
      <div className="mb-8 space-y-3">
        <RadioGroup
          value={selectedAnswers[currentQuestion] || ""}
          onValueChange={handleSelectAnswer}
        >
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center gap-4 rounded-full border-2 px-6 py-4 transition-all cursor-pointer ${
                selectedAnswers[currentQuestion] === option.id
                  ? "border-blue-600 bg-purple-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <RadioGroupItem value={option.id} id={option.id} className="h-6 w-6" />
              <label
                htmlFor={option.id}
                className="flex-1 cursor-pointer font-medium text-slate-700"
              >
                {String.fromCharCode(65 + question.options.indexOf(option))}.{" "}
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
          className="gap-2 rounded-full px-6 py-2 text-purple-600 hover:bg-purple-50 bg-transparent"
        >
          <ChevronLeft className="h-5 w-5" />
          Previous
        </Button>

        <div className="text-sm text-slate-600">
          {answeredCount} of {questions.length} answered
        </div>

        <Button
          onClick={handleNext}
          disabled={currentQuestion === questions.length - 1}
          className="gap-2 rounded-full bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Next
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
