import type {
    School,
    SpellDescriptor,
    SpellFlag,
    SubSchool,
} from '@wowfinder/ts-enums';
import {
    PossiblyString,
    StringFormatter,
    assertDefined,
    toRoman,
} from '@wowfinder/ts-utils';
import type { ActionTime } from '../../Action/ActionTime';
import { fullParseSchool } from '../School';
import type { SpellDuration } from './Duration';
import type { SpellRange } from './Range';
import { SpellBase } from './base';
import { SpellComponent } from './Components';
import { SpellArea } from './Area';
import { SpellSave } from './SpellSave';

type RankedSpellBuilder = {
    key: string;
    rank: number;
    school: PossiblyString<School>;
    subSchool?: PossiblyString<SubSchool>;
    descriptors?: PossiblyString<SpellDescriptor>[];
    components?: PossiblyString<SpellComponent>[];
    castingTime: PossiblyString<ActionTime>;
    range: PossiblyString<SpellRange>;
    area: PossiblyString<SpellArea>;
    // effect: ???;
    // targets: SpellTarget[];
    duration: PossiblyString<SpellDuration>;
    save?: PossiblyString<SpellSave>;
    flags?: PossiblyString<SpellFlag>[];
};

class RankedSpell extends SpellBase {
    readonly #key: string;
    readonly #rank: number;
    readonly #subSchool?: SubSchool;
    readonly #school: School;

    constructor({ key, rank, school, ...rest }: RankedSpellBuilder) {
        super(rest);
        this.#key = key;
        this.#rank = rank;
        const schoolParsed = fullParseSchool(school || '');
        if (!schoolParsed) {
            throw new Error(`Invalid school: ${school}`);
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

    get school(): SubSchool | School | string {
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

export { RankedSpell, type RankedSpellBuilder };
