import type { Character } from '@/types/character'
import type { ItemEspecial, BaseModifiers } from '@/types/modifiers'

export function extrairModificadoresAcumulados(itens: ItemEspecial[]): Required<BaseModifiers> {
  const inicial: Required<BaseModifiers> = {
    strength: 0,
    intellect: 0,
    presence: 0,
    agility: 0,
    defenses: 0,
    spellSlots: 0,
    emblemSlot: 0,
    purposeMax: 0,
    hitPointsMax: 0,
    movementSpeed: 0,
  }

  return itens.reduce((acumulado, item) => {
    const mods = item.modificadores
    return {
      strength: acumulado.strength + (mods.strength || 0),
      intellect: acumulado.intellect + (mods.intellect || 0),
      presence: acumulado.presence + (mods.presence || 0),
      agility: acumulado.agility + (mods.agility || 0),
      defenses: acumulado.defenses + (mods.defenses || 0),
      spellSlots: acumulado.spellSlots + (mods.spellSlots || 0),
      emblemSlot: acumulado.emblemSlot + (mods.emblemSlot || 0),
      purposeMax: acumulado.purposeMax + (mods.purposeMax || 0),
      hitPointsMax: acumulado.hitPointsMax + (mods.hitPointsMax || 0),
      movementSpeed: acumulado.movementSpeed + (mods.movementSpeed || 0),
    }
  }, inicial)
}
export function calcularFichaMutada(character: Character, itensEquipados: ItemEspecial[]) {
  const mods = extrairModificadoresAcumulados(itensEquipados)

  const velocidadeBase = parseInt(character.movement.speed) || 0
  const novaVelocidade = velocidadeBase + mods.movementSpeed

  return {
    ...character,
    attributes: {
      strength: character.attributes.strength,
      intellect: character.attributes.intellect,
      presence: character.attributes.presence,
      agility: character.attributes.agility,
    },
    modificadoresAtivos: {
      strength: mods.strength,
      intellect: mods.intellect,
      presence: mods.presence,
      agility: mods.agility,
    },
    spellSlots: character.spellSlots + mods.spellSlots,
    emblemSlot: {
      current: character.emblemSlot.current,
      max: character.emblemSlot.max + mods.emblemSlot
    },
    purpose: {
      current: character.purpose.current,
      max: character.purpose.max + mods.purposeMax
    },
    movement: {
      ...character.movement,
      speed: `${novaVelocidade}m`
    }
  }
}