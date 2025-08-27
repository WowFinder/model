import {
    School,
    SpellDescriptor,
    SpellFlag,
    SubSchool,
} from '@wowfinder/ts-enums';
import { fullParseSchool } from '../School';
import { SpellBase } from './base';
import { SpellRank } from './Rank';
import { RankedSpell, type RankedSpellBuilder } from './RankedSpell';
import { RawSpellAsset } from '@wowfinder/asset-schemas';
import { assertDefined, parseIfNeeded } from '@wowfinder/ts-utils';
import { SpellComponent, parseSpellComponent } from './Components';
import { parseValidSpellDescriptors } from './Descriptor';
import { parseValidFlags } from './Flags';

class Spell extends SpellBase {
    readonly #key: string;
    readonly #ranks: SpellRank[];
    readonly #subSchool?: SubSchool;
    readonly #school: School;
    readonly #descriptors: Set<SpellDescriptor>;
    readonly #components: SpellComponent[];
    readonly #flags: Set<SpellFlag>;

    constructor({
        key,
        ranks,
        school,
        descriptors = [],
        components = [],
        flags = [],
        ...rest
    }: RawSpellAsset) {
        super(rest);
        this.#key = key;
        this.#ranks = ranks.map(rank => new SpellRank({ ...rest, ...rank }));
        this.#descriptors = new Set(parseValidSpellDescriptors(descriptors));
        this.#components = components.map(c =>
            parseIfNeeded(c, parseSpellComponent),
        );
        this.#flags = new Set(parseValidFlags(flags));
        for (const rank of this.#ranks) {
            const rankAssert = (condition: boolean, message: string): void => {
                if (!condition) {
                    throw new Error(
                        `Invalid spell definition for ${this.#key}:${rank.rank}: ${message}`,
                    );
                }
            };
            rankAssert(!!rank.castingTime, 'Missing casting time');
            rankAssert(!!rank.range, 'Missing range');
            rankAssert(!!rank.duration, 'Missing duration');
        }
        const schoolParsed = fullParseSchool(school ?? '');
        if (!schoolParsed) {
            throw new Error(`Invalid school: ${school}`);
        }
        this.#school = schoolParsed.school;
        this.#subSchool = schoolParsed.subSchool;
    }

    get key(): string {
        return this.#key;
    }

    getFullName(t: any /* TFunction<'translation'> */): string {
        return t(`spells.${this.key}.name`);
    }

    getDescription(t: any /*  TFunction<'translation'> */): string {
        return t(`spells.${this.key}.description`);
    }

    get ranks(): SpellRank[] {
        return [...this.#ranks];
    }

    get school(): School {
        return this.#school;
    }

    get subschool(): SubSchool | undefined {
        return this.#subSchool;
    }

    get schoolDescription(): SubSchool | School {
        return this.#subSchool ?? this.#school;
    }

    get descriptors(): SpellDescriptor[] {
        return [...this.#descriptors];
    }

    get components(): SpellComponent[] {
        return [...this.#components];
    }

    get flags(): SpellFlag[] {
        return [...this.#flags];
    }

    getRank(rank: number): RankedSpell {
        const rankObj = this.#ranks.find(r => r.rank === rank);
        if (!rankObj) {
            throw new Error(`Invalid rank ${rank} for ${this.#key}`);
        }

        assertDefined(rankObj.area, `Missing area for ${this.#key}:${rank}`);
        assertDefined(
            rankObj.castingTime,
            `Missing casting time for ${this.#key}:${rank}`,
        );
        assertDefined(
            rankObj.duration,
            `Missing duration for ${this.#key}:${rank}`,
        );
        assertDefined(rankObj.range, `Missing range for ${this.#key}:${rank}`);
        const builder = {
            // TODO: This may break if / when area and/or components are not really strings
            //   Ideally, the fix should be made in RankedSpell to accept pre-built args
            key: this.#key,
            rank,
            area: rankObj.area,
            castingTime: rankObj.castingTime,
            components: this.#components,
            descriptors: [...this.#descriptors],
            duration: rankObj.duration,
            range: rankObj.range,
            flags: [...this.#flags],
            school: this.school,
        } satisfies RankedSpellBuilder;
        return new RankedSpell(builder);
    }

    get fullRanks(): RankedSpell[] {
        return this.#ranks.map(rank => this.getRank(rank.rank));
    }
}

export { Spell };
