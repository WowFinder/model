import { type MultiBonus } from '../Bonus';
import {
    type ClassEntries,
    type PersonalDetails,
    type Race,
} from '../Creature';
import { type Inventory } from '../Item/Inventory';
import {
    type CreatureBaseProfileOverride,
    type CreatureBaseProfile,
} from '../Profile';

type CharacterBaseInterface = {
    // TODO: model choices for character creation and progression
    get key(): string;
    get personal(): PersonalDetails;
    get baseProfile(): CreatureBaseProfile;
    get overrides(): CreatureBaseProfileOverride[];
    set overrides(overrides: CreatureBaseProfileOverride[]);
    get race(): Race;
    // Note: getter only, but mutable type
    get classProgression(): ClassEntries;
    // TODO: Templates
    get inventory(): Inventory;
    get totalBonuses(): MultiBonus;
    get totalProfile(): CreatureBaseProfile;
};

export { type CharacterBaseInterface };
