import { type RawSpeeds } from '@wowfinder/asset-schemas';
import { type FlyManeuverability } from '@wowfinder/ts-enums';
import { type JsonCompatible, type JsonExportable } from '@wowfinder/ts-utils';
import { maxFlyManeuverability } from '../../Creature/Speeds';

type BaseSpeedsBonusBuilder = Partial<RawSpeeds>;

class BaseSpeedsBonus
    implements BaseSpeedsBonusBuilder, JsonExportable<BaseSpeedsBonusBuilder>
{
    readonly #base?: number;
    readonly #burrow?: number;
    readonly #climb?: number;
    readonly #swim?: number;
    readonly #fly?: number;
    readonly #maneuverability?: FlyManeuverability;

    constructor({
        base,
        burrow,
        climb,
        swim,
        fly,
        maneuverability,
    }: BaseSpeedsBonusBuilder) {
        this.#base = base;
        this.#burrow = burrow;
        this.#climb = climb;
        this.#swim = swim;
        this.#fly = fly;
        this.#maneuverability = maneuverability;
    }

    get base(): number | undefined {
        return this.#base;
    }

    get burrow(): number | undefined {
        return this.#burrow;
    }

    get climb(): number | undefined {
        return this.#climb;
    }

    get swim(): number | undefined {
        return this.#swim;
    }

    get fly(): number | undefined {
        return this.#fly;
    }

    get maneuverability(): FlyManeuverability | undefined {
        return this.#maneuverability;
    }

    get isZero(): boolean {
        return (
            !this.#base &&
            !this.#burrow &&
            !this.#climb &&
            !this.#swim &&
            !this.#fly &&
            !this.#maneuverability
        );
    }

    export(): JsonCompatible<BaseSpeedsBonusBuilder> {
        const result = {} as BaseSpeedsBonusBuilder;
        if (this.#base !== undefined) {
            result.base = this.#base;
        }
        if (this.#burrow !== undefined) {
            result.burrow = this.#burrow;
        }
        if (this.#climb !== undefined) {
            result.climb = this.#climb;
        }
        if (this.#swim !== undefined) {
            result.swim = this.#swim;
        }
        if (this.#fly !== undefined) {
            result.fly = this.#fly;
        }
        if (this.#maneuverability !== undefined) {
            result.maneuverability = this.#maneuverability;
        }
        return result;
    }

    static get zero(): BaseSpeedsBonus {
        return new BaseSpeedsBonus({});
    }

    static max(...args: BaseSpeedsBonus[]): BaseSpeedsBonus {
        const builder = {
            base: Math.max(
                ...args
                    .filter(x => x.#base !== undefined)
                    .map(x => x.#base as number),
            ),
            burrow: Math.max(
                ...args
                    .filter(x => x.#burrow !== undefined)
                    .map(x => x.#burrow as number),
            ),
            climb: Math.max(
                ...args
                    .filter(x => x.#climb !== undefined)
                    .map(x => x.#climb as number),
            ),
            swim: Math.max(
                ...args
                    .filter(x => x.#swim !== undefined)
                    .map(x => x.#swim as number),
            ),
            fly: Math.max(
                ...args
                    .filter(x => x.#fly !== undefined)
                    .map(x => x.#fly as number),
            ),
            maneuverability: maxFlyManeuverability(
                ...args.map(x => x.#maneuverability),
            ),
        } as BaseSpeedsBonusBuilder;
        Object.keys(builder)
            .filter(
                k =>
                    builder[k as keyof RawSpeeds] === undefined ||
                    builder[k as keyof RawSpeeds] === Number.NEGATIVE_INFINITY,
            )
            .forEach(k => delete builder[k as keyof RawSpeeds]);
        return new BaseSpeedsBonus(builder);
    }
}

export type { BaseSpeedsBonusBuilder };
export { BaseSpeedsBonus };
