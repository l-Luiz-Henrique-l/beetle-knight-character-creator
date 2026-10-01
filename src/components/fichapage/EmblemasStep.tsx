import { useState } from "react"
import emblemsData from "@/data/emblems.json"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, ShieldAlert, Dices, Plus, Minus, Sparkles } from "lucide-react"

export interface DadosEmblemas {
  emblems: string[]
  emblemSlotsMax: number
  spellSlotsMax: number
}

interface Props {
  initialEmblemSlots: number
  initialSpellSlots: number
  onNext: (dados: DadosEmblemas) => void
  onBack: () => void
}

interface Emblem {
  id: string
  name: string
  actions: number
  isPassive: boolean
  range?: string
  description: string
}

interface EmblemCategory {
  id: string
  name: string
  emblems: Emblem[]
}

export function EmblemaStep({ initialEmblemSlots, initialSpellSlots, onNext, onBack }: Props) {
  const [emblemSlots, setEmblemSlots] = useState<number>(initialEmblemSlots)
  const [spellSlots, setSpellSlots] = useState<number>(initialSpellSlots)
  
  const [selectedEmblems, setSelectedEmblems] = useState<Emblem[]>([])
  const [isRolling, setIsRolling] = useState(false)
  const [dadosRolados, setDadosRolados] = useState<{ grupo: number | null; emblema: number | null }>({
    grupo: null,
    emblema: null
  })

  const rolarEmblemaAleatorio = (): { categoria: string; emblem: Emblem; d6: number; d8: number } => {
    const categorias = emblemsData.categories as EmblemCategory[]
    
    const d6GrupoIndex = Math.floor(Math.random() * Math.min(categorias.length, 6))
    const categoriaSorteada = categorias[d6GrupoIndex]
    
    const d8EmblemIndex = Math.floor(Math.random() * Math.min(categoriaSorteada.emblems.length, 8))
    const emblemaSorteado = categoriaSorteada.emblems[d8EmblemIndex]

    return {
      categoria: categoriaSorteada.name,
      emblem: emblemaSorteado,
      d6: d6GrupoIndex + 1,
      d8: d8EmblemIndex + 1
    }
  }

  const handleRolarEmblema = () => {
    if (isRolling) return
    setIsRolling(true)

    let giros = 0
    const intervalo = setInterval(() => {
      const temp = rolarEmblemaAleatorio()
      setDadosRolados({ grupo: temp.d6, emblema: temp.d8 })
      
      giros++
      if (giros > 10) {
        clearInterval(intervalo)
        const final = rolarEmblemaAleatorio()
        
        setDadosRolados({ grupo: final.d6, emblema: final.d8 })
        
        setSelectedEmblems((prev) => {
          if (prev.some((e) => e.id === final.emblem.id)) return prev
          return [...prev, final.emblem]
        })
        setIsRolling(false)
      }
    }, 60)
  }

  const removerEmblema = (id: string) => {
    setSelectedEmblems((prev) => prev.filter((e) => e.id !== id))
  }

  const handleConfirmar = () => {
    onNext({
      emblems: selectedEmblems.map((e) => e.name),
      emblemSlotsMax: emblemSlots,
      spellSlotsMax: spellSlots
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-stretch w-full max-w-5xl mx-auto">
      
      <div className="flex flex-col gap-5 h-full justify-between">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0">
              <ShieldAlert className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Etapa 5 de 5</p>
              <h1 className="text-xl font-bold text-foreground uppercase tracking-tight">Sintonização de Emblemas</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/20 border p-4 rounded-xl">
            <div className="flex items-center justify-between bg-background p-3 rounded-lg border">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-foreground uppercase tracking-tight">Espaços de Emblema</p>
                <p className="text-[10px] text-muted-foreground">Capacidade total carregada</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" className="size-7" onClick={() => setEmblemSlots(Math.max(0, emblemSlots - 1))}>
                  <Minus className="size-3" />
                </Button>
                <span className="font-mono font-bold text-sm w-5 text-center">{emblemSlots}</span>
                <Button size="icon" variant="outline" className="size-7" onClick={() => setEmblemSlots(emblemSlots + 1)}>
                  <Plus className="size-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between bg-background p-3 rounded-lg border">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-foreground uppercase tracking-tight">Espaços de Magia</p>
                <p className="text-[10px] text-muted-foreground">Emblemas ativos simultâneos</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" className="size-7" onClick={() => setSpellSlots(Math.max(0, spellSlots - 1))}>
                  <Minus className="size-3" />
                </Button>
                <span className="font-mono font-bold text-sm w-5 text-center">{spellSlots}</span>
                <Button size="icon" variant="outline" className="size-7" onClick={() => setSpellSlots(spellSlots + 1)}>
                  <Plus className="size-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Seus Emblemas Guardados ({selectedEmblems.length})
            </h3>
            
            {selectedEmblems.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 max-h-[260px] overflow-y-auto pr-1">
                {selectedEmblems.map((emb) => (
                  <div key={emb.id} className="p-3 border rounded-xl bg-card flex items-start justify-between gap-4 animate-in fade-in duration-150">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm text-foreground">{emb.name}</h4>
                        <span className="text-[10px] bg-primary/10 text-primary font-mono font-semibold px-1.5 py-0.2 rounded">
                          {emb.isPassive ? "Passivo" : `${"♦".repeat(emb.actions)} Ação`}
                        </span>
                        {emb.range && <span className="text-[10px] text-muted-foreground">Alcance: {emb.range}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground leading-normal">{emb.description}</p>
                    </div>
                    <Button variant="ghost" size="xs" className="text-destructive hover:text-destructive hover:bg-destructive/10 text-[10px] uppercase font-bold" onClick={() => removerEmblema(emb.id)}>
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-xl p-8 text-center text-xs text-muted-foreground/60">
                Nenhum emblema guardado na algibeira. Role os dados ao lado para manifestar poder.
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-transparent lg:block hidden">
          <Button type="button" variant="ghost" size="sm" onClick={onBack} disabled={isRolling}>
            <ChevronLeft className="size-4" /> Voltar para Arsenal
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-card border p-5 rounded-2xl shadow-sm justify-between h-full">
        <div className="space-y-5">
          <div className="bg-indigo-500/[0.02] border border-indigo-500/10 p-4 rounded-xl text-center space-y-3">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-indigo-500 uppercase flex items-center justify-center gap-1">
                <Sparkles className="size-3.5 fill-indigo-500" /> Manifestação de Relíquias
              </span>
              <p className="text-xs text-muted-foreground mt-1">Todos os Cavaleiros começam com pelo menos 2 Emblemas à escolha ou rolados.</p>
            </div>
            
            <Button
              type="button"
              size="lg"
              onClick={handleRolarEmblema}
              disabled={isRolling}
              className="w-full h-12 font-black text-sm uppercase gap-2 bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md"
            >
              <Dices className="size-4" />
              {isRolling ? "Invocando Emblema..." : "Rolar d6 + d8"}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 border rounded-xl bg-background/50 text-center space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Grupo (d6)</p>
              <span className="h-10 flex items-center justify-center max-w-[50px] mx-auto bg-muted border-2 font-mono font-black text-base rounded-lg">
                {dadosRolados.grupo || "—"}
              </span>
            </div>

            <div className="p-3 border rounded-xl bg-background/50 text-center space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Emblema (d8)</p>
              <span className="h-10 flex items-center justify-center max-w-[50px] mx-auto bg-muted border-2 font-mono font-black text-base rounded-lg">
                {dadosRolados.emblema || "—"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t mt-4">
          <Button type="button" variant="ghost" size="sm" onClick={onBack} disabled={isRolling} className="lg:hidden">
            <ChevronLeft className="size-4" /> Voltar
          </Button>
          <div className="hidden lg:block" />

          <Button
            type="button"
            onClick={handleConfirmar}
            disabled={isRolling}
            className="gap-1 font-bold ml-auto bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Concluir Ficha <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}