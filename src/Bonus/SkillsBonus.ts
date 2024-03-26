import { RawSkills } from '@wowfinder/asset-schemas';
import { Skill } from '@wowfinder/ts-enums';
import { sum } from '@wowfinder/ts-utils';

const rawZeroSkills: RawSkills = Object.keys(Skill).reduce((acc, key) => {
    acc[key as Skill] = 0;
    return acc;
}, {} as RawSkills);

class SkillsBonus {
    #raw: RawSkills;

    constructor(raw: Partial<RawSkills>) {
        this.#raw = { ...rawZeroSkills, ...raw };
    }

    get raw(): RawSkills {
        return { ...this.#raw };
    }

    get isZero(): boolean {
        return Object.values(this.#raw).every(v => v === 0);
    }

    static get zero(): SkillsBonus {
        return new SkillsBonus({});
    }

    static sum(...args: SkillsBonus[]): SkillsBonus {
        const result = this.zero;
        for (const skill of Object.keys(Skill)) {
            result.#raw[skill as Skill] = sum(
                ...args.map(s => s.#raw[skill as Skill]),
            );
        }
        return result;
    }

    static max(...args: SkillsBonus[]): SkillsBonus {
        const result = this.zero;
        for (const skill of Object.keys(Skill)) {
            result.#raw[skill as Skill] = Math.max(
                ...args.map(s => s.#raw[skill as Skill]),
            );
        }
        return result;
    }

    static multiply(bonus: SkillsBonus, factor: number): SkillsBonus {
        const result = this.zero;
        for (const skill of Object.keys(Skill)) {
            result.#raw[skill as Skill] = bonus.#raw[skill as Skill] * factor;
        }
        return result;
    }
}

export { SkillsBonus };
