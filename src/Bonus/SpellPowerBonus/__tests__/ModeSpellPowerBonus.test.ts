import { ModeSpellPowerBonus } from '../ModeSpellPowerBonus';
import { modeDefaultBuilder, modeFullBuilder } from '../../../__mocks__';

describe('ModeSpellPowerBonus', () => {
    let defaultBonus: ModeSpellPowerBonus;
    let fullBonus: ModeSpellPowerBonus;

    beforeEach(() => {
        defaultBonus = new ModeSpellPowerBonus(modeDefaultBuilder);
        fullBonus = new ModeSpellPowerBonus(modeFullBuilder);
    });

    it('should create a default instance', () => {
        expect(defaultBonus.arcane).toBe(0);
        expect(defaultBonus.divine).toBe(0);
        expect(defaultBonus.spontaneous).toBe(0);
        expect(defaultBonus.isZero).toBe(true);
    });
    it('should create an instance with values', () => {
        expect(fullBonus.arcane).toBe(1);
        expect(fullBonus.divine).toBe(2);
        expect(fullBonus.spontaneous).toBe(3);
        expect(fullBonus.isZero).toBe(false);
    });
    it('should return a zero object', () => {
        expect(ModeSpellPowerBonus.zero.isZero).toBe(true);
    });

    it('should add bonuses together', () => {
        const sum = ModeSpellPowerBonus.sum(fullBonus, fullBonus, fullBonus);
        expect(sum.arcane).toBe(3);
        expect(sum.divine).toBe(6);
        expect(sum.spontaneous).toBe(9);
    });

    it('should return the maximum of the bonuses', () => {
        const max = ModeSpellPowerBonus.max(defaultBonus, fullBonus);
        expect(max.arcane).toBe(1);
        expect(max.divine).toBe(2);
        expect(max.spontaneous).toBe(3);
    });

    it('should multiply the bonuses by a factor', () => {
        const multiplied = ModeSpellPowerBonus.multiply(fullBonus, 2);
        expect(multiplied.arcane).toBe(2);
        expect(multiplied.divine).toBe(4);
        expect(multiplied.spontaneous).toBe(6);
    });

    it('should yield zero when multiplying a zero bonus', () => {
        const multiplied = ModeSpellPowerBonus.multiply(defaultBonus, 2);
        expect(multiplied.isZero).toBe(true);
    });

    it('should yield zero when multiplying by zero', () => {
        const multiplied = ModeSpellPowerBonus.multiply(fullBonus, 0);
        expect(multiplied.isZero).toBe(true);
    });

    it('should export the bonus to a JSON-compatible object', () => {
        expect(fullBonus.export()).toEqual(modeFullBuilder);
    });
});
