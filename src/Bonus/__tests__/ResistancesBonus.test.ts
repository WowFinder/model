import { ResistancesBonus } from '../ResistancesBonus';
import {
    resistancesBonusDefaultBuilder,
    resistancesBonusFullBuilder,
} from '__mocks__';
import { DamageType } from '@wowfinder/ts-enums';

describe('ResistancesBonus', () => {
    let defaultBonus: ResistancesBonus;
    let fullBonus: ResistancesBonus;

    beforeEach(() => {
        defaultBonus = new ResistancesBonus(resistancesBonusDefaultBuilder);
        fullBonus = new ResistancesBonus(resistancesBonusFullBuilder);
    });

    it('should construct a default instance', () => {
        expect(defaultBonus.isZero).toBe(true);
    });

    it('should construct a full instance', () => {
        expect(fullBonus.isZero).toBe(false);
        for (const resistance of Object.keys(DamageType)) {
            expect(fullBonus[resistance as DamageType]).toBe(
                resistancesBonusFullBuilder[resistance as DamageType],
            );
        }
    });

    it('should return a zero bonus', () => {
        expect(ResistancesBonus.zero.isZero).toBe(true);
    });

    it('should sum bonuses', () => {
        const bonusesToAdd = [
            fullBonus,
            defaultBonus,
            fullBonus,
            defaultBonus,
            fullBonus,
        ];
        const fullBonusCount = bonusesToAdd.filter(
            bonus => bonus === fullBonus,
        ).length;
        const sumBonus = ResistancesBonus.sum(...bonusesToAdd);
        for (const resistance of Object.keys(DamageType)) {
            expect(sumBonus[resistance as DamageType]).toBe(
                resistancesBonusFullBuilder[resistance as DamageType] *
                    fullBonusCount,
            );
        }
    });

    it('should get the maximum bonus', () => {
        const maxBonus = ResistancesBonus.max(fullBonus, defaultBonus);
        for (const resistance of Object.keys(DamageType)) {
            expect(maxBonus[resistance as DamageType]).toBe(
                resistancesBonusFullBuilder[resistance as DamageType],
            );
        }
    });

    it('should compute the correct maximum when given only defaults', () => {
        const maxBonus = ResistancesBonus.max(defaultBonus, defaultBonus);
        for (const resistance of Object.keys(DamageType)) {
            expect(maxBonus[resistance as DamageType]).toBe(0);
        }
    });

    it('should multiply a bonus', () => {
        const factor = 2;
        const multipliedBonus = ResistancesBonus.multiply(fullBonus, factor);
        for (const resistance of Object.keys(DamageType)) {
            expect(multipliedBonus[resistance as DamageType]).toBe(
                resistancesBonusFullBuilder[resistance as DamageType] * factor,
            );
        }
    });

    it('should export the bonus', () => {
        expect(fullBonus.export()).toEqual(resistancesBonusFullBuilder);
    });
});
