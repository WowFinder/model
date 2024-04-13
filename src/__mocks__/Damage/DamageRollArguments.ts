import { DamageRollArguments } from '../../Damage/DamageRollArguments';
import {
    defaultStatsMock,
    goodFinesseStatsMock,
    badFinesseStatsMock,
} from '../Creature';

const rollArgsSimple: DamageRollArguments = {
    stats: { ...defaultStatsMock },
    casterLevel: 0,
    spellPower: 0,
};

const rollArgsBadStrength: DamageRollArguments = {
    stats: { ...goodFinesseStatsMock },
    casterLevel: 0,
    spellPower: 0,
};

const rollArgsFinesseSpell: DamageRollArguments = {
    stats: { ...goodFinesseStatsMock },
    casterLevel: 0,
    spellPower: 0,
    feats: ['weaponFinesse'],
};

const rollArgsBadFinnese: DamageRollArguments = {
    stats: { ...badFinesseStatsMock },
    casterLevel: 0,
    spellPower: 0,
    feats: ['weaponFinesse'],
};

export {
    rollArgsSimple,
    rollArgsFinesseSpell,
    rollArgsBadFinnese,
    rollArgsBadStrength,
};
