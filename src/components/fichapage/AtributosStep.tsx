import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight, RotateCcw, Shield, ShieldAlert, Star } from "lucide-react"

const ATRIBUTOS = [
  { key: "strength", label: "Força", desc: "Levantar peso, escalar, lutar..." },
  { key: "intellect", label: "Intelecto", desc: "Intuição, investigação, conjuração..." },
  { key: "presence", label: "Presença", desc: "Persuadir, atuar, fazer amizade..." },
  { key: "agility", label: "Agilidade", desc: "Correr, pular, esgueirar-se..." },
]

interface DadosAtributos {
  attributes: {
    strength: string
    intellect: string
    presence: string
    agility: string
  }
  defenses: string
  expertise: string
}

interface Props {
  onNext: (dados: DadosAtributos) => void
}

const DADOS_INICIAIS = ["d4", "d6", "d6", "d8"]

type Atribuicao = Record<string, string | null>
type Fase = "alocar" | "expertise"

interface DadosAtributos {
  attributes: {
    strength: string
    intellect: string
    presence: string
    agility: string
  }
  defenses: string
  expertise: string
}

interface Props {
  onNext: (dados: DadosAtributos) => void
}

export function AtributosStep({ onNext }: Props) {
  const [atribuicao, setAtribuicao] = useState<Atribuicao>(() =>
    Object.fromEntries(ATRIBUTOS.map((a) => [a.key, null])),
  )
  const [dadoSelecionado, setDadoSelecionado] = useState<string | null>(null)
  const [indiceSelecionadoAtual, setIndiceSelecionadoAtual] = useState<number | null>(null)
  const [indicesSelecionados, setIndicesSelecionados] = useState<Set<number>>(new Set())
  
  const [fase, setFase] = useState<Fase>("alocar")
  const [expertiseSelecionada, setExpertiseSelecionada] = useState<string | null>(null)

  const dadosDisponiveis = DADOS_INICIAIS.filter((_, i) => !indicesSelecionados.has(i))
  const todosAlocados = dadosDisponiveis.length === 0

  const handleSelecionarDado = (dado: string, indexOriginal: number) => {
    if (indiceSelecionadoAtual === indexOriginal) {
      setDadoSelecionado(null)
      setIndiceSelecionadoAtual(null)
    } else {
      setDadoSelecionado(dado)
      setIndiceSelecionadoAtual(indexOriginal)
    }
  }

  const handleClicarCard = (key: string) => {
    if (fase === "expertise") {
      setExpertiseSelecionada(key)
      return
    }
    if (dadoSelecionado === null || indiceSelecionadoAtual === null) return

    const novoIndices = new Set(indicesSelecionados)
    novoIndices.add(indiceSelecionadoAtual)
    
    setIndicesSelecionados(novoIndices)
    setAtribuicao((prev) => ({ ...prev, [key]: dadoSelecionado }))
    setDadoSelecionado(null)
    setIndiceSelecionadoAtual(null)
  }

  const handleReset = () => {
    setAtribuicao(Object.fromEntries(ATRIBUTOS.map((a) => [a.key, null])))
    setDadoSelecionado(null)
    setIndiceSelecionadoAtual(null)
    setIndicesSelecionados(new Set())
    setFase("alocar")
    setExpertiseSelecionada(null)
  }

  const calcularDefesaInicial = (): string => {
    const dadoForca = atribuicao["strength"]
    const dadoAgilidade = atribuicao["agility"]
    
    if (!dadoForca && !dadoAgilidade) return "—"
    if (!dadoForca) return dadoAgilidade!
    if (!dadoAgilidade) return dadoForca
    
    return dadoForca > dadoAgilidade ? dadoForca : dadoAgilidade
  }

const handleAvancarFase = () => {
    if (fase === "alocar" && todosAlocados) {
      setFase("expertise")
    } else if (fase === "expertise" && expertiseSelecionada) {
      onNext({
        attributes: {
          strength: atribuicao.strength as string,
          intellect: atribuicao.intellect as string,
          presence: atribuicao.presence as string,
          agility: atribuicao.agility as string,
        },
        defenses: calcularDefesaInicial(),
        expertise: expertiseSelecionada,
      })
    }
  }

  const podeAvancar =
    (fase === "alocar" && todosAlocados) ||
    (fase === "expertise" && expertiseSelecionada !== null)

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "text-xs font-bold px-3 py-1 rounded-full border transition-all",
            fase === "alocar"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-muted text-muted-foreground border-border",
          )}
        >
          1. Distribuir Dados
        </span>
        <ChevronRight className="size-4 text-muted-foreground" />
        <span
          className={cn(
            "text-xs font-bold px-3 py-1 rounded-full border transition-all",
            fase === "expertise"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-muted text-muted-foreground border-border",
          )}
        >
          2. Escolher Expertise (+1)
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ATRIBUTOS.map(({ key, label, desc }) => {
          const dado = atribuicao[key]
          const isExpertise = expertiseSelecionada === key
          const isSelecionado = dadoSelecionado !== null && fase === "alocar"

          return (
            <button
              key={key}
              onClick={() => handleClicarCard(key)}
              disabled={fase === "alocar" ? dadoSelecionado === null : dado === null}
              className={cn(
                "group relative flex flex-col rounded-xl border-2 overflow-hidden text-left bg-card transition-all duration-200",
                dado === null ? "border-border" : "border-muted-foreground/30",
                isSelecionado && dado === null && "border-primary/50 hover:border-primary hover:scale-105",
                fase === "expertise" && "hover:border-amber-500 hover:scale-105",
                isExpertise && "border-amber-500 shadow-[0_0_16px_2px_rgba(245,158,11,0.2)]",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              )}
            >
              <div className="bg-muted/50 px-3 py-1.5 border-b border-border text-center">
                <span className="text-xs font-black tracking-wider uppercase text-foreground">
                  {label}
                </span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center py-6 px-3 text-center gap-1">
                <span className={cn(
                  "text-3xl font-black tracking-tight",
                  dado ? "text-primary" : "text-muted-foreground/20"
                )}>
                  {dado ?? "—"}
                </span>
                <p className="text-[10px] text-muted-foreground leading-tight line-clamp-2">
                  {desc}
                </p>
              </div>

              {isExpertise && (
                <div className="absolute top-10 right-2 flex items-center gap-0.5 text-amber-500 bg-amber-500/10 px-1 py-0.5 rounded text-[10px] font-bold border border-amber-500/20">
                  <Star className="size-3 fill-amber-500" /> +1
                </div>
              )}
            </button>
          )
        })}
      </div>

      {fase === "alocar" ? (
        <div className="bg-muted/30 border border-border p-4 rounded-xl flex flex-col gap-3">
          <div>
            <h4 className="text-sm font-bold text-foreground">Dados Disponíveis</h4>
            <p className="text-xs text-muted-foreground">Selecione um dado abaixo e clique no atributo desejado.</p>
          </div>
          <div className="flex gap-3">
            {DADOS_INICIAIS.map((dado, index) => {
              const usado = indicesSelecionados.has(index)
              const ativo = indiceSelecionadoAtual === index
              return (
                <button
                  key={index}
                  disabled={usado}
                  onClick={() => handleSelecionarDado(dado, index)}
                  className={cn(
                    "px-5 py-2.5 rounded-lg border-2 font-black text-sm transition-all",
                    usado
                      ? "opacity-20 border-border bg-muted text-muted-foreground line-through cursor-not-allowed"
                      : ativo
                        ? "border-primary bg-primary text-primary-foreground scale-110 shadow-md"
                        : "border-border bg-card text-foreground hover:border-primary/40 hover:scale-105 cursor-pointer"
                  )}
                >
                  {dado}
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl flex flex-col gap-1">
          <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <Star className="size-4 fill-amber-500" /> Definir Expertise
          </h4>
          <p className="text-xs text-muted-foreground">
            Escolha um atributo. Você receberá um modificador permanente de <strong>+1</strong> em rolagens feitas com ele (incluindo ataques e magias).
          </p>
        </div>
      )}

      <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Shield className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Defesa Inicial Calculada</h4>
            <p className="text-xs text-muted-foreground">Baseada no maior dado entre sua Força e sua Agilidade.</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-primary border-2 border-dashed border-primary/20 px-4 py-1 rounded-lg bg-primary/5">
            {calcularDefesaInicial()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button variant="ghost" size="sm" onClick={handleReset} className="gap-2 text-muted-foreground">
          <RotateCcw className="size-3.5" />
          Reiniciar Atributos
        </Button>

        <Button onClick={handleAvancarFase} disabled={!podeAvancar} className="gap-2">
          {fase === "alocar" ? "Definir Expertise" : "Ir para Escolha de Raça"}
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}