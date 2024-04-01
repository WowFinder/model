import { StatsBonus } from '../../Bonus/StatsBonus';
import { meleeBonusesStatsMock, mixedBonusStatsMock } from '../../__mocks__/';

describe('StatsBonus', () => {
    let meleeBonuses: StatsBonus;
    let mixedBonuses: StatsBonus;

    beforeEach(() => {
        meleeBonuses = new StatsBonus(meleeBonusesStatsMock);
        mixedBonuses = new StatsBonus(mixedBonusStatsMock);
    });

    it('should construct a melee bonus', () => {
        expect(meleeBonuses.isZero).toBe(false);
        expect(meleeBonuses.strength).toBe(2);
        expect(meleeBonuses.dexterity).toBe(1);
    });

    it('should construct a mixed bonus', () => {
        expect(mixedBonuses.isZero).toBe(false);
        expect(mixedBonuses.constitution).toBe(-2);
        expect(mixedBonuses.intelligence).toBe(2);
        expect(mixedBonuses.charisma).toBe(2);
    });

    it('should return a zero bonus', () => {
        expect(StatsBonus.zero.isZero).toBe(true);
    });

    it('should sum bonuses', () => {
        const bonusesToAdd = [meleeBonuses, mixedBonuses, meleeBonuses];
        const meleeBonusesCount = bonusesToAdd.filter(
            bonus => bonus === meleeBonuses,
        ).length;
        const sumBonus = StatsBonus.sum(...bonusesToAdd);
        expect(sumBonus.strength).toBe(2 * meleeBonusesCount);
        expect(sumBonus.dexterity).toBe(1 * meleeBonusesCount);
        expect(sumBonus.constitution).toBe(-2);
        expect(sumBonus.intelligence).toBe(2);
        expect(sumBonus.wisdom).toBe(0);
        expect(sumBonus.charisma).toBe(2);
    });

    it('should get the maximum non-zero bonus', () => {
        const maxBonus = StatsBonus.max(meleeBonuses, mixedBonuses);
        expect(maxBonus.strength).toBe(2);
        expect(maxBonus.dexterity).toBe(1);
        expect(maxBonus.constitution).toBe(-2);
        expect(maxBonus.intelligence).toBe(2);
        expect(maxBonus.wisdom).toBe(0);
        expect(maxBonus.charisma).toBe(2);
    });

    it('should multiply a bonus', () => {
        const factor = 2;
        const multipliedBonus = StatsBonus.multiply(meleeBonuses, factor);
        expect(multipliedBonus.strength).toBe(4);
        expect(multipliedBonus.dexterity).toBe(2);
        expect(multipliedBonus.constitution).toBe(0);
        expect(multipliedBonus.intelligence).toBe(0);
        expect(multipliedBonus.wisdom).toBe(0);
        expect(multipliedBonus.charisma).toBe(0);
    });

    it('should export a bonus', () => {
        const exportedBonus = meleeBonuses.export();
        expect(exportedBonus.strength).toBe(2);
        expect(exportedBonus.dexterity).toBe(1);
        expect(exportedBonus.constitution).toBe(0);
        expect(exportedBonus.intelligence).toBe(0);
        expect(exportedBonus.wisdom).toBe(0);
        expect(exportedBonus.charisma).toBe(0);
    });
});
