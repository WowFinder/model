import { mixedStatsMock } from '__mocks__';
import { FullSaves, SaveBreakdown, fillSaves } from '../Saves';
import { StatsBlock } from 'Creature/Stats/StatsBlock';

const saves123 = { fortitude: 1, reflexes: 2, will: 3 };
const saves456 = { fortitude: 4, reflexes: 5, will: 6 };
const saves789 = { fortitude: 7, reflexes: 8, will: 9 };

describe('SaveBreakdown', () => {
    it('should build a SaveBreakdown object', () => {
        const saveBreakdown = new SaveBreakdown({
            base: 3,
            stat: 1,
            enhancement: 2,
            gear: 4,
            misc: 6,
            temporary: -5,
        });
        expect(saveBreakdown.base).toBe(3);
        expect(saveBreakdown.stat).toBe(1);
        expect(saveBreakdown.enhancement).toBe(2);
        expect(saveBreakdown.gear).toBe(4);
        expect(saveBreakdown.misc).toBe(6);
        expect(saveBreakdown.temporary).toBe(-5);
        expect(saveBreakdown.total).toBe(11);
    });
});

describe('Saves', () => {
    it('should build a Saves object', () => {
        const saves = new FullSaves({
            stats: new StatsBlock({ base: mixedStatsMock }),
            base: saves123,
            enhancement: saves456,
            gear: saves789,
            misc: saves123,
            temporary: saves456,
        });
        // 1 (Base) + 1 (CON) + 4 enhance + 7 gear + 1 misc + 4 temp
        expect(saves.fortitude.total).toBe(18);
        // 2 (Base) + 2 (DEX) + 5 enhance + 8 gear + 2 misc + 5 temp
        expect(saves.reflexes.total).toBe(24);
        // 3 (Base) + 0 (WIS) + 6 enhance + 9 gear + 3 misc + 6 temp
        expect(saves.will.total).toBe(27);

        expect(saves.base).toEqual(saves123);
        expect(saves.enhancement).toEqual(saves456);
        expect(saves.gear).toEqual(saves789);
        expect(saves.misc).toEqual(saves123);
        expect(saves.temporary).toEqual(saves456);
    });
});

describe('fillSaves', () => {
    it('should use defaults when no argument is given', () => {
        const saves = fillSaves();
        expect(saves.fortitude).toBe(0);
        expect(saves.reflexes).toBe(0);
        expect(saves.will).toBe(0);
    });
    it('should fill missing saves with the default value', () => {
        const saves = fillSaves({});
        expect(saves.fortitude).toBe(0);
        expect(saves.reflexes).toBe(0);
        expect(saves.will).toBe(0);
    });
    it('should not replace given values', () => {
        const saves = fillSaves({ fortitude: 1, reflexes: 2, will: 3 });
        expect(saves.fortitude).toBe(1);
        expect(saves.reflexes).toBe(2);
        expect(saves.will).toBe(3);
    });
});
