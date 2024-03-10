import { Skill, Stat } from '@wowfinder/ts-enums';
import { SkillSpecBuilder, SkillTotalBuilder } from './builders';
import { computeSkillTotal } from './helpers';

class SkillSpec {
    #key: Skill;
    #primary: Stat;
    #secondary: Stat | null;
    #trainedOnly: boolean;
    #sizeModFactor: number;

    constructor({
        key,
        primary,
        secondary = null,
        trainedOnly = false,
        sizeModFactor = 0,
    }: SkillSpecBuilder) {
        this.#key = key;
        this.#primary = primary;
        this.#secondary = secondary;
        this.#trainedOnly = trainedOnly;
        this.#sizeModFactor = sizeModFactor;
        Object.freeze(this);
    }

    get key(): Skill {
        return this.#key;
    }

    get primary(): Stat {
        return this.#primary;
    }

    get secondary(): Stat | null {
        return this.#secondary;
    }

    get trainedOnly(): boolean {
        return this.#trainedOnly;
    }

    get acp(): number {
        return this.#primary === Stat.strength ||
            this.#primary === Stat.dexterity
            ? 1
            : 0;
    }

    get sizeModFactor(): number {
        return this.#sizeModFactor;
    }

    total(args: SkillTotalBuilder): number | null {
        return computeSkillTotal({
            spec: this,
            ...args,
        });
    }
}

export { SkillSpec };
