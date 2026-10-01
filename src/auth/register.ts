import { registerSchema, type RegisterFormData } from "@/schemas/registerSchemas"
import { z } from "zod"

type User = Omit<RegisterFormData, "confirmPassword">

export function registerUser(data: RegisterFormData) {
  try {
    const validatedData = registerSchema.parse(data)

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")

    const userExists = users.find(
      (user) => user.email === validatedData.email
    )

    if (userExists) {
      return {
        success: false,
        message: "Usuário já existe",
      }
    }

    const { confirmPassword, ...userToSave } = validatedData

    users.push(userToSave)
    localStorage.setItem("users", JSON.stringify(users))

    return {
      success: true,
      message: "Conta criada com sucesso",
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
      message: "Oops! Algo deu errado",
    }
  }
}