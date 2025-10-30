import { BookOpen } from "lucide-react"
import { Button } from "../ui/button"
import { useAuth } from "@/context/auth-context"
import { Link } from "react-router"
import { LogoutConfirmation } from "./user/logout-confirmation"

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">QuizMaster</h1>
        </div>
        {user?.username ? (
          <LogoutConfirmation logout={logout} />
        ) : (
          <div className="flex gap-5">
            <Button variant={"secondary"}>
              <Link to={"/"}>Login</Link>
            </Button>
            <Button variant={"default"}>
              <Link to={"/register"}>Register</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
