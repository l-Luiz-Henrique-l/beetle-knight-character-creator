
import type { Character } from '@/types/character'
import { CharacterCard } from './CharacterCard'

interface CharacterGridProps {
  characters: Character[]
  onAccessCharacter: (id: string) => void
}

export function CharacterGrid({ characters, onAccessCharacter }: CharacterGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {characters.map((char) => (
        <CharacterCard 
          key={char.id} 
          character={char} 
          onAccess={onAccessCharacter} 
        />
      ))}
    </div>
  )
}