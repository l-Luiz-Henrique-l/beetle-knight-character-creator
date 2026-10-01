import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface CharacterActionsProps {
  onCreateNew: () => void
  onDeleteMode?: () => void
  isDeleteMode?: boolean
  hasCharacters: boolean
}

export function CharacterActions({ onCreateNew, onDeleteMode, isDeleteMode, hasCharacters }: CharacterActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full border-b pb-4 mb-6">
      <h2 
        className="text-2xl font-bold tracking-wider text-foreground uppercase"
        style={{ fontFamily: 'MedievalSharp, cursive' }}
      >
        Personagens da Campanha
      </h2>

      <div className="flex gap-3 items-center">
        <Button 
          variant="default" 
          size="sm" 
          className="uppercase tracking-wider font-semibold text-xs gap-1"
          onClick={onCreateNew}
        >
          <Plus className="size-4" />
          Novo Personagem
        </Button>

        {hasCharacters && onDeleteMode && (
          <Button 
            variant={isDeleteMode ? "destructive" : "outline"} 
            size="sm" 
            className="uppercase tracking-wider font-semibold text-xs gap-1"
            onClick={onDeleteMode}
          >
            <Trash2 className="size-4" />
            {isDeleteMode ? "Cancelar" : "Apagar Personagem"}
          </Button>
        )}
      </div>
    </div>
  )
}