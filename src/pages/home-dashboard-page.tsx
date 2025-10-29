import GuestDashboard from "@/components/dashboard/guest/guest-dashboard"
import UserDashboard from "@/components/dashboard/user/user-dashboard"
import { useAuth } from "@/context/auth-context"


const data = [
  {
    title: "Last Score",
    number: 85
  },
  {
    title: "Total Attemps",
    number: 12
  },
  {
    title: "Best Score",
    number: 95
  }
]

const recentScores = [
  { user: "Alex", score: 85, date: "2023-10-26" },
  { user: "Jamie", score: 92, date: "2023-10-25" },
  { user: "Sam", score: 78, date: "2023-10-25" },
  { user: "Taylor", score: 95, date: "2023-10-24" },
  { user: "Taylor", score: 95, date: "2023-10-24" },
  { user: "Taylor", score: 95, date: "2023-10-24" },
  { user: "Taylor", score: 95, date: "2023-10-24" },
  { user: "Taylor", score: 95, date: "2023-10-24" },
  { user: "Taylor", score: 95, date: "2023-10-24" },
  { user: "Taylor", score: 95, date: "2023-10-24" },
  { user: "Taylor", score: 95, date: "2023-10-24" },
]

export default function HomeDashboardPage() {
  const { user } = useAuth()
  return (
    <>
      {user?.username ? (
        <UserDashboard stats={data} recentScore={recentScores} />
      ) : (
        <GuestDashboard />
      )}
    </>
  )
}
