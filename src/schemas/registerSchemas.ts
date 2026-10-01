import {z} from "zod"

export const registerSchema = z.object({
    username: z.string().trim().min(3, "É preciso de no mínimo 3 carateres").
    regex(/^[a-zA-Z0-9]+$/, "O nome de usuário deve ter apenas letras e números"),
    
    email: z.string().email("Email precisa ser válido"),

    password: z.string().min(8, "A senha precisa ter 8 caracteres no minimo").
    regex(/[A-Za-z]/, "Precisa ter letras").regex(/[0-9]/, "Precisa ter números"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
})

export type RegisterFormData = z.infer<typeof registerSchema>