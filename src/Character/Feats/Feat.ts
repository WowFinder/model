import { capitalizeFirstLetter } from '@wowfinder/ts-utils';
import { CoreFeat } from './core';
import {
    ExoticWeaponProficiency,
    MartialWeaponProficiency,
    SimpleWeaponProficiency,
} from '@wowfinder/ts-enums';

type WeaponKey =
    | SimpleWeaponProficiency
    | MartialWeaponProficiency
    | ExoticWeaponProficiency;

const prof = 'proficiency';
const focus = 'weaponFocus';
const gFocus = 'greaterWeaponFocus';
const spec = 'weaponSpecialization';
const gSpec = 'greaterWeaponSpecialization';

type WeaponFeatKeyPrefix =
    | typeof prof
    | typeof focus
    | typeof gFocus
    | typeof spec
    | typeof gSpec;

const weaponFeats: {
    [key in `${WeaponFeatKeyPrefix}${Capitalize<WeaponKey>}`]?: string;
} = {};

const capitalize = (key: WeaponKey): Capitalize<WeaponKey> => {
    return capitalizeFirstLetter(key) as Capitalize<WeaponKey>;
};

const profKeys = {
    simple: Object.keys(SimpleWeaponProficiency),
    martial: Object.keys(MartialWeaponProficiency),
    exotic: Object.keys(ExoticWeaponProficiency),
} as const;

const nonSimple = [...profKeys.martial, ...profKeys.exotic];
const allWeapons = [
    ...profKeys.simple,
    ...profKeys.martial,
    ...profKeys.exotic,
];

for (const p of nonSimple) {
    const w = capitalize(p as WeaponKey);
    weaponFeats[`${prof}${w}`] = `${prof}${w}`;
}

for (const p of allWeapons) {
    const w = capitalize(p as WeaponKey);
    weaponFeats[`${focus}${w}`] = `${focus}${w}`;
    weaponFeats[`${gFocus}${w}`] = `${gFocus}${w}`;
    weaponFeats[`${spec}${w}`] = `${spec}${w}`;
    weaponFeats[`${gSpec}${w}`] = `${gSpec}${w}`;
}

const Feat = {
    ...CoreFeat,
    ...weaponFeats,
} as const;

type WeaponFeat = keyof typeof weaponFeats;
type Feat = keyof typeof Feat;

export { Feat, weaponFeats };
export type { WeaponFeat, WeaponKey, WeaponFeatKeyPrefix };
