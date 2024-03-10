import { SimpleSaves } from '../Saves';
import { sum } from '@wowfinder/ts-utils';

export default class SavesBonus extends SimpleSaves {
    static get zero(): SavesBonus {
        return new SavesBonus({});
    }

    static sum(...args: SavesBonus[]): SavesBonus {
        return new SavesBonus({
            fortitude: sum(...args.map(a => a.fortitude)),
            reflexes: sum(...args.map(a => a.reflexes)),
            will: sum(...args.map(a => a.will)),
        });
    }

    static max(...args: SavesBonus[]): SavesBonus {
        return new SavesBonus({
            fortitude: Math.max(...args.map(a => a.fortitude)),
            reflexes: Math.max(...args.map(a => a.reflexes)),
            will: Math.max(...args.map(a => a.will)),
        });
    }

    static build(raw: any = {}): SavesBonus {
        return new SavesBonus({
            fortitude: raw.fort || 0,
            reflexes: raw.refl || 0,
            will: raw.will || 0,
        });
    }
}
