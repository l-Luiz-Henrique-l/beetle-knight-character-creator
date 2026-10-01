// Escala oficial de passos de dado no sistema
export const DICE_STEPS = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'] as const;
export type DieType = typeof DICE_STEPS[number] | (string & {});

export interface RollOptions {
  die: DieType;             // Ex: 'd6', 'd8'
  modifier?: number;        // Ex: +1 da Expertise ou bônus de item
  label?: string;           // Ex: 'Força', 'Ataque com Espada'
  stepOffset?: number;      // +1 para Vantagem, -1 para Desvantagem
}

export interface RollResult {
  label: string;
  originalDie: string;      // Dado base da ficha
  finalDie: string;         // Dado ajustado por vantagem/desvantagem
  rawRoll: number;          // Valor puro tirado no dado
  modifier: number;         // Soma dos modificadores (+1 expertise, etc)
  total: number;            // rawRoll + modifier
  isMax: boolean;           // Tirou o valor máximo do dado (crítico)
  isMin: boolean;           // Tirou 1 no dado
}

/**
 * Função para alterar a categoria de um dado (ex: d6 com stepOffset +1 vira d8)
 */
export function shiftDieStep(die: string, offset: number): string {
  // Convertemos para unknown e depois ReadonlyArray para o TS aceitar a busca sem o erro de 'any'
  const steps: ReadonlyArray<string> = DICE_STEPS;
  const currentIndex = steps.indexOf(die);
  
  // Se o dado não estiver na escala padrão (ex: d100), mantém o original
  if (currentIndex === -1) return die;

  const targetIndex = Math.max(0, Math.min(DICE_STEPS.length - 1, currentIndex + offset));
  return DICE_STEPS[targetIndex];
}

/**
 * Função principal para rolar qualquer dado no sistema
 */
export function rollDice({ die, modifier = 0, label = 'Rolagem', stepOffset = 0 }: RollOptions): RollResult {
  const finalDie = shiftDieStep(die, stepOffset);
  const sides = parseInt(finalDie.replace(/\D/g, ''), 10) || 6;

  // Rolagem do dado (1 até o número de lados)
  const rawRoll = Math.floor(Math.random() * sides) + 1;
  const total = rawRoll + modifier;

  return {
    label,
    originalDie: die,
    finalDie,
    rawRoll,
    modifier,
    total,
    isMax: rawRoll === sides,
    isMin: rawRoll === 1,
  };
}