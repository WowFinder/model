/* eslint-disable deprecation/deprecation */
import { Size } from '@wowfinder/ts-enums';
import { Resistances } from '../Resistances';
import { baseDefault } from 'Creature/Stats';
import { CharacterBase } from './base';
import type { CharacterOverrideBuilder } from './builder';

/* istanbul ignore next: deprecation (effort should be placed in removing this, rather than covering) */
/** @deprecated */
class CharacterOverride extends CharacterBase {
    /* TODO: #433
        Support natural attacks (see #706)
        Support special abilities
        Support skill bonuses (general + conditional)
        Support deflection bonus to AC
     */

    constructor({ ...rest }: CharacterOverrideBuilder) {
        super({ ...rest, builderType: 'full' });
    }

    static get zero(): CharacterOverride {
        return new CharacterOverride({
            key: '',
            featChoices: [],
            baseStats: baseDefault,
            baseResistances: Resistances.zero,
            size: Size.medium,
        });
    }
}

export { CharacterOverride };
