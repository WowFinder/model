import {
    School,
    SpellDescriptor,
    SpellFlag,
    SubSchool,
} from '@wowfinder/ts-enums';
import { fullParseSchool } from '../School';
import { SpellBase } from './base';
import { SpellRank } from './Rank';
import { RankedSpell, RankedSpellBuilder } from './RankedSpell';
import { RawSpellAsset } from '@wowfinder/asset-schemas';
import { parseIfNeeded } from '@wowfinder/ts-utils';
import { SpellComponent, parseSpellComponent } from './Components';
import { parseValidSpellDescriptors } from './Descriptor';
import { parseValidFlags } from './Flags';

type Spells = { [key: string]: Spell };

function getFirstDefined<T>(
    failMessage: string,
    ...args: (T | undefined)[]
): T {
    for (const arg of args) {
        if (arg !== undefined) {
            return arg;
        }
    }
    throw new Error(failMessage);
}

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
        this.#ranks = ranks.map(rank => new SpellRank(rank));
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
            rankAssert(
                !!rank.castingTime || !!this.castingTime,
                'Missing casting time',
            );
            rankAssert(!!rank.range || !!this.range, 'Missing range');
            rankAssert(!!rank.duration || !!this.duration, 'Missing duration');
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
        const getProp = <T>(prop: keyof SpellRank & keyof Spell): T => {
            return getFirstDefined<T>(
                `Missing ${prop} for ${this.#key}:${rank}`,
                rankObj[prop] as T,
                this[prop] as T,
            );
        };
        const builder = {
            key: this.#key,
            rank,
            area: (rankObj.area ?? this.area) as any,
            castingTime: getProp('castingTime'),
            components: this.#components as any,
            descriptors: [...this.#descriptors],
            duration: getProp('duration'),
            range: getProp('range'),
            flags: [...this.#flags],
            school: this.school,
        } satisfies RankedSpellBuilder;
        return new RankedSpell(builder);
    }

    get fullRanks(): RankedSpell[] {
        return this.#ranks.map(rank => this.getRank(rank.rank));
    }

    static build(raw: any): Spell {
        return new Spell(raw);
    }

    static load(/* reThrowErrors = false */): Spells {
        throw new Error('Not implemented');
    }

    static byKey(key: string): Spell;
    static byKey(key: string, rank: number): RankedSpell;
    static byKey(key: string, rank?: number): Spell | RankedSpell {
        const spell = this.load()[key];
        if (!spell) {
            throw new Error(`Invalid spell key: ${key}`);
        }
        return rank === undefined ? spell : spell.getRank(rank);
    }
}

export { Spell };
