import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router"
import ResumeDialog from "./resume-dialog"

interface Statistic {
  title: string
  number: number
}

interface RecentScore {
  user: string
  score: number
  date: string
}

interface UserDashboardProps {
  user: string
  stats: Statistic[]
  recentScore: RecentScore[]
}

export default function UserDashboard({ user, stats, recentScore }: UserDashboardProps) {
  const [showResumeDialog, setShowResumeDialog] = useState(false)
  const navigate = useNavigate()

  const handleStartClick = () => {
    const savedSession = localStorage.getItem(`quizSession_${user}`)
    if (user && savedSession) {
      const parsed = JSON.parse(savedSession)
      if (parsed.user === user) {
        setShowResumeDialog(true)
        return
      }
    }
    navigate("/quiz")
  }

  const handleStartNewQuiz = () => {
    localStorage.removeItem(`quizSession_${user}`)
    setShowResumeDialog(false)
    navigate("/quiz")
  }

  const handleResumeQuiz = () => {
    setShowResumeDialog(false)
    navigate("/quiz?resume=true")
  }

  return (
    <section>
      <div className="mb-10 flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome, {user}!</h2>
          <p className="text-sm text-muted-foreground">Ready to test your knowledge?</p>
        </div>

        <Button
          onClick={handleStartClick}
          className="rounded-full px-8 py-6 text-lg font-semibold"
        >
          Start Quiz
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.length === 0
          ? ["Last Score", "Total Attempts", "Best Score"].map((title, index) => (
            <Card key={index} className="p-5 border border-border">
              <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
              <p className="text-4xl font-bold text-foreground">0</p>
            </Card>
          ))
          : stats.map((item, index) => (
            <Card key={index} className="p-5 border border-border">
              <p className="text-sm font-medium text-muted-foreground mb-2">{item.title}</p>
              <p className="text-4xl font-bold text-foreground">{item.number}</p>
            </Card>
          ))}
      </div>

      <div>
        <h3 className="text-xl font-bold text-foreground mb-5">Recent Scores</h3>
        {recentScore.length === 0 ? (
          <h1 className="text-center text-muted-foreground">No quiz attempts have been made yet.</h1>
        ) : (
          <Card className="border border-border max-h-[400px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border bg-muted/50">
                  <TableHead className="text-foreground font-semibold">User</TableHead>
                  <TableHead className="text-foreground font-semibold">Score</TableHead>
                  <TableHead className="text-foreground font-semibold">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentScore.map((record, index) => (
                  <TableRow key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <TableCell className="text-foreground font-medium">{record.user}</TableCell>
                    <TableCell className="text-foreground font-medium">{record.score}</TableCell>
                    <TableCell className="text-muted-foreground">{record.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>

      <ResumeDialog
        open={showResumeDialog}
        onOpenChange={setShowResumeDialog}
        onStartNew={handleStartNewQuiz}
        onResume={handleResumeQuiz}
      />
    </section>
  )
}
