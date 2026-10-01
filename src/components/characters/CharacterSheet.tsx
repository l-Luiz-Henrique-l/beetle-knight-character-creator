import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Minus, Shield, Heart, Star, Sparkles, Footprints, ScrollText } from 'lucide-react'
import type { Character } from '@/types/character'

interface CharacterSheetProps {
  initialCharacter: Character
  onSave?: (character: Character) => void
}

export function CharacterSheet({ initialCharacter, onSave }: CharacterSheetProps) {
  const [char, setChar] = useState<Character>(initialCharacter)

    const ATTR_TRANSLATIONS: Record<string, string> = {
    strength: 'Força',
    intellect: 'Intelecto',
    presence: 'Presença',
    agility: 'Agilidade',
    defense: 'Defesa',
    };

    // Escala de dados disponível no sistema
    const DICE_STEPS = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];

  // Função genérica para atualizar sub-objetos (ex: HP, Propósito)
  const updateNestedField = (nested: 'hitPoints' | 'purpose' | 'emblemSlot', field: 'current' | 'max', value: number) => {
    setChar(prev => ({
      ...prev,
      [nested]: { ...prev[nested], [field]: Math.max(0, value) }
    }))
  }

  // Lógica para aumentar/diminuir os Emblemas Dinamicamente
  const handleAddEmblem = () => {
    setChar(prev => ({ ...prev, emblems: [...prev.emblems, ''] }))
  }

  const handleRemoveEmblem = (index: number) => {
    setChar(prev => ({ ...prev, emblems: prev.emblems.filter((_, i) => i !== index) }))
  }

  const handleEmblemChange = (index: number, value: string) => {
    const newEmblems = [...char.emblems]
    newEmblems[index] = value
    setChar(prev => ({ ...prev, emblems: newEmblems }))
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 p-2">
      {/* Cabeçalho de Identidade (Baseado no topo da Captura de tela 2026-06-19 102034.png) */}
      <Card className="bg-card border-2">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nome do Cavaleiro</label>
            <Input 
              value={char.name} 
              onChange={e => setChar(p => ({ ...p, name: e.target.value }))}
              className="text-xl font-bold bg-muted/30"
              style={{ fontFamily: 'MedievalSharp, cursive' }}
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Espécie (Artrópode)</label>
            <Input 
              value={char.species} 
              onChange={e => setChar(p => ({ ...p, species: e.target.value }))}
              className="text-lg bg-muted/30"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Jogador</label>
            <Input 
              value={char.player || ''} 
              onChange={e => setChar(p => ({ ...p, player: e.target.value }))}
              className="text-lg bg-muted/30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Sistema de Abas separando as duas páginas enviadas */}
      <Tabs defaultValue="principal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
          <TabsTrigger value="principal" className="font-bold uppercase tracking-wide">Ficha Principal</TabsTrigger>
          <TabsTrigger value="emblemas" className="font-bold uppercase tracking-wide">Emblemas & Recursos</TabsTrigger>
        </TabsList>

        {/* ================= TAB 1: FICHA PRINCIPAL ================= */}
        <TabsContent value="principal" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Habilidades / Atributos (Coluna Esquerda) */}
            <Card className="border-2 lg:col-span-1">
              <CardHeader><CardTitle className="text-lg uppercase" style={{ fontFamily: 'MedievalSharp' }}>Habilidades</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {Object.keys(char.attributes).map((attr) => (
                  <div key={attr} className="flex items-center justify-between bg-muted/40 p-2 rounded-lg border">
                    <span className="font-bold capitalize text-sm text-foreground">{attr === 'intellect' ? 'Inteligência' : attr}</span>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs text-muted-foreground">Dado:</span>
                      <span className="font-mono font-bold text-sm bg-background px-2 py-1 rounded border">{char.attributes[attr as keyof typeof char.attributes]}</span>
                      {char.expertise === attr && <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">+1 Mod</span>}
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t space-y-3">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground">Último Local de Descanso</label>
                    <Input value={char.lastRestPlace || ''} onChange={e => setChar(p => ({ ...p, lastRestPlace: e.target.value }))} placeholder="Ex: Estalagem do Louva-a-Deus" className="text-sm" />
                  </div>
                  <div className="flex items-center justify-between p-2 bg-primary/5 border-2 border-primary/20 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Shield className="size-5 text-primary" />
                      <span className="font-bold text-sm" style={{ fontFamily: 'MedievalSharp' }}>MINHA CASCA (DEFESA)</span>
                    </div>
                    <span className="font-mono font-black text-lg bg-background px-3 py-1 rounded-md border-2">{char.defenses}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Retrato e Status Vitais (Coluna Central) */}
            <div className="space-y-6 lg:col-span-1">
              {/* Espaço do Retrato do Wireframe */}
              <div className="aspect-[4/5] bg-muted border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-4 relative group overflow-hidden">
                {char.image ? (
                  <img src={char.image} alt="Retrato" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-muted-foreground flex flex-col items-center gap-2">
                    <Sparkles className="size-8 stroke-[1.2]" />
                    <span className="font-bold text-xs uppercase tracking-wider">Moldura do Retrato</span>
                  </div>
                )}
              </div>

              {/* Vida e Propósito (Baseado no lado direito da Captura de tela 2026-06-19 102034.png) */}
              <Card className="border-2">
                <CardContent className="p-4 space-y-4">
                  {/* Pontos de Vida */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="flex items-center gap-1.5 text-red-500"><Heart className="size-4 fill-current"/> PONTOS DE VIDA</span>
                      <span className="font-mono">{char.hitPoints.current} / {char.hitPoints.max}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button size="icon" variant="outline" className="size-8" onClick={() => updateNestedField('hitPoints', 'current', char.hitPoints.current - 1)}><Minus className="size-3"/></Button>
                      <div className="w-full bg-muted h-3 rounded-full overflow-hidden border">
                        <div className="bg-red-500 h-full transition-all" style={{ width: `${(char.hitPoints.current / char.hitPoints.max) * 100}%` }} />
                      </div>
                      <Button size="icon" variant="outline" className="size-8" onClick={() => updateNestedField('hitPoints', 'current', char.hitPoints.current + 1)}><Plus className="size-3"/></Button>
                    </div>
                  </div>

                  {/* Propósito */}
                  <div className="space-y-2 border-t pt-2">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="flex items-center gap-1.5 text-amber-500"><Star className="size-4 fill-current"/> PROPÓSITO</span>
                      <span className="font-mono">{char.purpose.current} / {char.purpose.max}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button size="icon" variant="outline" className="size-8" onClick={() => updateNestedField('purpose', 'current', char.purpose.current - 1)}><Minus className="size-3"/></Button>
                      <div className="w-full bg-muted h-3 rounded-full overflow-hidden border">
                        <div className="bg-amber-500 h-full transition-all" style={{ width: `${(char.purpose.current / char.purpose.max) * 100}%` }} />
                      </div>
                      <Button size="icon" variant="outline" className="size-8" onClick={() => updateNestedField('purpose', 'current', char.purpose.current + 1)}><Plus className="size-3"/></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chamado e Movimento (Coluna Direita) */}
            <Card className="border-2 lg:col-span-1">
              <CardHeader><CardTitle className="text-lg uppercase" style={{ fontFamily: 'MedievalSharp' }}>Chamado & Deslocamento</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/30 p-3 rounded-lg border space-y-2">
                  <span className="text-xs font-bold text-muted-foreground block uppercase">Chamado para a Cavalaria</span>
                  <p className="text-sm italic text-foreground bg-background p-2 rounded border">"{char.background}"</p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground block uppercase flex items-center gap-1"><Footprints className="size-3.5"/> Movimento Ativo</span>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    {['Rastejo', 'Vôo', 'Escavação', 'Nado'].map((m) => (
                      <div 
                        key={m} 
                        className={`p-2 rounded border font-semibold ${char.movement.type === m ? 'bg-primary/10 border-primary text-foreground' : 'bg-muted/40 text-muted-foreground'}`}
                      >
                        {m} {char.movement.type === m ? `(${char.movement.speed})` : '—'}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Orbes Coletados</label>
                  <Input 
                    type="number"
                    value={char.orbsCollected || 0} 
                    onChange={e => setChar(p => ({ ...p, orbsCollected: parseInt(e.target.value) || 0 }))}
                    className="font-mono text-center text-lg font-bold bg-muted/20"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Seção Inferior: Itens, Equipamentos e Anotações (Captura de tela 2026-06-19 102034.png) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader><CardTitle className="text-md uppercase" style={{ fontFamily: 'MedievalSharp' }}>Itens Especiais & Equipamento</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-amber-600 block uppercase mb-1">Item Especial Inicial</label>
                  <Input value={char.specialItems?.[0] || ''} onChange={e => {
                    const updated = [...(char.specialItems || [])];
                    updated[0] = e.target.value;
                    setChar(p => ({ ...p, specialItems: updated }));
                  }} className="font-medium" />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground block uppercase mb-1">Mochila / Equipamentos</label>
                  <Textarea 
                    value={char.equipment.join('\n')} 
                    onChange={e => setChar(p => ({ ...p, equipment: e.target.value.split('\n') }))}
                    placeholder="Um item por linha"
                    className="min-h-[100px] font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader><CardTitle className="text-md uppercase" style={{ fontFamily: 'MedievalSharp' }}>Anotações de Campanha</CardTitle></CardHeader>
              <CardContent>
                <Textarea 
                  value={char.notes || ''} 
                  onChange={e => setChar(p => ({ ...p, notes: e.target.value }))}
                  placeholder="Anotações sobre vilas, PdMs ou missões do reino..."
                  className="min-h-[165px] text-sm"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ================= TAB 2: EMBLEMAS (Captura de tela 2026-06-19 102050.png) ================= */}
        <TabsContent value="emblemas">
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
              <div>
                <CardTitle className="text-2xl uppercase tracking-wider" style={{ fontFamily: 'MedievalSharp' }}>Lista de Emblemas</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Gerencie os emblemas sintonizados e conquistados</p>
              </div>
              
              {/* Botão de Aumentar Dinâmico solicitado */}
              <Button 
                onClick={handleAddEmblem}
                size="sm"
                className="font-bold uppercase text-xs tracking-wider gap-1.5"
              >
                <Plus className="size-4" /> Aumentar Emblemas
              </Button>
            </CardHeader>

            <CardContent className="p-6">
              {/* Espaços de Emblema (Status no topo do papel de emblemas) */}
              <div className="flex gap-6 mb-6 justify-center bg-muted/30 p-4 rounded-xl border max-w-md mx-auto">
                <div className="text-center">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Espaços Máximos</span>
                  <div className="flex items-center gap-1 justify-center mt-1">
                    <Button size="icon" variant="ghost" className="size-6" onClick={() => updateNestedField('emblemSlot', 'max', (char.emblemSlot?.max || 2) - 1)}><Minus className="size-3"/></Button>
                    <span className="font-mono font-bold text-md px-2">{char.emblemSlot?.max ?? 2}</span>
                    <Button size="icon" variant="ghost" className="size-6" onClick={() => updateNestedField('emblemSlot', 'max', (char.emblemSlot?.max || 2) + 1)}><Plus className="size-3"/></Button>
                  </div>
                </div>
                <div className="w-px bg-border h-8 self-center" />
                <div className="text-center">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Espaços Atuais em Uso</span>
                  <span className="font-mono font-bold text-lg block mt-0.5 text-primary">{char.emblems.filter(e => e.trim() !== '').length}</span>
                </div>
              </div>

              {/* Grid Dinâmico de inputs simulando o papel */}
              {char.emblems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm italic">
                  Nenhum emblema gravado. Clique em "Aumentar Emblemas" para forjar um.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {char.emblems.map((emblem, index) => (
                    <div key={index} className="flex gap-2 items-center bg-background border-2 p-3 rounded-xl shadow-sm hover:border-muted-foreground/30 transition-colors relative group">
                      <div className="bg-muted p-2 rounded-lg text-muted-foreground font-mono text-xs font-bold">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Nome do Emblema</label>
                        <Input 
                          value={emblem}
                          onChange={(e) => handleEmblemChange(index, e.target.value)}
                          placeholder="Ex: Emblema do Louva-a-Deus"
                          className="h-8 text-sm mt-0.5"
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="size-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveEmblem(index)}
                        title="Remover este espaço"
                      >
                        <Minus className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botão flutuante ou de rodapé para persistência */}
      {onSave && (
        <div className="flex justify-end pt-4">
          <Button size="lg" className="font-bold uppercase tracking-wider" onClick={() => onSave(char)}>
            Guardar Ficha do Cavaleiro
          </Button>
        </div>
      )}
    </div>
  )
}