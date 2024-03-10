import {
    StringFormatter,
    assertDefined,
    Optional,
    toRoman,
} from '@wowfinder/ts-utils';
import { School, SubSchool } from '@wowfinder/ts-enums';
import { fullParseSchool } from '../School';
import { SpellBase } from './base';
import { ActionTime } from '../../Action/ActionTime';
import { SpellDuration } from './Duration';
import { SpellRange } from './Range';
import { RawSpellAsset, RawSpellBase } from '@wowfinder/asset-schemas';

type RankedSpellBuilder = Omit<
    Optional<
        Required<RawSpellBase & RawSpellAsset>,
        'area' | 'target' | 'trigger' | 'save'
    >,
    'ranks'
> & { rank: number };

class RankedSpell extends SpellBase {
    #key: string;
    #rank: number;
    #subSchool?: SubSchool;
    #school: School;

    constructor({ key, rank, sch, ...rest }: RankedSpellBuilder) {
        super(rest);
        this.#key = key;
        this.#rank = rank;
        const schoolParsed = fullParseSchool(sch || '');
        if (!schoolParsed) {
            throw new Error(`Invalid school: ${sch}`);
        }
        this.#school = schoolParsed.school;
        this.#subSchool = schoolParsed.subSchool;
    }

    get key(): string {
        return this.#key;
    }

    get rank(): number {
        return this.#rank;
    }

    get castingTime(): ActionTime {
        const res = super.castingTime;
        assertDefined(
            res,
            `Missing casting time for ${this.key}:${this.#rank}`,
        );
        return res;
    }

    get range(): SpellRange {
        const res = super.range;
        assertDefined(res, `Missing range for ${this.key}:${this.#rank}`);
        return res;
    }

    get duration(): SpellDuration {
        const res = super.duration;
        assertDefined(res, `Missing duration for ${this.key}:${this.#rank}`);
        return res;
    }

    get sch(): SubSchool | School | string {
        return this.#subSchool ?? this.#school;
    }

    getFullName(t: StringFormatter): string {
        return `${t(this.key)} - ${toRoman(this.#rank)}`;
    }

    getDescription(t: StringFormatter): string {
        const descriptionMain = t(`spells.${this.key}.description`);
        const descriptionRank = t(`spells.${this.key}.${this.#rank}`);
        return `${descriptionMain}\n\n${descriptionRank}`;
    }
}

export type { RankedSpellBuilder };
export { RankedSpell };
