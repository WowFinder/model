import { RawSkills } from '@wowfinder/asset-schemas';
import { Skill } from '@wowfinder/ts-enums';
import { JsonCompatible, JsonExportable, sum } from '@wowfinder/ts-utils';
import { SkillsBonusMapped } from './SkillsBonusMapped';

class SkillsBonus
    extends SkillsBonusMapped
    implements JsonExportable<RawSkills>
{
    // eslint can't detect the access level change in this override
    /* eslint-disable-next-line  no-useless-constructor */
    constructor(raw: Partial<RawSkills>) {
        super(raw);
    }

    get isZero(): boolean {
        return Object.values(this.raw).every(v => v === 0);
    }

    export(): JsonCompatible<RawSkills> {
        return { ...this.raw };
    }

    static get zero(): SkillsBonus {
        return new SkillsBonus({});
    }

    static sum(...args: SkillsBonus[]): SkillsBonus {
        const builder: Partial<RawSkills> = {};
        for (const skill of Object.keys(Skill)) {
            builder[skill as Skill] = sum(
                ...args.map(s => s.raw[skill as Skill]),
            );
        }
        return new SkillsBonus(builder);
    }

    static max(...args: SkillsBonus[]): SkillsBonus {
        const builder: Partial<RawSkills> = {};
        for (const strSkill of Object.keys(Skill)) {
            const skill = strSkill as Skill;
            const mapped = args.map(s => s.raw[skill]);
            builder[skill] = Math.max(...mapped);
        }
        return new SkillsBonus(builder);
    }

    static multiply(bonus: SkillsBonus, factor: number): SkillsBonus {
        const result = this.zero;
        for (const skill of Object.keys(Skill)) {
            result.raw[skill as Skill] = bonus.raw[skill as Skill] * factor;
        }
        return result;
    }
}

export { SkillsBonus };
