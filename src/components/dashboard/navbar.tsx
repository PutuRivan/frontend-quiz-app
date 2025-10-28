import { BookOpen } from "lucide-react"
import { Button } from "../ui/button"

export default function Navbar() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">QuizMaster</h1>
        </div>
        <Button variant="outline" className="bg-purple-100 text-purple-600 hover:bg-purple-200 border-purple-200">
          Logout
        </Button>
      </div>
    </header>
  )
}
