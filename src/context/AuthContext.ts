import { createContext } from "react"

export type User = {
  username: string
  email: string
}

export interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)