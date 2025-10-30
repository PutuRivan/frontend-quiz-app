import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router"

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
    // 🔹 Hanya tampilkan resume jika user login & ada session
    const savedSession = localStorage.getItem("quizSession")
    if (user && savedSession) {
      const parsed = JSON.parse(savedSession)
      if (parsed.user === user) {
        setShowResumeDialog(true)
        return
      }
    }

    // 🔹 Jika tidak ada session atau guest → langsung mulai quiz
    navigate("/quiz")
  }

  const handleStartNewQuiz = () => {
    localStorage.removeItem("quizSession")
    setShowResumeDialog(false)
    navigate("/quiz")
  }

  const handleResumeQuiz = () => {
    setShowResumeDialog(false)
    navigate("/quiz?resume=true") // kirim sinyal resume via query param
  }

  return (
    <section>
      {/* Welcome Section */}
      <div className="mb-10 flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome, {user}!</h2>
          <p className="text-sm text-muted-foreground">Ready to test your knowledge?</p>
        </div>

        <Button
          onClick={handleStartClick}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6 text-lg font-semibold"
        >
          Start Quiz
        </Button>
      </div>

      {/* Stats Cards */}
      <div>
        {stats.length === 0 ? (
          <h1 className="text-center text-muted-foreground">No statistics available yet.</h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((item, index) => (
              <Card key={index} className="p-5 border border-border">
                <p className="text-sm font-medium text-muted-foreground mb-2">{item.title}</p>
                <p className="text-4xl font-bold text-foreground">{item.number}</p>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recent Scores Section */}
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

      {/* 🔹 Resume Quiz Dialog */}
      <AlertDialog open={showResumeDialog} onOpenChange={setShowResumeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resume Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              You have an unfinished quiz session. Would you like to continue where you left off or start a new quiz?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleStartNewQuiz}>Start New</AlertDialogCancel>
            <AlertDialogAction onClick={handleResumeQuiz}>Resume</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
