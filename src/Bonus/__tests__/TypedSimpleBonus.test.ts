import { BonusType } from '@wowfinder/ts-enums';
import {
    defaultSimpleBonusBuilder,
    fullSimpleBonusBuilder,
} from '../../__mocks__';
import { TypedSimpleBonus } from '../TypedSimpleBonus';

describe('TypedSimpleBonus', () => {
    let defaultTypedSimpleBonus: TypedSimpleBonus;
    let fullTypedSimpleBonus: TypedSimpleBonus;

    beforeEach(() => {
        defaultTypedSimpleBonus = new TypedSimpleBonus({
            ...defaultSimpleBonusBuilder,
            type: BonusType.aura,
        });
        fullTypedSimpleBonus = new TypedSimpleBonus({
            ...fullSimpleBonusBuilder,
            type: BonusType.deflection,
        });
    });

    describe('export', () => {
        it('should export a bonus', () => {
            const exportedBonus = defaultTypedSimpleBonus.export();
            expect(exportedBonus.type).toBe(BonusType.aura);
        });
    });
    describe('typedSum', () => {
        it('should sum multiple bonuses of the same type', () => {
            const bonusesToSum = [
                defaultTypedSimpleBonus.retyped(BonusType.deflection),
                fullTypedSimpleBonus,
                fullTypedSimpleBonus,
            ] as const;
            const bonusSum = TypedSimpleBonus.typedSum(...bonusesToSum);
            expect(bonusSum.hp).toEqual(20);
            expect(bonusSum.armorClass).toEqual(4);
            expect(bonusSum.type).toEqual(BonusType.deflection);
        });
        it('should throw when summing bonuses of different types', () => {
            const bonusesToSum = [
                defaultTypedSimpleBonus,
                fullTypedSimpleBonus,
            ] as const;
            expect(() => TypedSimpleBonus.typedSum(...bonusesToSum)).toThrow(
                'Cannot sum TypedSimpleBonuses of different types',
            );
        });
    });
});
