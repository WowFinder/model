import { defaultSimpleBonusBuilder, fullSimpleBonusBuilder } from '__mocks__';
import { SimpleBonus } from '../SimpleBonus';

describe('SimpleBonus', () => {
    let defaultSimpleBonus: SimpleBonus;
    let fullSimpleBonus: SimpleBonus;

    beforeEach(() => {
        defaultSimpleBonus = new SimpleBonus(defaultSimpleBonusBuilder);
        fullSimpleBonus = new SimpleBonus(fullSimpleBonusBuilder);
    });

    describe('export', () => {
        it('should export a bonus', () => {
            const exportedBonus = defaultSimpleBonus.export();
            expect(exportedBonus.hp).toBe(0);
            expect(exportedBonus.armorClass).toBe(0);
            expect(exportedBonus.stats).toBeDefined();
            expect(exportedBonus.skills).toBeDefined();
            expect(exportedBonus.resistances).toBeDefined();
            expect(exportedBonus.vitalNeeds).toBeDefined();
            expect(exportedBonus.senses).toBeDefined();
            expect(exportedBonus.spellPower).toBeDefined();
            expect(exportedBonus.feats).toBeDefined();
            expect(exportedBonus.baseSpeeds).toBeDefined();
            expect(exportedBonus.speedsModifiers).toBeDefined();
        });
    });
    describe('sum', () => {
        it('should sum multiple bonuses', () => {
            const bonusesToSum = [
                defaultSimpleBonus,
                fullSimpleBonus,
                fullSimpleBonus,
            ] as const;
            const count = bonusesToSum.filter(
                b => b === fullSimpleBonus,
            ).length;
            const bonusSum = SimpleBonus.sum(...bonusesToSum);
            expect(bonusSum.hp).toEqual(fullSimpleBonus.hp * count);
            expect(bonusSum.armorClass).toEqual(
                fullSimpleBonus.armorClass * count,
            );
            expect(bonusSum.stats).toBeDefined();
            expect(bonusSum.skills).toBeDefined();
            expect(bonusSum.resistances).toBeDefined();
            expect(bonusSum.vitalNeeds).toBeDefined();
            expect(bonusSum.senses).toBeDefined();
            expect(bonusSum.spellPower).toBeDefined();
            expect(bonusSum.feats).toBeDefined();
            expect(bonusSum.baseSpeeds).toBeDefined();
            expect(bonusSum.speedsModifiers).toBeDefined();
        });
        it('should be a noop when adding an empty bonus', () => {
            const zero = SimpleBonus.zero;
            const bonusSum = SimpleBonus.sum(fullSimpleBonus, zero, zero);
            expect(bonusSum.hp).toEqual(fullSimpleBonus.hp);
            expect(bonusSum.armorClass).toEqual(fullSimpleBonus.armorClass);
            expect(bonusSum.stats).toEqual(fullSimpleBonus.stats);
            expect(bonusSum.skills).toEqual(fullSimpleBonus.skills);
            expect(bonusSum.resistances).toEqual(fullSimpleBonus.resistances);
            expect(bonusSum.vitalNeeds).toEqual(fullSimpleBonus.vitalNeeds);
            expect(bonusSum.senses).toEqual(fullSimpleBonus.senses);
            expect(bonusSum.spellPower).toEqual(fullSimpleBonus.spellPower);
            expect(bonusSum.feats).toEqual(fullSimpleBonus.feats);
            expect(bonusSum.baseSpeeds).toEqual(fullSimpleBonus.baseSpeeds);
            expect(bonusSum.speedsModifiers).toEqual(
                fullSimpleBonus.speedsModifiers,
            );
        });
    });

    describe('max', () => {
        it('should get the maximum bonus', () => {
            const maxBonus = SimpleBonus.max(
                defaultSimpleBonus,
                fullSimpleBonus,
            );
            expect(maxBonus.hp).toEqual(fullSimpleBonus.hp);
            expect(maxBonus.armorClass).toEqual(fullSimpleBonus.armorClass);
            expect(maxBonus.stats).toBeDefined();
            expect(maxBonus.skills).toBeDefined();
            expect(maxBonus.resistances).toBeDefined();
            expect(maxBonus.vitalNeeds).toBeDefined();
            expect(maxBonus.senses).toBeDefined();
            expect(maxBonus.spellPower).toBeDefined();
            expect(maxBonus.feats).toBeDefined();
            expect(maxBonus.baseSpeeds).toBeDefined();
            expect(maxBonus.speedsModifiers).toBeDefined();
        });
    });

    describe('multiply', () => {
        it('should multiply a bonus', () => {
            const factor = 2;
            const multipliedBonus = SimpleBonus.multiply(
                fullSimpleBonus,
                factor,
            );
            expect(multipliedBonus.hp).toEqual(fullSimpleBonus.hp * factor);
            expect(multipliedBonus.armorClass).toEqual(
                fullSimpleBonus.armorClass * factor,
            );
            expect(multipliedBonus.stats).toBeDefined();
            expect(multipliedBonus.skills).toBeDefined();
            expect(multipliedBonus.resistances).toBeDefined();
            expect(multipliedBonus.vitalNeeds).toBeDefined();
            expect(multipliedBonus.senses).toBeDefined();
            expect(multipliedBonus.spellPower).toBeDefined();
            expect(multipliedBonus.feats).toBeDefined();
            expect(multipliedBonus.baseSpeeds).toBeDefined();
            expect(multipliedBonus.speedsModifiers).toBeDefined();
        });
    });
    describe('isZero', () => {
        it('should return false if any bonus is not zero', () => {
            expect(fullSimpleBonus.isZero).toBe(false);
        });
        it('should return true if all bonuses are zero', () => {
            const zero = SimpleBonus.zero;
            expect(zero.isZero).toBe(true);
        });
    });
});
