import type { RawSpellBase } from '@wowfinder/asset-schemas';
import type { SpellDescriptor, SpellFlag } from '@wowfinder/ts-enums';
import { PossiblyString, parseIfNeeded } from '@wowfinder/ts-utils';
import { ActionTime } from '../../Action/ActionTime';
import { SpellArea, parseArea } from './Area';
import type { SpellComponent } from './Components';
import { SpellDuration, tryParseSpellDuration } from './Duration';
import { SpellRange } from './Range';

interface SpellBaseBuilder {
    descriptors?: PossiblyString<SpellDescriptor>[];
    castingTime?: PossiblyString<ActionTime>;
    components?: PossiblyString<SpellComponent>[];
    range?: PossiblyString<SpellRange>;
    area?: PossiblyString<SpellArea>;
    // effect: ???;
    // targets: SpellTarget[];
    duration?: PossiblyString<SpellDuration>;
    // savingThrow?: Save || false;
    flags?: PossiblyString<SpellFlag>[];
}

abstract class SpellBase implements SpellBaseBuilder {
    #castingTime?: ActionTime;
    #range?: SpellRange;
    #area?: SpellArea;
    // #effect, #targets
    #duration?: SpellDuration;
    // #savingThrow
    constructor({ castingTime, range, area, duration }: RawSpellBase) {
        this.#castingTime = parseIfNeeded(castingTime, ActionTime.tryParse);
        this.#range = parseIfNeeded(range, SpellRange.tryParse);
        this.#area = parseIfNeeded(area, parseArea);
        // #effect, #targets
        this.#duration = parseIfNeeded(duration, tryParseSpellDuration);
        // #duration, #savingThrow
    }

    get castingTime(): ActionTime | undefined {
        return this.#castingTime;
    }

    get range(): SpellRange | undefined {
        return this.#range;
    }

    get area(): SpellArea | undefined {
        return this.#area;
    }

    // effect, targets, duration

    get duration(): SpellDuration | undefined {
        return this.#duration;
    }
}

export { SpellBase, SpellBaseBuilder };
