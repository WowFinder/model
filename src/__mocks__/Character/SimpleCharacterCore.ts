import {
    CharacterCore,
    type CharacterCoreBuilder,
} from '../../Character/CharacterCore';
import {
    type CreatureProfileOverride,
    type CreatureProfile,
} from '../../Profile';
import { Inventory } from '../../Item/Inventory';
import { MultiBonus } from '../../Bonus';
import { mockBasicCreatureProfile, mockedRaceRawAsset } from '../Creature';
import { Race } from '../../Creature';

type CharacterCoreMockArgs = CharacterCoreBuilder & {
    baseProfile: CreatureProfile;
};

class CharacterCoreMockImpl extends CharacterCore {
    readonly #baseProfile;
    #overrides: CreatureProfileOverride[] = [];
    #inventory: Inventory = new Inventory({});

    constructor({ baseProfile, ...args }: CharacterCoreMockArgs) {
        super(args);
        this.#baseProfile = baseProfile;
    }

    get baseProfile(): CreatureProfile {
        return this.#baseProfile;
    }
    get overrides(): CreatureProfileOverride[] {
        return this.#overrides;
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
        return MultiBonus.zero;
    }
    get totalProfile(): CreatureProfile {
        return this.baseProfile;
    }
}

const mockSimpleCharacterCore: CharacterCore = new CharacterCoreMockImpl({
    baseProfile: mockBasicCreatureProfile,
    active: true,
    key: 'simple-character',
    baseStats: mockBasicCreatureProfile.stats,
    personal: mockBasicCreatureProfile.personal,
    race: new Race(mockedRaceRawAsset),
});

export { mockSimpleCharacterCore };
