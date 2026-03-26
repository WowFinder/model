import {
    type RawSkills,
    type RawCharacterAsset,
} from '@wowfinder/asset-schemas';
import { MultiBonus } from '../Bonus';
import { type AsyncAssetResolver } from '../Assets';
import {
    buildProgressionProfile,
    defaultCreatureProfile,
    SpeedsProfile,
    type CreatureProfile,
    type CreatureProfileOverride,
} from '../Profile';
import { Inventory } from '../Item/Inventory';
import { CharacterCore, type CharacterCoreBuilder } from './CharacterCore';
import { statMod } from '../Creature';
import { fillSkills } from '../Creature/Skill/Skills';

type CharacterBuilder = CharacterCoreBuilder & {
    xp?: number;
    skillRanks?: RawSkills;
};

class Character extends CharacterCore {
    readonly #baseProfile: CreatureProfile;
    #overrides: CreatureProfileOverride[] = [];
    #inventory: Inventory = Inventory.empty;

    constructor({ ...args }: CharacterBuilder) {
        super(args);
        const stats = args.baseStats;
        this.#baseProfile = {
            ...defaultCreatureProfile,
            personal: args.personal,
            // shape: TODO #295
            size: args.race.size,
            stats,
            speeds: new SpeedsProfile({
                ...args.race.speeds.export(),
                dexBonus: statMod(stats.dexterity),
            }),
            // vitals: TODO #305
            progression: buildProgressionProfile({
                xp: args.xp ?? 0, // TODO #306
                classes: args.classes ?? [],
            }),
            skills: fillSkills(args.skillRanks ?? {}), // skills: TODO #307
            // resistances:  TODO #308
            // traits: TODO #309
        };
    }

    get baseProfile(): CreatureProfile {
        return this.#baseProfile;
    }

    get overrides(): CreatureProfileOverride[] {
        return [...this.#overrides];
    }

    set overrides(overrides: CreatureProfileOverride[]) {
        this.#overrides = [...overrides];
    }

    get inventory(): Inventory {
        return this.#inventory;
    }

    set inventory(inventory: Inventory) {
        this.#inventory = inventory;
    }

    get totalBonuses(): MultiBonus {
        // TODO #301: Compute from class features, feats, items, etc.
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
        // TODO #302: raw.templates - template entries not yet used
        // TODO #303: raw.skillRanks - skill ranks not yet used
        // TODO #304: raw.inventory - inventory data not yet used
        return new Character(args);
    }
}

export { Character };
