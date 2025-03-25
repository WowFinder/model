import {
    fillStatSet,
    addStatSets,
    scaleStatSet,
    baseDefault,
    zeroDefault,
    statMod,
    carry,
} from '../helpers';

describe('fillStatSet', () => {
    it('should fill in missing values with the default', () => {
        expect(fillStatSet({})).toEqual(zeroDefault);
    });
    it('should not overwrite present values', () => {
        expect(fillStatSet({ strength: 14 })).toEqual({
            ...zeroDefault,
            strength: 14,
        });
    });
    it('should not alter a stats set with all values present', () => {
        expect(fillStatSet(baseDefault)).toEqual(baseDefault);
    });
});
describe('addStatSets', () => {
    it('should handle zero as an identity', () => {
        expect(addStatSets(zeroDefault, baseDefault)).toEqual(baseDefault);
    });
    it('should add two sets together', () => {
        expect(addStatSets(baseDefault, baseDefault)).toEqual({
            strength: 20,
            dexterity: 20,
            constitution: 20,
            intelligence: 20,
            wisdom: 20,
            charisma: 20,
        });
    });
});
describe('scaleStatSet', () => {
    it('should scale all values by the even when it is fractional', () => {
        expect(scaleStatSet(baseDefault, 1.5)).toEqual({
            strength: 15,
            dexterity: 15,
            constitution: 15,
            intelligence: 15,
            wisdom: 15,
            charisma: 15,
        });
    });
    it('should behave as a multiple sum for integer factors', () => {
        expect(scaleStatSet(baseDefault, 3)).toEqual(
            addStatSets(baseDefault, baseDefault, baseDefault),
        );
    });
});
describe('carry', () => {
    const baseCarry = [
        0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 115, 130, 150, 175, 200,
        230, 260, 300, 350, 400,
    ];
    it('should return hardcoded values for scores between 0 and 20', () => {
        for (let i = 0; i <= 20; i++) {
            expect(carry(i).value).toEqual(baseCarry[i]);
        }
    });
    it('should scale by a factor of 4 per 10 points over 20', () => {
        for (let i = 21; i <= 40; i++) {
            expect(carry(i).value).toEqual(carry(i - 10).value * 4);
        }
    });
});
describe('statMod', () => {
    it('should return the correct modifier for a given score', () => {
        expect(statMod(1)).toEqual(-5);
        expect(statMod(3)).toEqual(-4);
        expect(statMod(7)).toEqual(-2);
        expect(statMod(8)).toEqual(-1);
        expect(statMod(9)).toEqual(-1);
        expect(statMod(10)).toEqual(0);
        expect(statMod(11)).toEqual(0);
        expect(statMod(12)).toEqual(1);
        expect(statMod(13)).toEqual(1);
        expect(statMod(14)).toEqual(2);
        expect(statMod(15)).toEqual(2);
        expect(statMod(16)).toEqual(3);
        expect(statMod(17)).toEqual(3);
        expect(statMod(18)).toEqual(4);
        expect(statMod(19)).toEqual(4);
        expect(statMod(20)).toEqual(5);
        expect(statMod(30)).toEqual(10);
        expect(statMod(40)).toEqual(15);
        expect(statMod(60)).toEqual(25);
        expect(statMod(100)).toEqual(45);
        expect(statMod(1000)).toEqual(495);
    });
});
