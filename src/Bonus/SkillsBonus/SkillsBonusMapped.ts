/* eslint-ignore-file max-lines */
// It is not reasonable to make this file smaller: the game has 51 skills, so 51 accessors are needed.

import { RawSkills } from '@wowfinder/asset-schemas';
import { SkillsBonusBase } from './SkillsBonusBase';

abstract class SkillsBonusMapped extends SkillsBonusBase implements RawSkills {
    get acrobatics(): number {
        return this.raw.acrobatics;
    }

    get appraise(): number {
        return this.raw.appraise;
    }

    get athletics(): number {
        return this.raw.athletics;
    }

    get bluff(): number {
        return this.raw.bluff;
    }

    get alchemy(): number {
        return this.raw.alchemy;
    }

    get blacksmithing(): number {
        return this.raw.blacksmithing;
    }

    get cooking(): number {
        return this.raw.cooking;
    }

    get inscription(): number {
        return this.raw.inscription;
    }

    get jewelcrafting(): number {
        return this.raw.jewelcrafting;
    }

    get leatherworking(): number {
        return this.raw.leatherworking;
    }

    get tailoring(): number {
        return this.raw.tailoring;
    }

    get technology(): number {
        return this.raw.technology;
    }

    get woodworking(): number {
        return this.raw.woodworking;
    }

    get diplomacy(): number {
        return this.raw.diplomacy;
    }

    get disarm(): number {
        return this.raw.disarm;
    }

    get disguise(): number {
        return this.raw.disguise;
    }

    get escape(): number {
        return this.raw.escape;
    }

    get handleAnimal(): number {
        return this.raw.handleAnimal;
    }

    get heal(): number {
        return this.raw.heal;
    }

    get intimidate(): number {
        return this.raw.intimidate;
    }

    get linguistics(): number {
        return this.raw.linguistics;
    }

    get arcane(): number {
        return this.raw.arcane;
    }

    get dungeons(): number {
        return this.raw.dungeons;
    }

    get engineering(): number {
        return this.raw.engineering;
    }

    get geography(): number {
        return this.raw.geography;
    }

    get history(): number {
        return this.raw.history;
    }

    get nature(): number {
        return this.raw.nature;
    }

    get nobility(): number {
        return this.raw.nobility;
    }

    get planes(): number {
        return this.raw.planes;
    }

    get religion(): number {
        return this.raw.religion;
    }

    get perception(): number {
        return this.raw.perception;
    }

    get act(): number {
        return this.raw.act;
    }

    get comedy(): number {
        return this.raw.comedy;
    }

    get dance(): number {
        return this.raw.dance;
    }

    get keyboard(): number {
        return this.raw.keyboard;
    }

    get percussion(): number {
        return this.raw.percussion;
    }

    get sing(): number {
        return this.raw.sing;
    }

    get speech(): number {
        return this.raw.speech;
    }

    get string(): number {
        return this.raw.string;
    }

    get wind(): number {
        return this.raw.wind;
    }

    get butchery(): number {
        return this.raw.butchery;
    }

    get enchanting(): number {
        return this.raw.enchanting;
    }

    get fishing(): number {
        return this.raw.fishing;
    }

    get herbalism(): number {
        return this.raw.herbalism;
    }

    get lumbering(): number {
        return this.raw.lumbering;
    }

    get mining(): number {
        return this.raw.mining;
    }

    get skinning(): number {
        return this.raw.skinning;
    }

    get ride(): number {
        return this.raw.ride;
    }

    get senseMotive(): number {
        return this.raw.senseMotive;
    }

    get sleight(): number {
        return this.raw.sleight;
    }

    get stealth(): number {
        return this.raw.stealth;
    }
}

export { SkillsBonusMapped };
