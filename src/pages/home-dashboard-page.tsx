import GuestDashboard from "@/components/dashboard/guest/guest-dashboard"
import UserDashboard from "@/components/dashboard/user/user-dashboard"
import { useAuth } from "@/context/auth-context"
import type { TRecentScore, TStatistic } from "@/libs/types"
import { loadStoredResults } from "@/libs/utils"
import { useEffect, useState } from "react"

export default function HomeDashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<TStatistic[]>([])
  const [recentScores, setRecentScores] = useState<TRecentScore[]>([])

  useEffect(() => {
    const loadResults = () => {
      const results: TRecentScore[] = loadStoredResults()
      if (!results) return

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

    loadResults()

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
