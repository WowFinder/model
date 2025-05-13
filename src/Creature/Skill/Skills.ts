import { Skill, Stat } from '@wowfinder/ts-enums';
import { SkillSpec } from './SkillSpec';
import { mkCraft, mkLore, mkPerform, mkProfession, mkSkill } from './makers';
import { RawSkills } from '@wowfinder/asset-schemas';

const Skills: { [key in Skill]: SkillSpec } = {
    acrobatics: mkSkill(Skill.acrobatics, Stat.dexterity, null, false, -2),
    athletics: mkSkill(Skill.athletics, Stat.strength),
    appraise: mkSkill(Skill.appraise, Stat.intelligence),
    bluff: mkSkill(Skill.bluff, Stat.charisma),
    alchemy: mkCraft(Skill.alchemy),
    blacksmithing: mkCraft(Skill.blacksmithing),
    cooking: mkCraft(Skill.cooking),
    inscription: mkCraft(Skill.inscription),
    jewelcrafting: mkCraft(Skill.jewelcrafting),
    leatherworking: mkCraft(Skill.leatherworking),
    tailoring: mkCraft(Skill.tailoring),
    technology: mkCraft(Skill.technology),
    woodworking: mkCraft(Skill.woodworking),
    diplomacy: mkSkill(Skill.diplomacy, Stat.charisma),
    disarm: mkSkill(Skill.disarm, Stat.dexterity, null, true),
    disguise: mkSkill(Skill.disguise, Stat.charisma),
    escape: mkSkill(Skill.escape, Stat.dexterity, null, false, -2),
    handleAnimal: mkSkill(Skill.handleAnimal, Stat.charisma),
    heal: mkSkill(Skill.heal, Stat.wisdom),
    intimidate: mkSkill(
        Skill.intimidate,
        Stat.charisma,
        Stat.strength,
        false,
        2,
    ),
    linguistics: mkSkill(Skill.linguistics, Stat.intelligence, null, true),
    arcane: mkLore(Skill.arcane),
    dungeons: mkLore(Skill.dungeons),
    engineering: mkLore(Skill.engineering),
    geography: mkLore(Skill.geography),
    history: mkLore(Skill.history),
    nature: mkLore(Skill.nature),
    nobility: mkLore(Skill.nobility),
    planes: mkLore(Skill.planes),
    religion: mkLore(Skill.religion),
    perception: mkSkill(Skill.perception, Stat.wisdom),
    act: mkPerform(Skill.act),
    comedy: mkPerform(Skill.comedy),
    dance: mkPerform(Skill.dance),
    keyboard: mkPerform(Skill.keyboard),
    percussion: mkPerform(Skill.percussion),
    sing: mkPerform(Skill.sing),
    speech: mkPerform(Skill.speech),
    string: mkPerform(Skill.string),
    wind: mkPerform(Skill.wind),
    butchery: mkProfession(Skill.butchery),
    enchanting: mkProfession(Skill.enchanting),
    fishing: mkProfession(Skill.fishing),
    herbalism: mkProfession(Skill.herbalism),
    lumbering: mkProfession(Skill.lumbering),
    mining: mkProfession(Skill.mining),
    skinning: mkProfession(Skill.skinning),
    ride: mkSkill(Skill.ride, Stat.dexterity),
    senseMotive: mkSkill(Skill.senseMotive, Stat.wisdom),
    sleight: mkSkill(Skill.sleight, Stat.dexterity, null, true),
    stealth: mkSkill(Skill.stealth, Stat.dexterity, null, false, -4),
};

function fillSkills(
    skills: Partial<RawSkills>,
    defaultValue: number = 0,
): RawSkills {
    const defaults = Object.keys(Skills).reduce((acc, key) => {
        const k = key as keyof RawSkills;
        acc[k] = defaultValue;
        return acc;
    }, {} as RawSkills);
    return {
        ...defaults,
        ...skills,
    };
}

export { Skills, fillSkills };
