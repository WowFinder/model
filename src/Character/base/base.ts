/* eslint-disable deprecation/deprecation */
import { Resistances } from '../Resistances';
import { CharacterBaseBuilder, CharacterBaseExport } from './builder';
import {
    FeatChoice,
    checkRace,
    exportFeatchChoices,
    parseFeatChoices,
} from '../helpers';
import { parseSize } from '../../Creature/Size';
import { Speeds } from '../../Creature/Speeds';
import {
    EffectiveCasterLevels,
    buildCasterLevels,
    zeroCasterLevel,
} from '../../Magic';
import { Size } from '@wowfinder/ts-enums';
import { RawStats } from '@wowfinder/asset-schemas';

/* istanbul ignore next: deprecation (effort should be placed in removing this, rather than covering) */
/** @deprecated */
abstract class CharacterBase {
    readonly #key: string;
    readonly #featChoices: FeatChoice[];
    readonly #miscHP?: number;
    readonly #baseStats: RawStats;
    readonly #baseResistances: Resistances;
    readonly #size: Size;
    readonly #speeds: Speeds;
    readonly #naturalArmor: number;
    readonly #casterLevelsBonus: EffectiveCasterLevels;

    constructor(builder: CharacterBaseBuilder) {
        this.#key = builder.key;
        this.#featChoices = parseFeatChoices([...(builder.featChoices ?? [])]);
        this.#miscHP = builder.miscHP ?? 0;
        this.#baseStats = builder.baseStats;
        this.#baseResistances = builder.baseResistances
            ? new Resistances(builder.baseResistances)
            : Resistances.zero;
        if (builder.builderType === 'race') {
            const race = checkRace(builder.race);
            this.#size = race.size;
            this.#speeds = race.speeds;
            this.#naturalArmor = race.naturalArmor;
            this.#casterLevelsBonus = { ...zeroCasterLevel };
        } else {
            this.#size = parseSize(builder.size) ?? Size.medium;
            this.#speeds = builder.speeds
                ? new Speeds(builder.speeds)
                : Speeds.default;
            this.#naturalArmor = builder.naturalArmor ?? 0;
            this.#casterLevelsBonus = buildCasterLevels(
                builder.casterLevels ?? {},
            );
        }
    }

    get key(): string {
        return this.#key;
    }

    get feats(): FeatChoice[] {
        return this.#featChoices;
    }

    get miscHP(): number | undefined {
        return this.#miscHP;
    }

    get baseStats(): RawStats {
        return this.#baseStats;
    }

    get baseResistances(): Resistances {
        return this.#baseResistances;
    }

    get size(): Size {
        return this.#size;
    }

    get speeds(): Speeds {
        return this.#speeds;
    }

    get naturalArmor(): number {
        return this.#naturalArmor;
    }

    get casterLevelsBonus(): EffectiveCasterLevels {
        return { ...this.#casterLevelsBonus };
    }

    export(): CharacterBaseExport {
        return {
            key: this.#key,
            featChoices: exportFeatchChoices(...this.#featChoices),
            miscHP: this.#miscHP ?? null,
            baseStats: this.#baseStats,
            baseResistances: this.#baseResistances.export(),
            size: this.#size,
            naturalArmor: this.#naturalArmor,
        };
    }
}

export { CharacterBase };
