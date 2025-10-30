import { Toaster } from "@/components/ui/sonner";
import AuthProviders from "./auth-providers";

export default function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProviders>
      {children}
      <Toaster position="top-center" richColors theme="light"/>
    </AuthProviders>
  )
}
