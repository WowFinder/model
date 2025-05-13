import { JsonExportable } from '@wowfinder/ts-utils';
import { Time } from '../../Scalar';
import {
    addVitalBonus,
    maxVitalsBonus,
    multiplyVitalsBonus,
    buildVitalsBonusArgs,
} from './helpers';
import { type RawVitals } from '@wowfinder/asset-schemas';

type VitalsBonusBuilder = {
    sleepTimeReduction?: Time;
    sleepCycleBonus?: Time;
    breathHoldingTimeBonus?: Time;
    breathRecoveryTimeReduction?: Time;
    maxHpBonus?: number;
    maxSanityBonus?: number;
};

class VitalsBonus implements VitalsBonusBuilder, JsonExportable<RawVitals> {
    // https://github.com/WowFinder/model/issues/210:
    // retype and implement arithmetics
    // ex: eat should be measured in rations/TimeUnit
    // See src/Profile/VitalsProfile.ts
    readonly #sleepTimeReduction: Time;
    readonly #sleepCycleBonus: Time;
    readonly #breathHoldingTimeBonus: Time;
    readonly #breathRecoveryTimeReduction: Time;
    readonly #maxHpBonus: number;
    readonly #maxSanityBonus: number;

    constructor({
        sleepTimeReduction = Time.zero,
        sleepCycleBonus = Time.zero,
        breathHoldingTimeBonus = Time.zero,
        breathRecoveryTimeReduction = Time.zero,
        maxHpBonus = 0,
        maxSanityBonus = 0,
    }: VitalsBonusBuilder = {}) {
        this.#sleepTimeReduction = sleepTimeReduction;
        this.#sleepCycleBonus = sleepCycleBonus;
        this.#breathHoldingTimeBonus = breathHoldingTimeBonus;
        this.#breathRecoveryTimeReduction = breathRecoveryTimeReduction;
        this.#maxHpBonus = maxHpBonus;
        this.#maxSanityBonus = maxSanityBonus;
    }

    get sleepTimeReduction(): Time {
        return this.#sleepTimeReduction;
    }

    get sleepCycleBonus(): Time {
        return this.#sleepCycleBonus;
    }

    get breathHoldingTimeBonus(): Time {
        return this.#breathHoldingTimeBonus;
    }

    get breathRecoveryTimeReduction(): Time {
        return this.#breathRecoveryTimeReduction;
    }

    get maxHpBonus(): number {
        return this.#maxHpBonus;
    }

    get maxSanityBonus(): number {
        return this.#maxSanityBonus;
    }

    get isZero(): boolean {
        return (
            this.#sleepTimeReduction.isZero &&
            this.#sleepCycleBonus.isZero &&
            this.#breathHoldingTimeBonus.isZero &&
            this.#breathRecoveryTimeReduction.isZero &&
            this.#maxHpBonus === 0 &&
            this.#maxSanityBonus === 0
        );
    }

    export(): RawVitals {
        return {
            sleepTimeReduction: this.#sleepTimeReduction.toString(),
            sleepCycleBonus: this.#sleepCycleBonus.toString(),
            breathHoldingTimeBonus: this.#breathHoldingTimeBonus.toString(),
            breathRecoveryTimeReduction:
                this.#breathRecoveryTimeReduction.toString(),
            maxHpBonus: this.#maxHpBonus,
            maxSanityBonus: this.#maxSanityBonus,
        };
    }

    static get zero(): VitalsBonus {
        return new VitalsBonus({});
    }

    static sum(...args: VitalsBonus[]): VitalsBonus {
        return new VitalsBonus(addVitalBonus(...args));
    }

    static multiply(vitalsBonus: VitalsBonus, multiplier: number): VitalsBonus {
        return new VitalsBonus(multiplyVitalsBonus(vitalsBonus, multiplier));
    }

    static max(...args: VitalsBonus[]): VitalsBonus {
        return new VitalsBonus(maxVitalsBonus(...args));
    }

    static build(raw: Partial<RawVitals>): VitalsBonus {
        return new VitalsBonus(buildVitalsBonusArgs(raw));
    }
}

export type { VitalsBonusBuilder };
export { VitalsBonus };
