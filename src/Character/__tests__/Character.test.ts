import {
    rawCharacterMinimal,
    rawCharacterExpanded,
    mockAssetResolver,
} from '../../__mocks__';
import { Character } from '../Character';
import { Inventory } from '../../Item/Inventory';
import { Size } from '@wowfinder/ts-enums';

describe('Character', () => {
    it('should build a minimal instance via fromRaw', async () => {
        const character = await Character.fromRaw({
            raw: rawCharacterMinimal,
            resolver: mockAssetResolver,
        });
        expect(character).toBeInstanceOf(Character);
        expect(character.key).toBe(rawCharacterMinimal.key);
        expect(character.active).toBe(true);
    });

    it('should build an expanded instance via fromRaw', async () => {
        const character = await Character.fromRaw({
            raw: rawCharacterExpanded,
            resolver: mockAssetResolver,
        });
        expect(character).toBeInstanceOf(Character);
        expect(character.key).toBe(rawCharacterExpanded.key);
        expect(character.active).toBe(false);
        expect(character.classes).toHaveLength(
            rawCharacterExpanded.classes?.length ?? 0,
        );
    });

    it('should expose baseProfile derived from constructor args', async () => {
        const character = await Character.fromRaw({
            raw: rawCharacterMinimal,
            resolver: mockAssetResolver,
        });
        expect(character.baseProfile.personal.fullName).toBe(
            rawCharacterMinimal.personal.fullName,
        );
        expect(character.baseProfile.stats).toEqual(
            rawCharacterMinimal.baseStats,
        );
    });

    it('should start with empty overrides', async () => {
        const character = await Character.fromRaw({
            raw: rawCharacterMinimal,
            resolver: mockAssetResolver,
        });
        expect(character.overrides).toHaveLength(0);
    });

    it('should apply overrides when computing totalProfile', async () => {
        const character = await Character.fromRaw({
            raw: rawCharacterMinimal,
            resolver: mockAssetResolver,
        });
        const newSize = Size.large;
        character.overrides = [profile => ({ ...profile, size: newSize })];
        expect(character.totalProfile.size).toBe(newSize);
        expect(character.baseProfile.size).not.toBe(newSize);
    });

    it('should start with an empty inventory', async () => {
        const character = await Character.fromRaw({
            raw: rawCharacterMinimal,
            resolver: mockAssetResolver,
        });
        expect(character.inventory).toBeInstanceOf(Inventory);
        expect(character.inventory.gear).toHaveLength(0);
    });

    it('should allow replacing the inventory', async () => {
        const character = await Character.fromRaw({
            raw: rawCharacterMinimal,
            resolver: mockAssetResolver,
        });
        const newInventory = new Inventory({ money: 500 });
        character.inventory = newInventory;
        expect(character.inventory.money.raw).toBe(500);
    });

    it('classProgression should match classes', async () => {
        const character = await Character.fromRaw({
            raw: rawCharacterExpanded,
            resolver: mockAssetResolver,
        });
        expect(character.classProgression).toEqual(character.classes);
    });
});
