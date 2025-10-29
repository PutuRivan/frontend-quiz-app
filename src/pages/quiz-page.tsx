import { useEffect, useState } from "react"
import QuizHeader from "@/components/quiz/quiz-header"
import QuizContainer from "@/components/quiz/quiz-container"
import { useNavigate } from "react-router"
import { useAuth } from "@/context/auth-context"

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
      { id: "b", label: "Jupiter" },
      { id: "c", label: "Neptune" },
      { id: "d", label: "Uranus" },
    ],
    correctAnswer: "b",
  },
  {
    id: 6,
    question: "In what year did World War II end?",
    category: "History",
    options: [
      { id: "a", label: "1943" },
      { id: "b", label: "1945" },
      { id: "c", label: "1944" },
      { id: "d", label: "1946" },
    ],
    correctAnswer: "b",
  },
  {
    id: 7,
    question: "What is the chemical symbol for Gold?",
    category: "Chemistry",
    options: [
      { id: "a", label: "Go" },
      { id: "b", label: "Au" },
      { id: "c", label: "Gd" },
      { id: "d", label: "Ag" },
    ],
    correctAnswer: "b",
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
      { id: "b", label: "2" },
      { id: "c", label: "1" },
      { id: "d", label: "3" },
    ],
    correctAnswer: "b",
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
  const [timeLeft, setTimeLeft] = useState(60)
  const navigate = useNavigate()
  const { user } = useAuth()

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const answeredCount = Object.keys(selectedAnswers).length

  const handleFinishQuiz = () => {
    const correctAnswers = questions.filter(
      (q, index) => selectedAnswers[index] === q.correctAnswer
    ).length

    const totalQuestions = questions.length
    const wrongAnswers = totalQuestions - correctAnswers
    const score = Math.round((correctAnswers / totalQuestions) * 100)

    // Hanya simpan kalau user login
    if (user?.username) {
      const result = {
        user: user.username,
        score,
        date: new Date().toISOString().split("T")[0],
      }

      const existingResults = JSON.parse(localStorage.getItem("quizResults") || "[]")
      const updatedResults = [...existingResults, result]

      localStorage.setItem("quizResults", JSON.stringify(updatedResults))
    }

    navigate("/quiz/result", {
      state: { totalQuestions, correctAnswers, wrongAnswers, score },
    })
  }


  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinishQuiz()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

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

  const handleSelectAnswer = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionId,
    }))
  }

  const handleQuestionClick = (index: number) => {
    setCurrentQuestion(index)
  }

  const allAnswered = answeredCount === questions.length

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
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
          allAnswered={allAnswered}
          handleFinishQuiz={handleFinishQuiz}
        />
      </div>
    </div>
  )
}
