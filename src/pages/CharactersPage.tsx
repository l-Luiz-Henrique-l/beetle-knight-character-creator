import { CharacterActions } from '@/components/characters/CharacterActions'
import { CharacterGrid } from '@/components/characters/CharacterGrid'
import { CharacterSheet } from '@/components/characters/CharacterSheet'
import { EmptyCharacters } from '@/components/characters/EmptyCharacter'
import { AtributosStep } from '@/components/fichapage/AtributosStep'
import { RacaStep, type DadosRaca } from '@/components/fichapage/RacaStep'
import { AntecedenteStep, type DadosAntecedente } from '@/components/fichapage/AntecedenteStep'
import { ItensStep, type DadosItens } from '@/components/fichapage/ItensStep'
import { EmblemaStep, type DadosEmblemas } from '@/components/fichapage/EmblemasStep'
import type { Character } from '@/types/character'
import { useState } from 'react'
import { CreationStepper } from '@/components/shared/creationstep'

function CharacterPage() {
    
  const [characters, setCharacters] = useState<Character[]>([])
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null)
  
  const [isCreating, setIsCreating] = useState(false)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [novoCavaleiro, setNovoCavaleiro] = useState<Partial<Character>>({})

  const handleCreateNew = () => {
    setNovoCavaleiro({})
    setCurrentStep(1)
    setIsCreating(true)
  }

  const handleToggleDeleteMode = () => {
    setIsDeleteMode((prev) => !prev)
  }

  const handleAccessCharacter = (id: string) => {
    if (isDeleteMode) {
      setCharacters((prev) => prev.filter((char) => char.id !== id))
      setIsDeleteMode(false)
    } else {
      setSelectedCharacterId(id)
    }
  }

  const handleAtributosConcluidos = (dadosEtapa: {
    attributes: {
      strength: string
      intellect: string
      presence: string
      agility: string
    }
    defenses: string
    expertise: string
  }) => {
    setNovoCavaleiro((prev) => ({
      ...prev,
      attributes: dadosEtapa.attributes as Character['attributes'],
      defenses: dadosEtapa.defenses as Character['defenses'],
      expertise: dadosEtapa.expertise as Character['expertise']
    }))
    // Pula direto para o step 3 do Stepper (Raça), pois Expertise já foi preenchida aqui
    setCurrentStep(3) 
  }

  const handleRacaConcluida = (dadosRaca: DadosRaca) => {
    setNovoCavaleiro((prev) => ({
      ...prev,
      species: dadosRaca.speciesName,
      movement: {
        type: dadosRaca.movement.voo > 0 ? 'Voo' : 'Rastejo',
        speed: `${dadosRaca.movement.voo > 0 ? dadosRaca.movement.voo : dadosRaca.movement.rastejo}m`
      } as Character['movement']
    }))
    setCurrentStep(4)
  }

  const handleAntecedenteConcluido = (dadosAntecedente: DadosAntecedente) => {
    setNovoCavaleiro((prev) => ({
      ...prev,
      background: dadosAntecedente.background
    }))
    setCurrentStep(5)
  }

  const handleItensConcluidos = (dadosItens: DadosItens) => {
    const bonus = dadosItens.itemBonus
    setNovoCavaleiro((prev) => ({
      ...prev,
      specialItems: [dadosItens.specialItemName],
      spellSlots: 2 + (bonus.spellSlots || 0),
      emblemSlot: { 
        current: 2 + (bonus.emblemSlot || 0), 
        max: 2 + (bonus.emblemSlot || 0) 
      },
      purpose: {
        current: 3 + (bonus.purposeMax || 0),
        max: 3 + (bonus.purposeMax || 0)
      }
    }))
    setCurrentStep(6)
  }

  const handleEmblemasConcluidos = (dadosEmblemas: DadosEmblemas) => {
    const cavaleiroPronto: Character = {
      id: crypto.randomUUID(),
      name: `Cavaleiro Anônimo #${Math.floor(Math.random() * 900) + 100}`,
      species: novoCavaleiro.species || 'Inseto',
      background: novoCavaleiro.background || '',
      attributes: novoCavaleiro.attributes || { strength: 'd6', intellect: 'd6', presence: 'd6', agility: 'd6' },
      defenses: novoCavaleiro.defenses || 'd6',
      expertise: novoCavaleiro.expertise || 'strength',
      movement: novoCavaleiro.movement || { type: 'Rastejo', speed: '9m' },
      specialItems: novoCavaleiro.specialItems || [],
      purpose: novoCavaleiro.purpose || { current: 3, max: 3 },
      hitPoints: { current: 12, max: 12 },
      spellSlots: dadosEmblemas.spellSlotsMax,
      emblemSlot: { current: dadosEmblemas.emblemSlotsMax, max: dadosEmblemas.emblemSlotsMax },
      emblems: dadosEmblemas.emblems,
      specialAbilities: [],
      equipment: ['Rações de Viagem', 'Lanterna de Vaga-lume']
    }

    setCharacters((prev) => [...prev, cavaleiroPronto])
    setIsCreating(false)
  }
  
  if (isCreating) {
    return (
      <section className="flex-1 w-full py-12 bg-background animate-in fade-in duration-200">
        <div className="container mx-auto px-4 max-w-5xl mb-6">
          <button 
            onClick={() => setIsCreating(false)}
            className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            ← Cancelar Criação
          </button>
        </div>
        
        <div className="container mx-auto px-4 max-w-5xl flex flex-col gap-6">
          <div className="text-center space-y-2 mb-4">
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
              Novo Cavaleiro
            </h1>
            <p className="text-sm text-muted-foreground">
              Molde as carapaças, virtudes e dados de poder do seu personagem.
            </p>
          </div>

          <CreationStepper currentStep={currentStep} />

          {currentStep === 1 && <AtributosStep onNext={handleAtributosConcluidos} />}
          {currentStep === 3 && <RacaStep onNext={handleRacaConcluida} onBack={() => setCurrentStep(1)} />}
          {currentStep === 4 && <AntecedenteStep onNext={handleAntecedenteConcluido} onBack={() => setCurrentStep(3)} />}
          {currentStep === 5 && <ItensStep onNext={handleItensConcluidos} onBack={() => setCurrentStep(4)} />}
          {currentStep === 6 && (
            <EmblemaStep 
              initialEmblemSlots={novoCavaleiro.emblemSlot?.max ?? 2}
              initialSpellSlots={novoCavaleiro.spellSlots ?? 2}
              onNext={handleEmblemasConcluidos}
              onBack={() => setCurrentStep(5)}
            />
          )}
        </div>
      </section>
    )
  }

  const currentCharacter = characters.find(char => char.id === selectedCharacterId)

  if (currentCharacter) {
    return (
      <section className="flex-1 w-full py-12 bg-background animate-in fade-in duration-200">
        <div className="container mx-auto px-4 max-w-5xl mb-4">
          <button 
            onClick={() => setSelectedCharacterId(null)}
            className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            ← Voltar para a Seleção
          </button>
        </div>
        
        <CharacterSheet 
          initialCharacter={currentCharacter} 
          onSave={(updatedChar) => {
            setCharacters(prev => prev.map(c => c.id === updatedChar.id ? updatedChar : c))
            setSelectedCharacterId(null)
          }}
        />
      </section>
    )
  }

  const hasCharacters = characters.length > 0
  return (
    <section className="flex-1 w-full py-12 bg-background">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col items-center">
        <CharacterActions 
          onCreateNew={handleCreateNew}
          onDeleteMode={handleToggleDeleteMode}
          isDeleteMode={isDeleteMode}
          hasCharacters={hasCharacters}
        />

        {hasCharacters ? (
          <CharacterGrid 
            characters={characters} 
            onAccessCharacter={handleAccessCharacter} 
          />
        ) : (
          <EmptyCharacters onCreateNew={handleCreateNew} />
        )}
      </div>
    </section>
  )
}

export default CharacterPage