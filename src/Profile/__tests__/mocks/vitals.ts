import { type Counter, mkCounter } from '@wowfinder/ts-utils';
import { type VitalsProfile } from '../../VitalsProfile';

function mkHp(): Counter {
    return mkCounter({ max: 20, current: 10 });
}

function mkSanity(): Counter {
    return mkCounter({ max: 10, current: 5 });
}

function mkVitalsProfile({
    breath,
    sleep,
}: Pick<VitalsProfile, 'breath' | 'sleep'>): VitalsProfile {
    return {
        hp: mkHp(),
        sanity: mkSanity(),
        breath: breath,
        sleep: sleep,
    };
}

export { mkHp, mkSanity, mkVitalsProfile };
