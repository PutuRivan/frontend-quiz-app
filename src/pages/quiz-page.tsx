"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import QuizHeader from "@/components/quiz/quiz-header"
import QuizContainer from "@/components/quiz/quiz-container"

interface Question {
  id: number
  question: string
  category: string
  options: { id: string; label: string }[]
  correctAnswer: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    category: "Geography",
    options: [
      { id: "a", label: "London" },
      { id: "b", label: "Paris" },
      { id: "c", label: "Berlin" },
      { id: "d", label: "Madrid" },
    ],
    correctAnswer: "b",
  },
  {
    id: 2,
    question: "What is 2 + 2?",
    category: "Mathematics",
    options: [
      { id: "a", label: "3" },
      { id: "b", label: "4" },
      { id: "c", label: "5" },
      { id: "d", label: "6" },
    ],
    correctAnswer: "b",
  },
  {
    id: 3,
    question: "Who wrote Romeo and Juliet?",
    category: "Literature",
    options: [
      { id: "a", label: "Jane Austen" },
      { id: "b", label: "William Shakespeare" },
      { id: "c", label: "Charles Dickens" },
      { id: "d", label: "Mark Twain" },
    ],
    correctAnswer: "b",
  },
  {
    id: 4,
    question: "What is the powerhouse of the cell?",
    category: "Science",
    options: [
      { id: "a", label: "Nucleus" },
      { id: "b", label: "Mitochondria" },
      { id: "c", label: "Ribosome" },
      { id: "d", label: "Endoplasmic Reticulum" },
    ],
    correctAnswer: "b",
  },
  {
    id: 5,
    question: "What is the largest planet in our solar system?",
    category: "Astronomy",
    options: [
      { id: "a", label: "Saturn" },
      { id: "b", label: "Neptune" },
      { id: "c", label: "Jupiter" },
      { id: "d", label: "Uranus" },
    ],
    correctAnswer: "c",
  },
  {
    id: 6,
    question: "In what year did World War II end?",
    category: "History",
    options: [
      { id: "a", label: "1943" },
      { id: "b", label: "1944" },
      { id: "c", label: "1945" },
      { id: "d", label: "1946" },
    ],
    correctAnswer: "c",
  },
  {
    id: 7,
    question: "What is the chemical symbol for Gold?",
    category: "Chemistry",
    options: [
      { id: "a", label: "Go" },
      { id: "b", label: "Gd" },
      { id: "c", label: "Au" },
      { id: "d", label: "Ag" },
    ],
    correctAnswer: "c",
  },
  {
    id: 8,
    question: "Which country is home to the kangaroo?",
    category: "Biology",
    options: [
      { id: "a", label: "New Zealand" },
      { id: "b", label: "Australia" },
      { id: "c", label: "South Africa" },
      { id: "d", label: "Brazil" },
    ],
    correctAnswer: "b",
  },
  {
    id: 9,
    question: "What is the smallest prime number?",
    category: "Mathematics",
    options: [
      { id: "a", label: "0" },
      { id: "b", label: "1" },
      { id: "c", label: "2" },
      { id: "d", label: "3" },
    ],
    correctAnswer: "c",
  },
  {
    id: 10,
    question: "What is the speed of light?",
    category: "Physics",
    options: [
      { id: "a", label: "300,000 km/s" },
      { id: "b", label: "150,000 km/s" },
      { id: "c", label: "450,000 km/s" },
      { id: "d", label: "600,000 km/s" },
    ],
    correctAnswer: "a",
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(600)

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const answeredCount = Object.keys(selectedAnswers).length

  const handleSelectAnswer = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionId,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleQuestionClick = (index: number) => {
    setCurrentQuestion(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-4xl">
        <QuizHeader
          currentQuestion={currentQuestion}
          questions={questions}
          timeLeft={timeLeft}
          progress={progress}
        />

        <QuizContainer
          questions={questions}
          question={question}
          currentQuestion={currentQuestion}
          selectedAnswers={selectedAnswers}
          answeredCount={answeredCount}
          handleSelectAnswer={handleSelectAnswer}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleQuestionClick={handleQuestionClick}
        />
      </div>
    </div>
  )
}
