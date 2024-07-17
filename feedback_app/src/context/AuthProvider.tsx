// context/AuthProvider.tsx
'use client'
import { useSession } from "next-auth/react"
import { ReactNode } from "react"

interface AuthProps {
  children: ReactNode;
}

function Auth({ children }: AuthProps) {
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

export default Auth;
