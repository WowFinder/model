import { Skill, Stat } from '@wowfinder/ts-enums';
import { SkillSpec } from './SkillSpec';
import { SkillTotalBuilder } from './builders';
import { statMod, baseDefault } from '../Stats';

const classTrainedBonus = 3;

type TotalArguments = Partial<SkillTotalBuilder> & { spec: SkillSpec };

function computeSkillTotal({
    spec,
    stats = baseDefault,
    ranks = {},
    byClass = [],
    acp = 0,
    size = 0,
}: TotalArguments): number | null {
    const isClass = byClass.includes(spec.key);
    const tRanks = ranks[spec.key] ?? 0;
    const isTrained = tRanks > 0;
    const trainedBonus = isClass && isTrained ? classTrainedBonus : 0;
    if (spec.trainedOnly && !isTrained && !isClass) {
        return null;
    }
    const primary = stats[spec.primary];
    const secondary: number | null = spec.secondary
        ? stats[spec.secondary]
        : null;
    const statValue: number = Math.max(
        primary,
        secondary ?? Number.NEGATIVE_INFINITY,
    );
    const statBonus: number = statMod(statValue);

    // TODO #434: Racial, Gear, Misc, Temp
    return (
        statBonus +
        tRanks +
        trainedBonus +
        spec.acp * acp +
        spec.sizeModFactor * size
    );
}

function mkSkill(
    key: Skill,
    primary: Stat,
    secondary: Stat | null = null,
    trainedOnly = false,
    sizeModFactor = 0,
): SkillSpec {
    return new SkillSpec({
        key,
        primary,
        secondary,
        trainedOnly,
        sizeModFactor,
    });
}

function mkCraft(key: Skill): SkillSpec {
    return mkSkill(key, Stat.intelligence, Stat.dexterity, true);
}

function mkLore(key: Skill): SkillSpec {
    return mkSkill(key, Stat.intelligence, Stat.wisdom, true);
}

function mkProfession(key: Skill): SkillSpec {
    return mkSkill(key, Stat.wisdom, Stat.intelligence, true);
}

function mkPerform(key: Skill): SkillSpec {
    return mkSkill(key, Stat.charisma);
}

export {
    classTrainedBonus,
    computeSkillTotal,
    mkCraft,
    mkLore,
    mkPerform,
    mkProfession,
    mkSkill,
};
