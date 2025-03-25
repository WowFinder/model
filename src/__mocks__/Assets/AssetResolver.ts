import { AssetType } from '@wowfinder/ts-enums';
import { Adventure } from '../../Adventure';
import { AsyncAssetResolver } from '../../Assets/AssetResolver';
import { Class } from '../../Creature/Class';
import { Race } from '../../Creature/Race';
import { Faction } from '../../Faction';
import { Item } from '../../Item';
import { Spell, SpellList } from '../../Magic';
import {
    mockArcaneClassRawAsset,
    mockDivineClassRawAsset,
    mockMeleeClassRawAsset,
    mockStealthClassRawAsset,
} from '../Creature/Class';
import { mockedRaceRawAsset } from '../Creature/race';

function noAsset(type: AssetType, key: string): never {
    throw new Error(`No asset found for ${type} with key ${key}`);
}

class MockAssetResolver extends AsyncAssetResolver {
    resolveAdventure(key: string): Promise<Adventure> {
        return Promise.resolve(
            new Adventure({
                key,
                title: `Mock Adventure ${key}`,
                date: new Date().toISOString().substring(0, 10),
                rewards: {},
            }),
        );
    }

    resolveClass(key: string): Promise<Class> {
        switch (key) {
            case 'mocked-melee-class':
                return Promise.resolve(new Class(mockMeleeClassRawAsset));
            case 'mocked-arcane-class':
                return Promise.resolve(new Class(mockArcaneClassRawAsset));
            case 'mocked-divine-class':
                return Promise.resolve(new Class(mockDivineClassRawAsset));
            case 'mocked-stealth-class':
                return Promise.resolve(new Class(mockStealthClassRawAsset));
            default:
                noAsset(AssetType.classes, key);
        }
    }

    resolveFaction(key: string): Promise<Faction> {
        return Promise.resolve(
            new Faction({
                key: Math.random(),
                name: `Mock Faction ${key}`,
                label: key,
            }),
        );
    }

    resolveItem(key: string): Promise<Item> {
        return noAsset(AssetType.items, key);
    }

    resolveRace(key: string): Promise<Race> {
        return Promise.resolve(
            new Race({
                ...mockedRaceRawAsset,
                key,
            }),
        );
    }

    resolveSpell(key: string): Promise<Spell> {
        return noAsset(AssetType.spells, key);
    }

    resolveSpellList(key: string): Promise<SpellList> {
        return noAsset(AssetType.spellLists, key);
    }

    list(type: AssetType): Promise<string[]> {
        switch (type) {
            case AssetType.classes:
                return Promise.resolve([
                    'mocked-melee-class',
                    'mocked-arcane-class',
                    'mocked-divine-class',
                    'mocked-stealth-class',
                ]);
            case AssetType.races:
                return Promise.resolve([mockedRaceRawAsset.key]);
            default:
                return Promise.resolve([]);
        }
    }
}

const mockAssetResolver = new MockAssetResolver();

export { mockAssetResolver };
