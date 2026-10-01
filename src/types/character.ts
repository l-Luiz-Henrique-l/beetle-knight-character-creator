export type DieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

export type Attributes = {
    strength: DieType;
    intellect: DieType;
    presence: DieType;
    agility: DieType;
}

export type MovementType = 'Rastejo' | 'Vôo' | 'Escavação' | 'Nado';

export type Character = {
    player?: string;
    lastRestPlace?: string;
    orbsCollected?: number;
    notes?: string;

    id: string;
    name: string;
    species: string;
    background: string;
    image?: string;

    spellSlots: number;
    purpose: {
        current: number;
        max: number;
    }
    hitPoints: {
        current: number;
        max: number;
    }

    attributes: Attributes;
    defenses: DieType;
    expertise: keyof Attributes | 'defenses'; 

    specialAbilities: string[];
    movement: {
        type: MovementType;
        speed: string;
    }

    emblemSlot: {
        current: number;
        max: number;
    }

    emblems: string[];
    specialItems: string[];
    equipment: string[];
}