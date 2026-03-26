import { type RawCharacterAsset } from '@wowfinder/asset-schemas';
import { MultiBonus } from '../Bonus';
import { type AsyncAssetResolver } from '../Assets';
import {
    defaultCreatureProfile,
    type CreatureProfile,
    type CreatureProfileOverride,
} from '../Profile';
import { Inventory } from '../Item/Inventory';
import { CharacterCore, type CharacterCoreBuilder } from './CharacterCore';

class Character extends CharacterCore {
    readonly #baseProfile: CreatureProfile;
    #overrides: CreatureProfileOverride[] = [];
    #inventory: Inventory = Inventory.empty;

    constructor(args: CharacterCoreBuilder) {
        super(args);
        this.#baseProfile = {
            ...defaultCreatureProfile,
            personal: args.personal,
            stats: args.baseStats,
        };
    }

    get baseProfile(): CreatureProfile {
        return this.#baseProfile;
    }

    get overrides(): CreatureProfileOverride[] {
        return [...this.#overrides];
    }

    set overrides(overrides: CreatureProfileOverride[]) {
        this.#overrides = overrides;
    }

    get inventory(): Inventory {
        return this.#inventory;
    }

    set inventory(inventory: Inventory) {
        this.#inventory = inventory;
    }

    get totalBonuses(): MultiBonus {
        // TODO: Compute from class features, feats, racial bonuses, items, etc.
        return MultiBonus.zero;
    }

    get totalProfile(): CreatureProfile {
        return this.#overrides.reduce(
            (profile, override) => override(profile),
            this.#baseProfile,
        );
    }

    static async fromRaw({
        raw,
        resolver,
    }: {
        raw: RawCharacterAsset;
        resolver: AsyncAssetResolver;
    }): Promise<Character> {
        const args = await CharacterCore.buildCharacterArgs(raw, resolver);
        // TODO: raw.templates - template entries not yet used
        // TODO: raw.skillRanks - skill ranks not yet used
        // TODO: raw.inventory - inventory data not yet used
        return new Character(args);
    }
}

export { Character };
