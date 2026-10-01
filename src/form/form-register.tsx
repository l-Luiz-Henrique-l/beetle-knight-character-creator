import { useState } from "react"
import { registerUser } from "@/auth/register"

export default function FormRegister() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [generalError, setGeneralError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const result = registerUser(form)

    if (!result.success) {
      setErrors(result.errors || {})

      if (result.message) {
        setGeneralError(result.message)
      }
      return
    }

    setErrors({})
    setGeneralError("")

    alert("Conta criada com sucesso!")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      
      {generalError && (
        <p className="text-red-500 text-sm text-center">
          {generalError}
        </p>
      )}

      <div>
        <input
          name="username"
          placeholder="Usuário"
          value={form.username}
          onChange={handleChange}
          className={`border p-2 rounded w-full ${
            errors.username ? "border-red-500" : ""
          }`}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">
            {errors.username[0]}
          </p>
        )}
      </div>

      <div>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={`border p-2 rounded w-full ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email[0]}
          </p>
        )}
      </div>

      <div>
        <input
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          className={`border p-2 rounded w-full ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password[0]}
          </p>
        )}
      </div>

      <div>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirmar senha"
          value={form.confirmPassword}
          onChange={handleChange}
          className={`border p-2 rounded w-full ${
            errors.confirmPassword ? "border-red-500" : ""
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-primary text-white p-2 rounded"
      >
        Criar Conta
      </button>

    </form>
  )
}