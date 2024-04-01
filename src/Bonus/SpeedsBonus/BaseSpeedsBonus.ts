import { RawSpeeds } from '@wowfinder/asset-schemas';
import { JsonCompatible, JsonExportable } from '@wowfinder/ts-utils';

type BaseSpeedsBonusBuilder = Partial<RawSpeeds>;

class BaseSpeedsBonus
    implements BaseSpeedsBonusBuilder, JsonExportable<BaseSpeedsBonusBuilder>
{
    #base?: number;
    #burrow?: number;
    #climb?: number;
    #swim?: number;
    #fly?: number;
    #maneuverability?: string;

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

    get maneuverability(): string | undefined {
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
        if (typeof this.#base !== 'undefined') {
            result.base = this.#base;
        }
        if (typeof this.#burrow !== 'undefined') {
            result.burrow = this.#burrow;
        }
        if (typeof this.#climb !== 'undefined') {
            result.climb = this.#climb;
        }
        if (typeof this.#swim !== 'undefined') {
            result.swim = this.#swim;
        }
        if (typeof this.#fly !== 'undefined') {
            result.fly = this.#fly;
        }
        if (typeof this.#maneuverability !== 'undefined') {
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
                    .filter(x => typeof x.#base !== 'undefined')
                    .map(x => x.#base ?? 0),
            ),
            burrow: Math.max(
                ...args
                    .filter(x => typeof x.#burrow !== 'undefined')
                    .map(x => x.#burrow ?? 0),
            ),
            climb: Math.max(
                ...args
                    .filter(x => typeof x.#climb !== 'undefined')
                    .map(x => x.#climb ?? 0),
            ),
            swim: Math.max(
                ...args
                    .filter(x => typeof x.#swim !== 'undefined')
                    .map(x => x.#swim ?? 0),
            ),
            fly: Math.max(
                ...args
                    .filter(x => typeof x.#fly !== 'undefined')
                    .map(x => x.#fly ?? 0),
            ),
            // TODO: select best maneuverability
            maneuverability: args.find(x => x.#maneuverability)
                ?.maneuverability,
        } as BaseSpeedsBonusBuilder;
        Object.keys(builder)
            .filter(
                k =>
                    typeof builder[k as keyof RawSpeeds] === 'undefined' ||
                    builder[k as keyof RawSpeeds] === Number.NEGATIVE_INFINITY,
            )
            .forEach(k => delete builder[k as keyof RawSpeeds]);
        return new BaseSpeedsBonus(builder);
    }
}

export type { BaseSpeedsBonusBuilder };
export { BaseSpeedsBonus };
