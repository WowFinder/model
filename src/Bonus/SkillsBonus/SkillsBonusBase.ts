import { RawSkills } from '@wowfinder/asset-schemas';
import { Skill } from '@wowfinder/ts-enums';

const rawZeroSkills: RawSkills = Object.keys(Skill).reduce((acc, key) => {
    acc[key as Skill] = 0;
    return acc;
}, {} as RawSkills);

type ReRaw = Partial<RawSkills> | (Partial<RawSkills> & { raw: ReRaw });

function deRaw(raw: ReRaw): RawSkills {
    while ((raw as any).raw) {
        raw = (raw as any).raw;
    }
    return raw as RawSkills;
}

abstract class SkillsBonusBase {
    protected raw: RawSkills;

    protected constructor(raw: Partial<RawSkills>) {
        raw = deRaw(raw);
        this.raw = { ...rawZeroSkills, ...raw };
    }
}

export { SkillsBonusBase };
