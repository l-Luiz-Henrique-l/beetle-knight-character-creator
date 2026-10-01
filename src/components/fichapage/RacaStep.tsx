import { useState, useEffect } from "react"
import systemData from "@/data/system-data.json"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronRight, ChevronLeft, Dna, Dices, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SystemAbility {
  name: string
  description: string
}

interface SystemSpecies {
  id: string
  name: string
  attributeAdvantage: string
  movement?: {
    rastejo?: number
    voo?: number
    escavacao?: number
    nado?: number
  }
  specialAbilities?: SystemAbility[]
}

const TABELA_1D20 = [
  "percevejo-assassino", "abelha", "besouro", "besouro-bombardeiro", 
  "formiga-carpinteira", "grilo", "barata-dubia", "formiga-de-fogo", 
  "lesma", "opiliao", "mutuca", "mosca-impostora", "aranha-saltadora", 
  "vagalume", "borboleta-monarca", "mariposa", "caramujo-zebra", 
  "aranha-tecela", "tatu-bolinha-de-jardim", "escaravelho"
]

export interface DadosRaca {
  speciesId: string
  speciesName: string
  attributeAdvantage: "strength" | "intellect" | "presence" | "agility"
  movement: {
    rastejo: number
    voo: number
    escavacao: number
    nado: number
  }
}

interface Props {
  onNext: (dados: DadosRaca) => void
  onBack: () => void
}

export function RacaStep({ onNext, onBack }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>("")
  const [isRolling, setIsRolling] = useState(false)
  const [wikiImageUrl, setWikiImageUrl] = useState<string | null>(null)
  const [isLoadingImage, setIsLoadingImage] = useState(false)

  const listaEspecies = (systemData.species || []) as SystemSpecies[]
  const racaAtual = listaEspecies.find((s) => s.id === selectedId)

  // Hook para buscar a imagem da Wikipédia de forma dinâmica e segura
  useEffect(() => {
    if (!racaAtual) {
      setWikiImageUrl(null)
      return
    }

    const fetchWikiImage = async () => {
      setIsLoadingImage(true)
      try {
        // Usamos o nome da espécie para pesquisar na Wikipédia em português
        const termoBusca = encodeURIComponent(racaAtual.name)
        const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${termoBusca}`
        
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          // Se a página possuir uma imagem principal (thumbnail), nós a salvamos
          if (data.thumbnail && data.thumbnail.source) {
            setWikiImageUrl(data.thumbnail.source)
          } else {
            setWikiImageUrl(null)
          }
        } else {
          setWikiImageUrl(null)
        }
      } catch (error) {
        console.error("Erro ao buscar imagem da Wiki:", error)
        setWikiImageUrl(null)
      } finally {
        setIsLoadingImage(false)
      }
    }

    fetchWikiImage()
  }, [selectedId, racaAtual])

  const handleRolarDado = () => {
    if (isRolling) return
    setIsRolling(true)

    let giros = 0
    const intervalo = setInterval(() => {
      const indexAleatorio = Math.floor(Math.random() * TABELA_1D20.length)
      setSelectedId(TABELA_1D20[indexAleatorio])
      giros++

      if (giros > 12) {
        clearInterval(intervalo)
        const resultadoFinal = Math.floor(Math.random() * 20)
        setSelectedId(TABELA_1D20[resultadoFinal])
        setIsRolling(false)
      }
    }, 70)
  }

  const handleConfirmar = () => {
    if (!racaAtual) return

    let vantagemFinal = racaAtual.attributeAdvantage
    if (vantagemFinal === "intelligence") {
      vantagemFinal = "intellect"
    }

    onNext({
      speciesId: racaAtual.id,
      speciesName: racaAtual.name,
      attributeAdvantage: vantagemFinal as DadosRaca["attributeAdvantage"],
      movement: {
        rastejo: racaAtual.movement?.rastejo || 0,
        voo: racaAtual.movement?.voo || 0,
        escavacao: racaAtual.movement?.escavacao || 0,
        nado: racaAtual.movement?.nado || 0,
      },
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-stretch w-full max-w-5xl mx-auto">
      
      {/* LADO ESQUERDO: Contexto Narrativo + Imagem da Wiki */}
      <div className="flex flex-col gap-5 h-full">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary shrink-0">
            <Dna className="size-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Etapa 2 de 4</p>
            <h1 className="text-xl font-bold text-foreground uppercase tracking-tight">Espécie Insetoide</h1>
          </div>
        </div>

        <div className="text-sm text-muted-foreground bg-muted/30 border p-4 rounded-xl space-y-2 leading-relaxed">
          <p>A sua <strong>Espécie</strong> dita sua armadura natural, biologia e fisiologia pelas terras de Beetle Knight.</p>
          <p>Ela concede uma <strong>Vantagem de Atributo</strong> fixa e formas especializadas de deslocamento, como voo, rastejo ou escavação.</p>
        </div>

        {/* Card Dinâmico de Imagem (Preenche o espaço vertical perfeitamente) */}
        <div className="flex-1 min-h-[260px] relative border-2 border-dashed border-muted-foreground/20 rounded-2xl overflow-hidden bg-muted/10 flex flex-col items-center justify-center p-4 text-center">
          {isLoadingImage ? (
            <div className="space-y-2 animate-pulse flex flex-col items-center">
              <div className="size-10 rounded-full bg-muted-foreground/20 animate-spin border-2 border-primary border-t-transparent" />
              <p className="text-xs text-muted-foreground">Consultando arquivos biológicos...</p>
            </div>
          ) : wikiImageUrl ? (
            <div className="absolute inset-0 w-full h-full animate-in fade-in duration-300">
              <img 
                src={wikiImageUrl} 
                alt={racaAtual?.name || "Inseto"} 
                className="w-full h-full object-cover object-center filter dark:brightness-90 select-none"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-12 text-left">
                <p className="text-xs font-semibold text-white/90">Registro Visual: {racaAtual?.name}</p>
                <p className="text-[10px] text-white/60">Fonte: Wikipédia (Licença Creative Commons)</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-muted-foreground/60 p-6">
              <ImageIcon className="size-10 mx-auto stroke-[1.5]" />
              <p className="text-xs max-w-[240px] mx-auto leading-normal">
                {racaAtual 
                  ? `Nenhuma imagem encontrada para "${racaAtual.name}"`
                  : "Selecione uma espécie para visualizar sua anatomia real."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* LADO DIREITO: Seleção Mecânica e Rolagem */}
      <div className="flex flex-col gap-5 bg-card border p-5 rounded-2xl shadow-sm h-full justify-between">
        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Selecione ou Role 1d20
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Select onValueChange={(v) => setSelectedId(v)} value={selectedId || undefined} disabled={isRolling}>
                  <SelectTrigger className="w-full h-12 bg-background font-medium">
                    <SelectValue placeholder="Escolha uma Linhagem..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[280px]">
                    {listaEspecies.map((especie) => (
                      <SelectItem key={especie.id} value={especie.id}>
                        {especie.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleRolarDado}
                disabled={isRolling}
                className={cn(
                  "h-12 px-4 gap-2 font-bold border-2 transition-all shrink-0",
                  isRolling && "animate-pulse border-amber-500 text-amber-500"
                )}
              >
                <Dices className={cn("size-5", isRolling && "animate-spin")} />
                {isRolling ? "Rolando..." : "1d20"}
              </Button>
            </div>
          </div>

          {/* Informações da Espécie Sorteada/Selecionada */}
          {racaAtual && (
            <div className="p-4 rounded-xl bg-muted/40 border flex flex-col gap-3 animate-in fade-in duration-200">
              <div className="text-center">
                <h2 className="text-lg font-black text-foreground uppercase tracking-tight">{racaAtual.name}</h2>
                <p className="text-xs font-bold text-amber-500 mt-0.5 uppercase">
                  Vantagem em: {racaAtual.attributeAdvantage === "intelligence" ? "INTELECTO" : racaAtual.attributeAdvantage.toUpperCase()}
                </p>
              </div>

              {/* Capacidades de Movimento */}
              <div className="grid grid-cols-2 gap-2 text-center">
                {Object.entries(racaAtual.movement || {}).map(([tipo, valor]) => (
                  Number(valor) > 0 && (
                    <div key={tipo} className="bg-background border rounded-lg p-2">
                      <p className="text-[10px] uppercase text-muted-foreground font-bold">{tipo}</p>
                      <p className="text-sm font-black text-primary">{valor}m</p>
                    </div>
                  )
                ))}
              </div>

              {/* Habilidades Especiais da Raça */}
              {racaAtual.specialAbilities?.map((hab, idx) => (
                <div key={idx} className="bg-background p-3 rounded-lg border text-xs">
                  <p className="font-bold text-foreground mb-1 flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {hab.name}
                  </p>
                  <p className="text-muted-foreground leading-normal">{hab.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodapé de Ações */}
        <div className="flex justify-between pt-4 border-t mt-4">
          <Button type="button" variant="ghost" size="sm" onClick={onBack} disabled={isRolling}>
            <ChevronLeft className="size-4" /> Voltar
          </Button>

          <Button
            type="button"
            onClick={handleConfirmar}
            disabled={!selectedId || isRolling}
            className="gap-1 font-bold"
          >
            Avançar para o Chamado <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}