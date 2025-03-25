import { Skill } from '@wowfinder/ts-enums';

type FullSkillSetGeneric<T> = { [key in Skill]: T };
type SkillSetGeneric<T> = Partial<FullSkillSetGeneric<T>>;
type SkillSet = SkillSetGeneric<number>;

export { Skills } from './Skills';

export type { SkillSetGeneric, FullSkillSetGeneric, SkillSet };
