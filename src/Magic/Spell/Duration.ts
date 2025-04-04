import { Debugger, StringFormatter } from '@wowfinder/ts-utils';
import { Time } from '../../Scalar';

type FixedSpellDuration = {
    durationType: 'fixed';
    duration: Time;
};

type PerLevelSpellDuration = {
    durationType: 'perLevel';
    duration: Time;
};

type SpellDuration =
    | 'special'
    | 'instantaneous'
    | 'permanent'
    | 'concentration'
    | FixedSpellDuration
    | PerLevelSpellDuration;

function stringify(value: SpellDuration, t: StringFormatter): string {
    if (value === 'special') {
        return t('magic.duration.special');
    } else if (value === 'instantaneous') {
        return t('magic.duration.instantaneous');
    } else if (value === 'permanent') {
        return t('magic.duration.permanent');
    } else if (value === 'concentration') {
        return t('magic.duration.concentration');
    } else if (value.durationType === 'fixed') {
        return t('magic.duration.fixed', { duration: value.duration });
    } else if (value.durationType === 'perLevel') {
        return t('magic.duration.perLevel', { duration: value.duration });
    } else {
        return Debugger.unreachable(value);
    }
}

function tryParseSpellDuration(input: string): SpellDuration | undefined {
    if (input === 'special') {
        return 'special';
    } else if (input === 'instantaneous') {
        return 'instantaneous';
    } else if (input === 'permanent') {
        return 'permanent';
    } else if (input === 'concentration') {
        return 'concentration';
    }
    const levelMatches = /^(.*)\/level$/.exec(input);
    if (levelMatches) {
        const duration = Time.tryParseTime(levelMatches[1]);
        return duration ? { durationType: 'perLevel', duration } : undefined;
    }
    const fixedDuration = Time.tryParseTime(input);
    if (fixedDuration) {
        return { durationType: 'fixed', duration: fixedDuration };
    }
    return undefined;
}

export { type SpellDuration, stringify, tryParseSpellDuration };
