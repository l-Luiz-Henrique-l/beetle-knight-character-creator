import type { AuthResponse } from "@/types/auth"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
})

type LoginData = z.infer<typeof loginSchema>

type User = {
  username: string
  email: string
  password: string
}

export function loginUser(data: LoginData): AuthResponse {
  try {
    const validatedData = loginSchema.parse(data)

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")

    const user = users.find(
      (u) =>
        u.email === validatedData.email &&
        u.password === validatedData.password
    )

    if (!user) {
      return {
        success: false,
        message: "Email ou senha incorretos",
      }
    }

    localStorage.setItem("currentUser", JSON.stringify(user))

    return {
      success: true,
      message: "Login feito com sucesso!",
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      }
    }

    return {
      success: false,
      message: "Erro inesperado",
    }
  }
}