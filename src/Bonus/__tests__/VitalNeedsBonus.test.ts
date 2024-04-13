import { VitalNeedsBonus } from '../';
import {
    vitalNeedsBonusDefaultBuilder,
    vitalNeedsBonusFullBuilder,
} from '../../__mocks__';

describe('VitalNeedsBonus', () => {
    let defaultBonus: VitalNeedsBonus;
    let fullBonus: VitalNeedsBonus;

    beforeEach(() => {
        defaultBonus = new VitalNeedsBonus(vitalNeedsBonusDefaultBuilder);
        fullBonus = new VitalNeedsBonus(vitalNeedsBonusFullBuilder);
    });

    it('should construct a default instance', () => {
        expect(defaultBonus.breathe).toBe(true);
        expect(defaultBonus.eat).toBe(true);
        expect(defaultBonus.sleep).toBe(true);
    });

    it('should construct a full instance', () => {
        expect(fullBonus.breathe).toBe(false);
        expect(fullBonus.eat).toBe(false);
        expect(fullBonus.sleep).toBe(false);
    });

    it('should return a zero instance', () => {
        expect(VitalNeedsBonus.zero.breathe).toBe(true);
        expect(VitalNeedsBonus.zero.eat).toBe(true);
        expect(VitalNeedsBonus.zero.sleep).toBe(true);
    });

    describe('isZero', () => {
        it('should return false if any "needs" are false', () => {
            expect(fullBonus.isZero).toBe(false);
        });
        it('should return true if all "needs" are true', () => {
            expect(defaultBonus.isZero).toBe(true);
        });
    });

    it('should get the maximum bonus', () => {
        const maxBonus = VitalNeedsBonus.max(fullBonus, defaultBonus);
        expect(maxBonus.breathe).toBe(false);
        expect(maxBonus.eat).toBe(false);
        expect(maxBonus.sleep).toBe(false);
    });

    describe('export', () => {
        it('should export the full object', () => {
            expect(fullBonus.export()).toEqual({
                breathe: false,
                eat: false,
                sleep: false,
            });
        });
        it('should export default-filled values as needed', () => {
            expect(defaultBonus.export()).toEqual({
                breathe: true,
                eat: true,
                sleep: true,
            });
        });
    });
});
