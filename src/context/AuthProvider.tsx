import { useState } from "react"
import { AuthContext, type User } from "./AuthContext"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("currentUser")
    return storedUser ? JSON.parse(storedUser) : null
  })

  const login = (user: User) => {
    localStorage.setItem("currentUser", JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem("currentUser")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}