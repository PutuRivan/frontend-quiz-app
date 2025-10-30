import { useEffect, useState } from "react"
import QuizHeader from "@/components/quiz/quiz-header"
import QuizContainer from "@/components/quiz/quiz-container"
import { useNavigate } from "react-router"
import { useAuth } from "@/context/auth-context"

// Struktur data untuk setiap pertanyaan
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
  const [timeLeft, setTimeLeft] = useState(60)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple")
        const data = await res.json()

        const formatted: Question[] = data.results.map((item: any, index: number) => {
          // Gabungkan jawaban benar + salah, lalu acak
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
            correctAnswer: String.fromCharCode(
              97 + shuffled.indexOf(item.correct_answer)
            ),
          }
        })

        setQuestions(formatted)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch questions:", error)
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

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
        date: new Date().toLocaleString("id-ID", {
          dateStyle: "short",
          timeStyle: "short",
        })
      }

      const existingResults = JSON.parse(localStorage.getItem("quizResults") || "[]")
      const updatedResults = [result, ...existingResults]

      localStorage.setItem("quizResults", JSON.stringify(updatedResults))
    }

    navigate("/quiz/result", {
      state: { totalQuestions, correctAnswers, wrongAnswers, score },
    })
  }

  // Timer
  useEffect(() => {
    if (!questions.length || loading) return
    if (timeLeft <= 0) {
      handleFinishQuiz()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, questions, loading])

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-lg font-medium text-slate-600 animate-pulse">Loading questions...</p>
      </div>
    )
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-lg font-medium text-red-500">Failed to load quiz questions.</p>
      </div>
    )
  }

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

// Fungsi helper untuk mengubah karakter HTML (misalnya &quot;, &#039;)
function decodeHTMLEntities(text: string) {
  const textarea = document.createElement("textarea")
  textarea.innerHTML = text
  return textarea.value
}
