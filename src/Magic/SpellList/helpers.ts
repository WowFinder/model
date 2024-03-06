import { Spell } from '../Spell';

interface SpellListEntry {
    spell: Spell;
    rank: number;
}

type SpellListLevel = SpellListEntry[];

type SpellListLevels = { [key: number]: SpellListLevel };

export type { SpellListEntry, SpellListLevel, SpellListLevels };
