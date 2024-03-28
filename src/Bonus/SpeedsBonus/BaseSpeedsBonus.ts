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
        return {
            base: this.#base,
            burrow: this.#burrow,
            climb: this.#climb,
            swim: this.#swim,
            fly: this.#fly,
            maneuverability: this.#maneuverability,
        };
    }

    static get zero(): BaseSpeedsBonus {
        return new BaseSpeedsBonus({});
    }

    static max(...args: BaseSpeedsBonus[]): BaseSpeedsBonus {
        return new BaseSpeedsBonus({
            base: Math.max(...args.map(x => x.base ?? 0)),
            burrow: Math.max(...args.map(x => x.burrow ?? 0)),
            climb: Math.max(...args.map(x => x.climb ?? 0)),
            swim: Math.max(...args.map(x => x.swim ?? 0)),
            fly: Math.max(...args.map(x => x.fly ?? 0)),
            // TODO: select best maneuverability
        });
    }
}

export type { BaseSpeedsBonusBuilder };
export { BaseSpeedsBonus };
