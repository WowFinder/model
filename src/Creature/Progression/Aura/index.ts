import { Aura } from '@wowfinder/ts-enums';
import { AuraBonus } from './base';

type AuraEntry = {
    level: number;
    aura: Aura;
};

type AurasList = {
    level: number;
    aura: Aura;
}[];

export { auraBonuses } from './bonuses';
export type { AuraBonus, AuraEntry, AurasList };
