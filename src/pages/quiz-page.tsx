import { useEffect, useState } from "react"
import QuizHeader from "@/components/quiz/quiz-header"
import QuizContainer from "@/components/quiz/quiz-container"
import { useNavigate, useLocation } from "react-router"
import { useAuth } from "@/context/auth-context"

interface Question {
  id: number
  question: string
  category: string
  options: { id: string; label: string }[]
  correctAnswer: string
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(600)
  const [loading, setLoading] = useState(true)

  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const decodeHTMLEntities = (text: string) => {
    const textarea = document.createElement("textarea")
    textarea.innerHTML = text
    return textarea.value
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=31&difficulty=hard&type=multiple")
        const data = await res.json()

        const formatted: Question[] = data.results.map((item: any, index: number) => {
          const allAnswers = [...item.incorrect_answers, item.correct_answer]
          const shuffled = allAnswers.sort(() => Math.random() - 0.5)

          return {
            id: index + 1,
            question: decodeHTMLEntities(item.question),
            category: item.category,
            options: shuffled.map((ans, i) => ({
              id: String.fromCharCode(97 + i),
              label: decodeHTMLEntities(ans),
            })),
            correctAnswer: String.fromCharCode(97 + shuffled.indexOf(item.correct_answer)),
          }
        })

        setQuestions(formatted)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch questions:", error)
        setLoading(false)
      }
    }

    const query = new URLSearchParams(location.search)
    if (query.get("resume") === "true" && user?.username) {
      const sessionKey = `quizSession_${user.username}`
      const saved = localStorage.getItem(sessionKey)
      if (saved) {
        const session = JSON.parse(saved)
        setQuestions(session.questions)
        setSelectedAnswers(session.selectedAnswers || {})
        setCurrentQuestion(session.currentQuestion || 0)
        setTimeLeft(session.timeLeft || 60)
        setLoading(false)
        return
      }
    }

    fetchQuestions()
  }, [location, user])

  // ✅ Simpan session per user
  useEffect(() => {
    if (user?.username && questions.length > 0) {
      const sessionKey = `quizSession_${user.username}`
      const session = { user: user.username, questions, selectedAnswers, currentQuestion, timeLeft }
      localStorage.setItem(sessionKey, JSON.stringify(session))
    }
  }, [user, questions, selectedAnswers, currentQuestion, timeLeft])

  const handleFinishQuiz = () => {
    const correctAnswers = questions.filter(
      (q, index) => selectedAnswers[index] === q.correctAnswer
    ).length

    const totalQuestions = questions.length
    const wrongAnswers = totalQuestions - correctAnswers
    const score = Math.round((correctAnswers / totalQuestions) * 100)

    if (user?.username) {
      const result = {
        user: user.username,
        score,
        date: new Date().toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" }),
      }

      const existing = JSON.parse(localStorage.getItem("quizResults") || "[]")
      localStorage.setItem("quizResults", JSON.stringify([result, ...existing]))

      // ✅ Hapus session user saat quiz selesai
      const sessionKey = `quizSession_${user.username}`
      localStorage.removeItem(sessionKey)
    }

    navigate("/quiz/result", { state: { totalQuestions, correctAnswers, wrongAnswers, score } })
  }

  // Timer
  useEffect(() => {
    if (!questions.length || loading) return
    if (timeLeft <= 0) {
      handleFinishQuiz()
      return
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft, questions, loading])

  const handleNext = () => currentQuestion < questions.length - 1 && setCurrentQuestion((prev) => prev + 1)
  const handlePrevious = () => currentQuestion > 0 && setCurrentQuestion((prev) => prev - 1)
  const handleSelectAnswer = (optionId: string) =>
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion]: optionId }))
  const handleQuestionClick = (index: number) => setCurrentQuestion(index)

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const answeredCount = Object.keys(selectedAnswers).length
  const allAnswered = answeredCount === questions.length

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-lg font-medium text-slate-600 animate-pulse">Loading questions...</p>
      </div>
    )

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-4xl">
        <QuizHeader currentQuestion={currentQuestion} questions={questions} timeLeft={timeLeft} progress={progress} />
        <QuizContainer
          questions={questions}
          question={questions[currentQuestion]}
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
