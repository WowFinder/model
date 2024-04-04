import { SensesBonus } from '../SensesBonus';
import { sensesBonusDefaultBuilder, sensesBonusFullBuilder } from '__mocks__/';

describe('SensesBonus', () => {
    let defaultBonus: SensesBonus;
    let fullBonus: SensesBonus;

    beforeEach(() => {
        defaultBonus = new SensesBonus(sensesBonusDefaultBuilder);
        fullBonus = new SensesBonus(sensesBonusFullBuilder);
    });

    it('should construct a default instance', () => {
        expect(defaultBonus.darkVision).toBe(0);
        expect(defaultBonus.lowLightVision).toBe(false);
        expect(defaultBonus.smell).toBe(false);
    });

    it('should construct a full instance', () => {
        expect(fullBonus.darkVision).toBe(1);
        expect(fullBonus.lowLightVision).toBe(true);
        expect(fullBonus.smell).toBe(true);
    });

    it('should return a default instance', () => {
        expect(SensesBonus.defaults.darkVision).toBe(0);
        expect(SensesBonus.defaults.lowLightVision).toBe(false);
        expect(SensesBonus.defaults.smell).toBe(false);
    });

    it('should get the maximum bonus', () => {
        const maxBonus = SensesBonus.max(fullBonus, defaultBonus);
        expect(maxBonus.darkVision).toBe(1);
        expect(maxBonus.lowLightVision).toBe(true);
        expect(maxBonus.smell).toBe(true);
    });

    it('should export a bonus', () => {
        expect(fullBonus.export()).toEqual(sensesBonusFullBuilder);
    });
});
