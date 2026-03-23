import { type MultiBonus } from '../Bonus';
import {
    type ClassEntries,
    type PersonalDetails,
    type Race,
} from '../Creature';
import { type Inventory } from '../Item/Inventory';
import { type CreatureProfileOverride, type CreatureProfile } from '../Profile';

type CharacterBaseInterface = {
    // https://github.com/WowFinder/model/issues/214: model choices for character creation and progression
    get key(): string;
    get personal(): PersonalDetails;
    get baseProfile(): CreatureProfile;
    get overrides(): CreatureProfileOverride[];
    set overrides(overrides: CreatureProfileOverride[]);
    get race(): Race;
    // Note: getter only, but mutable type
    get classProgression(): ClassEntries;
    // TODO: Templates
    get inventory(): Inventory;
    get totalBonuses(): MultiBonus;
    get totalProfile(): CreatureProfile;
};

export { type CharacterBaseInterface };
