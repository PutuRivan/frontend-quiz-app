import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

export default function HomeDashboardPage() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <h1>Welcome, Alex!</h1>
          <p>Ready to Test Your Knowledge?</p>
        </div>
        <Button>Start Quiz</Button>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {data.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.number}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div>
        <h1>Recent Score</h1>
      </div>
    </section>
  )
}
