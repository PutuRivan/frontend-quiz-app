import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router";

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
  return (
    <section>
      {/* Welcome Section */}
      <div className="mb-10 flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome, Alex!</h2>
          <p className="text-sm text-muted-foreground">Ready to test your knowledge?</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6 text-lg font-semibold">
          <Link to={'/quiz'}>
            Start Quiz
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {data.map((item) => (
          <Card className="p-5 border border-border">
            <p className="text-sm font-medium text-muted-foreground mb-2">{item.title}</p>
            <p className="text-4xl font-bold text-foreground">{item.number}</p>
          </Card>
        ))}
      </div>

      {/* Recent Scores Section */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-5">Recent Scores</h3>
        <Card className="border border-border max-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border bg-muted/50">
                <TableHead className="text-foreground font-semibold">User</TableHead>
                <TableHead className="text-foreground font-semibold">Score</TableHead>
                <TableHead className="text-foreground font-semibold">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentScores.map((record, index) => (
                <TableRow key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <TableCell className="text-foreground font-medium">{record.user}</TableCell>
                  <TableCell className="text-foreground font-medium">{record.score}</TableCell>
                  <TableCell className="text-muted-foreground">{record.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  )
}
