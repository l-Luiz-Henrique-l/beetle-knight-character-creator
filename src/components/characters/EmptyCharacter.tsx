import { Button } from '@/components/ui/button'
import { ShieldAlert, Plus } from 'lucide-react'

interface EmptyCharactersProps {
  onCreateNew: () => void
}

export function EmptyCharacters({ onCreateNew }: EmptyCharactersProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-muted rounded-xl bg-card/30 max-w-lg mx-auto mt-8">
      <div className="p-4 bg-muted/60 rounded-full text-muted-foreground mb-4">
        <ShieldAlert className="size-10 stroke-[1.5]" />
      </div>
      
      <h3 
        className="text-2xl font-bold text-foreground mb-2"
        style={{ fontFamily: 'MedievalSharp, cursive' }}
      >
        Nenhum Cavaleiro Encontrado
      </h3>
      
      <p className="text-muted-foreground text-sm max-w-sm mb-6 leading-relaxed">
        O reino de Litterfall precisa de protetores! Crie seu primeiro Artrópode e inicie seu chamado na cavalaria.
      </p>

      <Button onClick={onCreateNew} className="uppercase tracking-wider font-semibold text-xs gap-2">
        <Plus className="size-4" />
        Forjar Novo Cavaleiro
      </Button>
    </div>
  )
}