import { Link } from "react-router";
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "../../ui/alert";
import GuestStartQuizAlert from "./quiz-start-quiz-alert";

export default function GuestDashboard() {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="">
        <Alert className="bg-yellow-50 border-yellow-200 text-yellow-900">
          <Info className="h-5 w-5 text-yellow-600" />
          <AlertDescription className="text-base">
            You're currently playing as a Guest. Your progress won't be saved.
          </AlertDescription>
        </Alert>
      </div>

      <GuestStartQuizAlert />

      <p className="text-muted-foreground text-base">
        <Link to="/" className="text-purple-600 hover:text-purple-700 hover:underline">
          Login
        </Link>
        {" or "}
        <Link to="/register" className="text-purple-600 hover:text-purple-700 hover:underline">
          Register
        </Link>
        {" to save your progress."}
      </p>
    </div>
  )
}
