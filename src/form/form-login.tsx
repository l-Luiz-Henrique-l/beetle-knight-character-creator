import { useState } from "react"
import { loginUser } from "@/auth/login"
import { useAuth } from "@/context/useAuth"
import { useNavigate } from "react-router"


export default function FormLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
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

    const result = loginUser(form)

    if (!result.success) {

        setErrors(result.errors || {})

        if (result.message) {
            setGeneralError(result.message)
        }

        return
        }

        setErrors({})
        setGeneralError("")

    const user = JSON.parse(localStorage.getItem("currentUser")!)
    login(user)

    navigate("/")
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

  <button
    type="submit"
    className="bg-primary text-white p-2 rounded"
  >
    Entrar
  </button>

</form>
  )
}