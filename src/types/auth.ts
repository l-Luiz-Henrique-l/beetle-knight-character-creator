export interface AuthResponse {
  success: boolean
  message?: string
  errors?: Record<string, string[]>
}