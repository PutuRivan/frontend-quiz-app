import Navbar from "@/components/dashboard/navbar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <>
      <Navbar />
      <main className="p-5 px-20">
        <Outlet />
      </main>
    </>
  )
}
