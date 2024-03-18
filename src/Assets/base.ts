import { AssetType } from '@wowfinder/ts-enums';
import type { Adventure } from 'Adventure';
import type { Character } from 'Character';
import type { Class } from 'Creature/Class';
import type { Race } from 'Creature/Race';
import type { Faction } from 'Faction';
import type { Item } from 'Item';
import type { Spell, SpellList } from 'Magic';

interface AdventureResolver {
    resolveAdventure(key: string): Adventure;
    resolve(type: AssetType.adventures, key: string): Adventure;
}

interface CharacterResolver {
    resolveCharacter(key: string): Character;
    resolve(type: AssetType.characters, key: string): Character;
}

interface ClassResolver {
    resolveClass(key: string): Class;
    resolve(type: AssetType.classes, key: string): Class;
}

interface FactionResolver {
    resolveFaction(key: string): Faction;
    resolve(type: AssetType.factions, key: string): Faction;
}

interface ItemResolver {
    resolveItem(key: string): Item;
    resolve(type: AssetType.items, key: string): Item;
}

interface RaceResolver {
    resolveRace(key: string): Race;
    resolve(type: AssetType.races, key: string): Race;
}

interface SpellResolver {
    resolveSpell(key: string): Spell;
    resolve(type: AssetType.spells, key: string): Spell;
}

interface SpellListResolver {
    resolveSpellList(key: string): SpellList;
    resolve(type: AssetType.spellLists, key: string): SpellList;
}

export {
    AdventureResolver,
    CharacterResolver,
    ClassResolver,
    FactionResolver,
    ItemResolver,
    RaceResolver,
    SpellResolver,
    SpellListResolver,
};
