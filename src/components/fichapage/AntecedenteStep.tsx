import { useState } from "react"
import antecedentData from "@/data/antecedent.json" 
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, BookOpen, Dices, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DadosAntecedente {
  background: string 
}

interface Props {
  onNext: (dados: DadosAntecedente) => void
  onBack: () => void
}

type CategoriaChamado = "antes" | "entao" | "busca"

export function AntecedenteStep({ onNext, onBack }: Props) {
  const [antes, setAntes] = useState<string>("")
  const [entao, setEntao] = useState<string>("")
  const [busca, setBusca] = useState<string>("")

  const [dadosResultados, setDadosResultados] = useState<Record<CategoriaChamado, [number, number] | null>>({
    antes: null,
    entao: null,
    busca: null,
  })

  const [isRolling, setIsRolling] = useState(false)

  const tabela = antecedentData.chamadoParaACavalaria

  const rolarNaTabela = (categoria: CategoriaChamado): { texto: string; dados: [number, number] } => {
    const d1 = Math.floor(Math.random() * 6) + 1
    const d2 = Math.floor(Math.random() * 6) + 1
    const chave = `${d1}_${d2}` as keyof typeof tabela.antes
    
    return {
      texto: tabela[categoria][chave] || "Desconhecido",
      dados: [d1, d2],
    }
  }

  const handleRolarHistorico = () => {
    if (isRolling) return
    setIsRolling(true)

    let ciclos = 0
    const intervalo = setInterval(() => {
      const tempAntes = rolarNaTabela("antes")
      const tempEntao = rolarNaTabela("entao")
      const tempBusca = rolarNaTabela("busca")

      setAntes(tempAntes.texto)
      setEntao(tempEntao.texto)
      setBusca(tempBusca.texto)
      setDadosResultados({ antes: tempAntes.dados, entao: tempEntao.dados, busca: tempBusca.dados })
      
      ciclos++
      if (ciclos > 10) {
        clearInterval(intervalo)
        
        const finalAntes = rolarNaTabela("antes")
        const finalEntao = rolarNaTabela("entao")
        const finalBusca = rolarNaTabela("busca")

        setAntes(finalAntes.texto)
        setEntao(finalEntao.texto)
        setBusca(finalBusca.texto)
        setDadosResultados({ antes: finalAntes.dados, entao: finalEntao.dados, busca: finalBusca.dados })
        setIsRolling(false)
      }
    }, 80)
  }

  const handleConfirmar = () => {
    if (!antes || !entao || !busca) return
    
    const historicoCompleto = `Antes eu era ${antes}. Então, ${entao} Hoje, busco por ${busca}.`
    onNext({ background: historicoCompleto })
  }

  const tudoPronto = antes && entao && busca && !isRolling

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-stretch w-full max-w-5xl mx-auto">
      
      <div className="flex flex-col gap-5 h-full justify-between">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
              <BookOpen className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Etapa 3 de 4</p>
              <h1 className="text-xl font-bold text-foreground uppercase tracking-tight">O Chamado da Cavalaria</h1>
            </div>
          </div>

          <div className="text-sm text-muted-foreground bg-muted/30 border p-4 rounded-xl space-y-2 leading-relaxed">
            <p>Todo Cavaleiro carrega um fardo e uma aspiração. Role <strong>3 conjuntos de 2d6</strong> para ditar as suas origens nas Terras de Carapaça.</p>
          </div>

          <div className="border-2 border-amber-500/20 rounded-2xl bg-gradient-to-br from-amber-500/[0.02] to-transparent p-6 space-y-6 relative overflow-hidden min-h-[280px] flex flex-col justify-center">
            {antes ? (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400">Antes...</span>
                  <p className="text-base font-medium text-foreground pl-3 border-l-2 border-amber-500/40">
                    Eu era <span className="font-bold text-primary">{antes}</span>.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400">Então...</span>
                  <p className="text-base font-medium text-foreground pl-3 border-l-2 border-amber-500/40 italic">
                    "{entao}"
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400">Hoje, minha Busca é por...</span>
                  <p className="text-lg font-black text-amber-500 pl-3 border-l-2 border-amber-500 flex items-center gap-2">
                    <Sparkles className="size-4 fill-amber-500" /> {busca}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground/60 space-y-2">
                <Dices className="size-12 mx-auto stroke-[1.2] text-muted-foreground/40 animate-pulse" />
                <p className="text-xs max-w-[260px] mx-auto leading-normal">
                  Suas memórias ainda estão nubladas. Role os dados ao lado para descobrir seu destino.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-transparent lg:block hidden">
          <Button type="button" variant="ghost" size="sm" onClick={onBack} disabled={isRolling}>
            <ChevronLeft className="size-4" /> Voltar para Espécie
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-card border p-5 rounded-2xl shadow-sm justify-between h-full">
        <div className="space-y-5">
          <div className="text-center bg-muted/40 p-4 rounded-xl border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Mecânica do Destino (6d6 no Total)
            </h3>
            
            <Button
              type="button"
              size="lg"
              onClick={handleRolarHistorico}
              onClickCapture={handleRolarHistorico}
              disabled={isRolling}
              className={cn(
                "w-full h-14 font-black text-base uppercase gap-2 transition-all shadow-md",
                isRolling ? "bg-amber-500 hover:bg-amber-600 animate-pulse" : "bg-primary hover:scale-[1.02]"
              )}
            >
              <Dices className={cn("size-6", isRolling && "animate-spin")} />
              {isRolling ? "Sorteando Origens..." : "Rolar 3x 2d6"}
            </Button>
          </div>

          <div className="space-y-2.5">
            {([
              { id: "antes", label: "Dado do Passado (Antes)", color: "border-primary/20" },
              { id: "entao", label: "Dado da Virada (Então)", color: "border-purple-500/20" },
              { id: "busca", label: "Dado do Destino (Busca)", color: "border-amber-500/20" }
            ] as const).map((cat) => {
              const res = dadosResultados[cat.id]
              return (
                <div key={cat.id} className={cn("flex items-center justify-between p-3 rounded-xl border bg-background/50", cat.color)}>
                  <span className="text-xs font-semibold text-muted-foreground">{cat.label}</span>
                  <div className="flex gap-1.5">
                    {res ? (
                      <>
                        <span className="size-7 flex items-center justify-center bg-muted border-2 font-black text-sm rounded-md shadow-sm">
                          {res[0]}
                        </span>
                        <span className="size-7 flex items-center justify-center bg-muted border-2 font-black text-sm rounded-md shadow-sm">
                          {res[1]}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs font-mono text-muted-foreground/30 px-3">——</span>
                    )}
                  </div>
                </div>
              )
            })}
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
            disabled={!tudoPronto}
            className="gap-1 font-bold ml-auto"
          >
            Avançar para Itens <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}