import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Character } from '@/types/character'
import { Shield, Swords, Zap, Eye, Footprints } from 'lucide-react'

interface CharacterCardProps {
  character: Character
  onAccess: (id: string) => void
}

export function CharacterCard({ character, onAccess }: CharacterCardProps) {
  const getDiceIcon = (attr: string) => {
    switch (attr) {
      case 'strength': return <Swords className="size-3.5 text-red-500" />
      case 'intellect': return <Eye className="size-3.5 text-blue-500" />
      case 'presence': return <Zap className="size-3.5 text-amber-500" />
      case 'agility': return <Footprints className="size-3.5 text-emerald-500" />
      default: return null
    }
  }

  // Mapeamento amigável para siglas
  const getAttrLabel = (attr: string) => {
    switch (attr) {
      case 'strength': return 'FOR'
      case 'intellect': return 'INT'
      case 'presence': return 'PRE'
      case 'agility': return 'AGI'
      default: return attr.substring(0, 3).toUpperCase()
    }
  }

  return (
    <Card className="overflow-hidden border-2 border-border/40 hover:border-primary/50 transition-all duration-300 bg-card group">
      <CardContent className="p-5 flex gap-5 items-start">
        
        {/* Bloco da Foto */}
        <div className="w-28 h-28 bg-muted rounded-md border border-border/60 flex flex-col items-center justify-center shrink-0 overflow-hidden relative">
          {character.image ? (
            <img 
              src={character.image} 
              alt={character.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-center p-2">
              <span className="block font-bold text-muted-foreground text-xs uppercase tracking-wider">Foto</span>
              <span className="text-[10px] text-muted-foreground/60">Artrópode</span>
            </div>
          )}

          <div className="absolute bottom-1 right-1 bg-background/90 border border-border px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-foreground">
            {character.hitPoints.max} PV
          </div>
        </div>

        {/* Bloco de Conteúdo */}
        <div className="flex flex-col flex-1 min-w-0 justify-between gap-3">
          <div>
            <h3 
              className="text-xl font-bold tracking-wide truncate text-foreground leading-tight"
              style={{ fontFamily: 'MedievalSharp, cursive' }}
            >
              {character.name || "Cavaleiro Sem Nome"}
            </h3>
            
            {/* Exibe apenas a Espécie */}
            <p className="text-xs font-medium text-muted-foreground mt-0.5 tracking-wide uppercase">
              {character.species || "Espécie não definida"}
            </p>

            {/* Grid de Atributos e Defesa */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {Object.entries(character.attributes).map(([key, value]) => (
                <div 
                  key={key} 
                  className={`flex items-center gap-1.5 bg-muted/50 border px-2 py-0.5 rounded text-[11px] font-mono font-medium transition-colors
                    ${character.expertise === key ? 'border-amber-500/50 bg-amber-500/10' : 'border-border/60'}`}
                  title={`${key.toUpperCase()} ${character.expertise === key ? '(Expertise +1)' : ''}`}
                >
                  {getDiceIcon(key)}
                  <span className="text-[10px] font-sans font-bold text-muted-foreground">{getAttrLabel(key)}</span>
                  <span className="font-bold text-foreground">{value}</span>
                  {character.expertise === key && <span className="text-amber-500 font-bold text-[10px]">+1</span>}
                </div>
              ))}

              <div className="flex items-center gap-1.5 bg-muted/80 border border-border/80 px-2 py-0.5 rounded text-[11px] font-mono font-bold">
                <Shield className="size-3.5 text-foreground/70" />
                <span className="text-[10px] font-sans font-bold text-muted-foreground">DEF</span>
                <span className="text-foreground">{character.defenses}</span>
              </div>
            </div>
          </div>

          {/* Botão de Acesso */}
          <div className="flex justify-end w-full">
            <Button 
              size="sm" 
              variant="outline"
              className="h-8 px-4 font-bold uppercase tracking-wider text-xs border-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onAccess(character.id)}
            >
              Acessar
            </Button>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}