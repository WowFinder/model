import { AssetType } from '@wowfinder/ts-enums';
import { Adventure } from 'Adventure';
import { AssetResolver } from 'Assets/AssetResolver';
import { Character } from 'Character';
import { Class } from 'Character/Class';
import { Race } from 'Character/Race';
import { mockedRaceRawAsset } from '__mocks__/Creature/race';
import { Faction } from 'Faction';
import { Item } from 'Item';
import { Spell, SpellList } from 'Magic';

function noAsset(type: AssetType, key: string): never {
    throw new Error(`No asset found for ${type} with key ${key}`);
}

class MockAssetResolver extends AssetResolver {
    resolveAdventure(key: string): Adventure {
        return new Adventure({
            key,
            title: `Mock Adventure ${key}`,
            date: new Date().toISOString().substring(0, 10),
            rewards: {},
        });
    }

    resolveCharacter(key: string): Character {
        return noAsset(AssetType.characters, key);
    }

    resolveClass(key: string): Class {
        return noAsset(AssetType.classes, key);
    }

    resolveFaction(key: string): Faction {
        return new Faction({
            key: Math.random(),
            name: `Mock Faction ${key}`,
            label: key,
        });
    }

    resolveItem(key: string): Item {
        return noAsset(AssetType.items, key);
    }

    resolveRace(key: string): Race {
        return new Race({
            ...mockedRaceRawAsset,
            key,
        });
    }

    resolveSpell(key: string): Spell {
        return noAsset(AssetType.spells, key);
    }

    resolveSpellList(key: string): SpellList {
        return noAsset(AssetType.spellLists, key);
    }
}

const mockAssetResolver = new MockAssetResolver();

export { mockAssetResolver };
