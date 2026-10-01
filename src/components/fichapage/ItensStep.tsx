import { useState } from "react"
import itemsData from "@/data/items.json"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, ShieldAlert, Dices, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DadosItens {
  specialItemName: string
  itemBonus: {
    defenses?: number
    presence?: number
    purposeMax?: number
    spellSlots?: number
    strength?: number
    agility?: number
    intellect?: number
    emblemSlot?: number
  }
}

interface Props {
  onNext: (dados: DadosItens) => void
  onBack: () => void
}

type ChaveDescritor = "1_da_arvore" | "2_da_pedra" | "3_da_besta" | "4_do_espirito"
type ChaveOpcao = "1" | "2" | "3" | "4"

interface ItemOpcao {
  nome: string
  damage?: string
  propriedades?: string[]
  bonus?: Record<string, number>
  movementBonus?: number
}

export function ItensStep({ onNext, onBack }: Props) {
  const [descritorNome, setDescritorNome] = useState<string>("")
  const [itemNome, setItemNome] = useState<string>("")
  const [damageInfo, setDamageInfo] = useState<string | null>(null)
  const [propriedades, setPropriedades] = useState<string[]>([])
  
  const [bonusAcumulados, setBonusAcumulados] = useState<DadosItens["itemBonus"]>({})

  const [dadosRolados, setDadosRolados] = useState<{
    descGrupo: number | null
    descOpcao: number | null
    itemGrupo: number | null
    itemOpcao: number | null
  }>({
    descGrupo: null,
    descOpcao: null,
    itemGrupo: null,
    itemOpcao: null,
  })

  const [isRolling, setIsRolling] = useState(false)

  const rolarMecanicaItens = () => {
    const d4DescGrupo = (Math.floor(Math.random() * 4) + 1).toString()
    const d4DescOpcao = (Math.floor(Math.random() * 4) + 1).toString() as ChaveOpcao
    
    const chavesDescritores: Record<string, ChaveDescritor> = {
      "1": "1_da_arvore",
      "2": "2_da_pedra",
      "3": "3_da_besta",
      "4": "4_do_espirito"
    }
    
    const grupoDescritor = itemsData.tabelas_descritores[chavesDescritores[d4DescGrupo]]
    const opcaoDescritor = grupoDescritor.opcoes[d4DescOpcao]

    const d4ItemGrupo = (Math.floor(Math.random() * 4) + 1).toString() as ChaveOpcao
    const d4ItemOpcao = (Math.floor(Math.random() * 4) + 1).toString() as ChaveOpcao

    const grupoItem = itemsData.tabelas_itens[d4ItemGrupo]
    const opcaoItem = grupoItem.opcoes[d4ItemOpcao] as ItemOpcao

    const novosBonus: DadosItens["itemBonus"] = {}
    
    const somarBonus = (objetoBonus: Record<string, number>) => {
      Object.entries(objetoBonus).forEach(([chave, valor]) => {
        const k = chave as keyof DadosItens["itemBonus"]
        novosBonus[k] = (novosBonus[k] || 0) + valor
      })
    }

    if (opcaoDescritor.bonus) somarBonus(opcaoDescritor.bonus)
    if (opcaoItem.bonus) somarBonus(opcaoItem.bonus)

    const dano = opcaoItem.damage || null
    const props = opcaoItem.propriedades || []

    return {
      descNome: opcaoDescritor.nome,
      itNome: opcaoItem.nome,
      bonus: novosBonus,
      dano,
      props,
      dados: {
        descGrupo: Number(d4DescGrupo),
        descOpcao: Number(d4DescOpcao),
        itemGrupo: Number(d4ItemGrupo),
        itemOpcao: Number(d4ItemOpcao)
      }
    }
  }

  const handleRolarTudo = () => {
    if (isRolling) return
    setIsRolling(true)

    let giros = 0
    const intervalo = setInterval(() => {
      const temp = rolarMecanicaItens()
      setDescritorNome(temp.descNome)
      setItemNome(temp.itNome)
      setBonusAcumulados(temp.bonus)
      setDamageInfo(temp.dano)
      setPropriedades(temp.props)
      setDadosRolados(temp.dados)

      giros++
      if (giros > 12) {
        clearInterval(intervalo)
        
        const final = rolarMecanicaItens()
        setDescritorNome(final.descNome)
        setItemNome(final.itNome)
        setBonusAcumulados(final.bonus)
        setDamageInfo(final.dano)
        setPropriedades(final.props)
        setDadosRolados(final.dados)
        setIsRolling(false)
      }
    }, 70)
  }

  const handleConfirmar = () => {
    if (!descritorNome || !itemNome) return
    
    const nomeCompleto = `${itemNome} de ${descritorNome}`
    
    onNext({
      specialItemName: nomeCompleto,
      itemBonus: bonusAcumulados
    })
  }

  const traduzirAtributo = (chave: string) => {
    const dicionario: Record<string, string> = {
      defenses: "Defesa",
      presence: "Presença",
      purposeMax: "Propósito Máximo",
      spellSlots: "Espaço de Magia",
      strength: "Força",
      agility: "Agilidade",
      intellect: "Intelecto",
      emblemSlot: "Espaço de Emblema"
    }
    return dicionario[chave] || chave
  }

  const itemPronto = descritorNome && itemNome && !isRolling

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-stretch w-full max-w-5xl mx-auto">
      
      <div className="flex flex-col gap-5 h-full justify-between">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
              <ShieldAlert className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Etapa 4 de 4</p>
              <h1 className="text-xl font-bold text-foreground uppercase tracking-tight">Arsenal de Relíquias</h1>
            </div>
          </div>

          <div className="text-sm text-muted-foreground bg-muted/30 border p-4 rounded-xl space-y-2 leading-relaxed">
            <p>Todo Cavaleiro inicia sua jornada portando exatamente <strong>1 Item Especial</strong> forjado a partir dos elementos do mundo.</p>
          </div>

          <div className="border-2 border-emerald-500/20 rounded-2xl bg-gradient-to-br from-emerald-500/[0.02] to-transparent p-6 min-h-[280px] flex flex-col justify-center items-center text-center relative overflow-hidden">
            {itemNome ? (
              <div className="space-y-4 animate-in scale-in duration-200 w-full">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase flex items-center justify-center gap-1">
                    <Sparkles className="size-3.5 fill-emerald-500 text-emerald-500" /> Item Equipado
                  </span>
                  <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">
                    {itemNome} <span className="text-emerald-500 font-medium">de</span> {descritorNome}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center">
                  {damageInfo && (
                    <span className="bg-primary/10 text-primary font-mono font-bold px-2.5 py-0.5 rounded-md text-xs border border-primary/20">
                      Dano: {damageInfo}
                    </span>
                  )}
                  {propriedades.map((prop, index) => (
                    <span key={index} className="bg-muted border font-semibold px-2.5 py-0.5 rounded-md text-xs text-muted-foreground uppercase tracking-wider">
                      {prop}
                    </span>
                  ))}
                </div>

                <div className="pt-2 max-w-xs mx-auto w-full">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-2">Efeitos Passivos na Ficha</p>
                  <div className="flex flex-col gap-1">
                    {Object.entries(bonusAcumulados).map(([stat, valor]) => (
                      <div key={stat} className="flex justify-between items-center bg-background border px-3 py-1.5 rounded-lg text-xs">
                        <span className="text-muted-foreground font-medium">{traduzirAtributo(stat)}</span>
                        <span className="font-bold text-emerald-500">+{valor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-muted-foreground/60 p-6">
                <Dices className="size-12 mx-auto stroke-[1.2] text-muted-foreground/40 animate-pulse" />
                <p className="text-xs max-w-[240px] mx-auto leading-normal">
                  Sua arma ou relíquia ainda não foi forjada. Role a combinação de d4 ao lado.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-transparent lg:block hidden">
          <Button type="button" variant="ghost" size="sm" onClick={onBack} disabled={isRolling}>
            <ChevronLeft className="size-4" /> Voltar para Antecedente
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-card border p-5 rounded-2xl shadow-sm justify-between h-full">
        <div className="space-y-5">
          <div className="bg-muted/40 p-4 rounded-xl border text-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Mesa de Forja (4 dados d4)
            </h3>
            
            <Button
              type="button"
              size="lg"
              onClick={handleRolarTudo}
              disabled={isRolling}
              className={cn(
                "w-full h-14 font-black text-base uppercase gap-2 transition-all shadow-md",
                isRolling ? "bg-emerald-500 hover:bg-emerald-600 animate-pulse" : "bg-primary hover:scale-[1.02]"
              )}
            >
              <Dices className={cn("size-6", isRolling && "animate-spin")} />
              {isRolling ? "Forjando Relíquia..." : "Rolar d4s de Item"}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 border rounded-xl bg-background/50 text-center space-y-1.5">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Grupo Descritor</p>
              <span className="h-9 flex items-center justify-center max-w-[60px] mx-auto bg-muted border-2 font-black text-sm rounded-md shadow-sm">
                {dadosRolados.descGrupo || "—"}
              </span>
            </div>

            <div className="p-3 border rounded-xl bg-background/50 text-center space-y-1.5">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Opção Descritor</p>
              <span className="h-9 flex items-center justify-center max-w-[60px] mx-auto bg-muted border-2 font-black text-sm rounded-md shadow-sm">
                {dadosRolados.descOpcao || "—"}
              </span>
            </div>

            <div className="p-3 border rounded-xl bg-background/50 text-center space-y-1.5">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Grupo do Item</p>
              <span className="h-9 flex items-center justify-center max-w-[60px] mx-auto bg-muted border-2 font-black text-sm rounded-md shadow-sm">
                {dadosRolados.itemGrupo || "—"}
              </span>
            </div>

            <div className="p-3 border rounded-xl bg-background/50 text-center space-y-1.5">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Opção do Item</p>
              <span className="h-9 flex items-center justify-center max-w-[60px] mx-auto bg-muted border-2 font-black text-sm rounded-md shadow-sm">
                {dadosRolados.itemOpcao || "—"}
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
            disabled={!itemPronto}
            className="gap-1 font-bold ml-auto bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Concluir Cavaleiro <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}