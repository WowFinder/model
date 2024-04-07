import { sum } from '@wowfinder/ts-utils';
import type { ClassEntries, ClassEntry } from 'Creature';

interface ProgressionProfile {
    xp?: number;
    level?: number;
    classes: ClassEntries;
    // TODO: template(s) progression
}

interface ProgressionProfileBuilder {
    xp: number;
    classes: Iterable<ClassEntry>;
}

class ProgressionProfileImpl implements ProgressionProfile {
    #xp: number;
    #classes: ClassEntries;

    constructor(data: ProgressionProfileBuilder) {
        this.#xp = data.xp;
        this.#classes = [...data.classes].map(cls => ({ ...cls }));
    }

    get xp(): number {
        return this.#xp;
    }

    get level(): number {
        return sum(...this.#classes.map(cls => cls.level));
    }

    get classes(): ClassEntries {
        return this.#classes.map(cls => ({ ...cls }));
    }
}

function buildProgressionProfile(
    data: ProgressionProfileBuilder,
): ProgressionProfile {
    return new ProgressionProfileImpl(data);
}

export type { ProgressionProfile, ProgressionProfileBuilder };
export { buildProgressionProfile };
