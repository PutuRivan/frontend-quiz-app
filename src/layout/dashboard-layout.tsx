import Navbar from "@/components/dashboard/navbar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <Outlet />
      </main>
    </>
  )
}
