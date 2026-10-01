import HeroSection from "./pages/HeroSection"
import MainLayout from "./layouts/base-layout"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import { BrowserRouter, Route, Routes } from "react-router"
import LoreSection from "./pages/LoreSection"
import CharacterPage from "./pages/CharactersPage"
import { CharacterSheet } from "./components/characters/CharacterSheet"


function Home() {
  return (
    <div>
      <HeroSection />
        
    <div className="container-main">
  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-7" />
</div>

      <LoreSection />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/characters" element={<CharacterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App