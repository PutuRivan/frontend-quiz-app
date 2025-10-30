import AuthProviders from "./auth-providers";

export default function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProviders>
      {children}
    </AuthProviders>
  )
}
