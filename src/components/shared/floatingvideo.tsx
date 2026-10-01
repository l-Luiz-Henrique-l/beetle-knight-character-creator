import { useState } from "react"
import { PlayIcon, XIcon } from "lucide-react"

function FloatingVideo() {
  const [isVisible, setIsVisible] = useState(true)

  const videoId = "foGKnHKusPs"

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      
      <div className="flex items-center justify-between mb-2 px-1">
        <h4
          className="font-bold"
          style={{ fontFamily: "MedievalSharp, cursive" }}
        >
          Considere assistir:
        </h4>
      </div>

      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
<div className="relative">
  
  <button
    onClick={(e) => {
      e.preventDefault()
      setIsVisible(false)
    }}
    className="absolute top-2 right-2 z-10 rounded-full bg-black/60 p-1 text-white hover:bg-black"
  >
    <XIcon size={16} />
  </button>

  <img
    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
    alt="Sessão RPG"
    className="w-64 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
  />

  <div
    className="absolute inset-0 bg-black/40 flex items-center justify-center
    opacity-0 group-hover:opacity-100 transition"
  >
    <PlayIcon className="text-white size-10" />
  </div>

</div>
      </a>

    </div>
  )
}

export default FloatingVideo