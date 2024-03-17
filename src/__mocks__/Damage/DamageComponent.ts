import { Stat } from '@wowfinder/ts-enums';
import { DamageComponentSpecBuilder } from 'Damage';
import { mockMindBurnFullDamageTypes } from './DamageType';

const damageComponentSpecBuilder: DamageComponentSpecBuilder = {
    // 2d6+3 + strength
    // Min roll: 5 ± [STR]
    // Max roll: 15 ± [STR]
    types: mockMindBurnFullDamageTypes,
    diceCount: 2,
    diceSides: 6,
    fixedMod: 3,
    modStat: Stat.strength,
};

export { damageComponentSpecBuilder };
