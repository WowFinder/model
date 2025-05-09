import { type RawCharacterAsset } from '@wowfinder/asset-schemas';
import { type MultiBonus } from '../Bonus';
import {
    type ClassEntries,
    CreatureBase,
    type CreatureBaseBuilder,
} from '../Creature';
import { type Inventory } from '../Item/Inventory';
import {
    type CreatureBaseProfile,
    type CreatureBaseProfileOverride,
} from '../Profile';
import { type CharacterBaseInterface } from './CharacterBaseInterface';
import { AsyncAssetResolver } from '../Assets';

type CharacterCoreBuilder = CreatureBaseBuilder & {
    active?: boolean;
};

abstract class CharacterCore
    extends CreatureBase
    implements CharacterBaseInterface
{
    readonly #active: boolean;

    constructor({ active = true, ...args }: CharacterCoreBuilder) {
        super(args);
        this.#active = active;
    }

    get active(): boolean {
        return this.#active;
    }

    abstract get baseProfile(): CreatureBaseProfile;
    abstract get overrides(): CreatureBaseProfileOverride[];
    abstract set overrides(overrides: CreatureBaseProfileOverride[]);
    abstract get inventory(): Inventory;
    abstract set inventory(inventory: Inventory);
    abstract get classProgression(): ClassEntries;
    abstract get totalBonuses(): MultiBonus;
    abstract get totalProfile(): CreatureBaseProfile;

    static async buildCharacterArgs(
        raw: RawCharacterAsset,
        resolver: AsyncAssetResolver,
    ): Promise<CharacterCoreBuilder> {
        return {
            ...(await super.buildCreatureArgs(raw, resolver)),
            active: raw.active,
        };
    }
}

export { CharacterCore, type CharacterCoreBuilder };
