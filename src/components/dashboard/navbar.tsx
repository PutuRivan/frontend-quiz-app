import { CircleQuestionMark } from "lucide-react"
import { Button } from "../ui/button"

export default function Navbar() {
  return (
    <header className="flex justify-between p-5 px-20">
      <div className="flex gap-2">
        <CircleQuestionMark />
        <h1>Quiz Master</h1>
      </div>
      <div>
        <Button variant={"secondary"}>Logout</Button>
      </div>
    </header>
  )
}
