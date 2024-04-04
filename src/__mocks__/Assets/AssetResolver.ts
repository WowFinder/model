import { AssetType } from '@wowfinder/ts-enums';
import { Adventure } from 'Adventure';
import { AssetResolver } from 'Assets/AssetResolver';
import { Class } from 'Creature/Class';
import {
    mockMeleeClassRawAsset,
    mockArcaneClassRawAsset,
    mockDivineClassRawAsset,
    mockStealthClassRawAsset,
} from '__mocks__/Creature/Class';
import { mockedRaceRawAsset } from '__mocks__/Creature/race';
import { Race } from 'Creature/Race';
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

    resolveClass(key: string): Class {
        switch (key) {
            case 'mocked-melee-class':
                return new Class(mockMeleeClassRawAsset);
            case 'mocked-arcane-class':
                return new Class(mockArcaneClassRawAsset);
            case 'mocked-divine-class':
                return new Class(mockDivineClassRawAsset);
            case 'mocked-stealth-class':
                return new Class(mockStealthClassRawAsset);
            default:
                return noAsset(AssetType.classes, key);
        }
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
