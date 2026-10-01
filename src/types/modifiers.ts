import type { Character } from './character'

export interface BaseModifiers {
  strength?: number
  intellect?: number
  presence?: number
  agility?: number
  defenses?: number
  spellSlots?: number
  emblemSlot?: number
  purposeMax?: number
  hitPointsMax?: number
  movementSpeed?: number
}

export interface ItemEspecial {
  id: string
  nome: string
  descritores: string[] 
  danos?: string  
  propriedades?: string[]
  modificadores: BaseModifiers
  custom?: boolean
}