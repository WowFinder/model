import {
    rawBaseCreatureMinimal,
    mockAssetResolver,
    rawBaseCreatureExpanded,
} from '../../__mocks__';
import { CreatureBase } from '../../Creature';
import { CharacterCore } from '..';

function notImplemented(): never {
    throw new Error('Not implemented');
}

class CharacterCoreImpl extends CharacterCore {
    get baseProfile(): never {
        return notImplemented();
    }
    get overrides(): never {
        return notImplemented();
    }
    set overrides(_: any) {
        notImplemented();
    }
    get inventory(): never {
        return notImplemented();
    }
    set inventory(_: any) {
        notImplemented();
    }
    get classProgression(): never {
        return notImplemented();
    }
    get totalBonuses(): never {
        return notImplemented();
    }
    get totalProfile(): never {
        return notImplemented();
    }
}

describe('CharacterCore', () => {
    it('should build constructor args', async () => {
        const args = await CreatureBase.buildCreatureArgs(
            rawBaseCreatureMinimal,
            mockAssetResolver,
        );
        expect(args.key).toBe('base-creature-mock-minimal');
        expect(args.baseStats).toEqual(rawBaseCreatureMinimal.baseStats);
    });
    it('should create a minimal instance with default values', async () => {
        const args = await CreatureBase.buildCreatureArgs(
            rawBaseCreatureMinimal,
            mockAssetResolver,
        );
        const char = new CharacterCoreImpl(args);
        expect(char.key).toBe('base-creature-mock-minimal');
        expect(char.active).toBe(true);
    });
    it('should build an instance with explicit values', async () => {
        const args = await CharacterCore.buildCharacterArgs(
            rawBaseCreatureExpanded,
            mockAssetResolver,
        );
        const char = new CharacterCoreImpl({
            ...args,
            active: false,
        });
        expect(char.key).toBe('base-creature-mock-expanded');
        expect(char.active).toBe(false);
    });
});
