import { AssetType } from '@wowfinder/ts-enums';
import { Debugger } from '@wowfinder/ts-utils';
import { Adventure } from 'Adventure';
import { Character } from 'Character';
import { Class } from 'Creature/Class';
import Race from 'Creature/Race';
import { Faction } from 'Faction';
import { Item } from 'Item';
import { Spell, SpellList } from 'Magic';

type AnyAsset =
    | Adventure
    | Character
    | Class
    | Faction
    | Item
    | Race
    | Spell
    | SpellList;

abstract class AssetResolver {
    abstract resolveAdventure(key: string): Adventure;
    abstract resolveCharacter(key: string): Character;
    abstract resolveClass(key: string): Class;
    abstract resolveFaction(key: string): Faction;
    abstract resolveItem(key: string): Item;
    abstract resolveRace(key: string): Race;
    abstract resolveSpell(key: string): Spell;
    abstract resolveSpellList(key: string): SpellList;

    resolve(type: AssetType.adventures, key: string): Adventure;
    resolve(type: AssetType.characters, key: string): Character;
    resolve(type: AssetType.classes, key: string): Class;
    resolve(type: AssetType.factions, key: string): Faction;
    resolve(type: AssetType.items, key: string): Item;
    resolve(type: AssetType.races, key: string): Race;
    resolve(type: AssetType.spells, key: string): Spell;
    resolve(type: AssetType.spellLists, key: string): SpellList;

    resolve(type: AssetType, key: string): AnyAsset {
        switch (type) {
            case AssetType.adventures:
                return this.resolveAdventure(key);
            case AssetType.characters:
                return this.resolveCharacter(key);
            case AssetType.classes:
                return this.resolveClass(key);
            case AssetType.factions:
                return this.resolveFaction(key);
            case AssetType.items:
                return this.resolveItem(key);
            case AssetType.races:
                return this.resolveRace(key);
            case AssetType.spellLists:
                return this.resolveSpellList(key);
            case AssetType.spells:
                return this.resolveSpell(key);
            default:
                return Debugger.unreachable(type);
        }
    }
}

export { AssetResolver };
