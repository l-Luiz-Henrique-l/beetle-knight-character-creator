import { cn } from "@/lib/utils"
import { Check, ChevronRight } from "lucide-react"

interface CreationStepperProps {
  currentStep: number
}

const PASSOS_CRIACAO = [
  { id: 1, label: "Atributos" },
  { id: 2, label: "Expertise" }, 
  { id: 3, label: "Raça" },
  { id: 4, label: "Chamado" },
  { id: 5, label: "Item Especial" },
  { id: 6, label: "Emblemas" },
]

export function CreationStepper({ currentStep }: CreationStepperProps) {
  return (
    <div className="w-full bg-muted/20 border border-border/60 rounded-xl p-4 mb-6">
      <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-2 md:gap-x-3">
        {PASSOS_CRIACAO.map((passo, index) => {
          const isConcluido = currentStep > passo.id
          const isAtivo = currentStep === passo.id

          return (
            <div key={passo.id} className="flex items-center gap-2 md:gap-3">
              <div
                className={cn(
                  "flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all duration-300 font-mono",
                  isAtivo && "bg-primary text-primary-foreground border-primary shadow-sm scale-105",
                  isConcluido && "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
                  !isAtivo && !isConcluido && "bg-background text-muted-foreground border-border"
                )}
              >
                {isConcluido ? (
                  <Check className="size-3 stroke-[3]" />
                ) : (
                  <span>{passo.id}.</span>
                )}
                <span className="font-sans font-bold uppercase tracking-wider text-[10px] md:text-xs">
                  {passo.label}
                </span>
              </div>

              {index < PASSOS_CRIACAO.length - 1 && (
                <ChevronRight className="size-3.5 text-muted-foreground/50 shrink-0" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}