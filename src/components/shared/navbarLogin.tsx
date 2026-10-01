import { Link } from "react-router"
import Brand from "./brand"
import { useAuth } from "@/context/useAuth"

function Navbar() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <nav className="container-main flex items-center justify-between py-3">

        <Link to="/">
          <Brand />
        </Link>

        {!user ? (
          <div className="flex gap-2 px-10">

            <Link
              to="/register"
              className="px-4 py-2 rounded-xl text-sm font-medium
              bg-secondary text-secondary-foreground
              hover:bg-accent hover:text-accent-foreground transition"
            >
              Registrar
            </Link>

            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-sm font-medium
              bg-secondary text-secondary-foreground
              hover:bg-accent hover:text-accent-foreground transition"
            >
              Login
            </Link>

          </div>
        ) : (
          <div className="flex gap-6">

            <Link
              to="/characters"
              className="text-sm font-medium hover:text-primary"
            >
              Personagens
            </Link>

            <Link
              to="/campaign"
              className="text-sm font-medium hover:text-primary"
            >
              Campanha
            </Link>

            <Link
              to="/profile"
              className="text-sm font-medium hover:text-primary"
            >
              Perfil
            </Link>

          </div>
        )}

      </nav>
    </header>
  )
}

export default Navbar