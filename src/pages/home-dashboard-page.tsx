import GuestDashboard from "@/components/dashboard/guest/guest-dashboard"
import UserDashboard from "@/components/dashboard/user/user-dashboard"
import { useAuth } from "@/context/auth-context"
import { useEffect, useState } from "react"


interface Statistic {
  title: string
  number: number
}

interface RecentScore {
  user: string
  score: number
  date: string
}


export default function HomeDashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<Statistic[]>([])
  const [recentScores, setRecentScores] = useState<RecentScore[]>([])

  useEffect(() => {
    const loadResults = () => {
      const storedResults = localStorage.getItem("quizResults")
      if (!storedResults) return

      const results: RecentScore[] = JSON.parse(storedResults)
      setRecentScores(results.sort((a, b) => b.score - a.score))

      if (user?.username) {
        const userResults = results.filter(r => r.user === user.username)

        if (userResults.length > 0) {
          const sortedByDate = [...userResults].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )

          const lastScore = sortedByDate[0].score
          const bestScore = Math.max(...userResults.map(r => r.score))
          const totalAttempts = userResults.length

          setStats([
            { title: "Last Score", number: lastScore },
            { title: "Total Attempts", number: totalAttempts },
            { title: "Best Score", number: bestScore },
          ])
        } else {
          setStats([
            { title: "Last Score", number: 0 },
            { title: "Total Attempts", number: 0 },
            { title: "Best Score", number: 0 },
          ])
        }
      }
    }

    loadResults() // jalankan saat pertama kali mount

    // Tambahkan event listener saat localStorage berubah
    window.addEventListener("storage", loadResults)
    window.addEventListener("quizResultsUpdated", loadResults)

    return () => {
      window.removeEventListener("storage", loadResults)
      window.removeEventListener("quizResultsUpdated", loadResults)
    }
  }, [user])


  return (
    <>
      {user?.username ? (
        <UserDashboard user={user.username} stats={stats} recentScore={recentScores} />
      ) : (
        <GuestDashboard />
      )}
    </>
  )
}
