import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

const user = [
  {
    name: "John Doe",
    score: 85,
    date: "2023-01-01"
  },
  {
    name: "John Doe",
    score: 85,
    date: "2023-01-01"
  },
  {
    name: "John Doe",
    score: 85,
    date: "2023-01-01"
  },
  {
    name: "John Doe",
    score: 85,
    date: "2023-01-01"
  },
  {
    name: "John Doe",
    score: 85,
    date: "2023-01-01"
  },
]

export default function HomeDashboardPage() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome, Alex!</h1>
          <p className="text-muted-foreground">Ready to Test Your Knowledge?</p>
        </div>
        <Button>Start Quiz</Button>
      </div>
      <div className="grid grid-cols-3 gap-5 pt-5">
        {data.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-xl font-normal">{item.title}</CardTitle>
              <CardDescription className="text-2xl font-bold text-black">{item.number}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="pt-5">
        <h1 className="text-2xl font-bold">Recent Score</h1>
        <Card className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.score}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  )
}
