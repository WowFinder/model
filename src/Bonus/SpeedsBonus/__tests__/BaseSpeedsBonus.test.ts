import { BaseSpeedsBonus } from '../BaseSpeedsBonus';
import {
    emptyBaseSpeedsBonusBuilder,
    defaultBaseSpeedsBonusBuilder,
    fullBaseSpeedsBonusBuilder,
} from '../../../__mocks__';
import { FlyManeuverability } from '@wowfinder/ts-enums';

describe('BaseSpeedsBonus', () => {
    let emptyBaseSpeedsBonus: BaseSpeedsBonus;
    let defaultBaseSpeedsBonus: BaseSpeedsBonus;
    let fullBaseSpeedsBonus: BaseSpeedsBonus;

    beforeEach(() => {
        emptyBaseSpeedsBonus = new BaseSpeedsBonus(emptyBaseSpeedsBonusBuilder);
        defaultBaseSpeedsBonus = new BaseSpeedsBonus(
            defaultBaseSpeedsBonusBuilder,
        );
        fullBaseSpeedsBonus = new BaseSpeedsBonus(fullBaseSpeedsBonusBuilder);
    });

    it('should construct a zero / empty bonus', () => {
        expect(emptyBaseSpeedsBonus.isZero).toBe(true);
        expect(emptyBaseSpeedsBonus.base).toBeUndefined();
        expect(emptyBaseSpeedsBonus.burrow).toBeUndefined();
        expect(emptyBaseSpeedsBonus.climb).toBeUndefined();
        expect(emptyBaseSpeedsBonus.swim).toBeUndefined();
        expect(emptyBaseSpeedsBonus.fly).toBeUndefined();
        expect(emptyBaseSpeedsBonus.maneuverability).toBeUndefined();
    });

    it('should construct a default bonus', () => {
        expect(defaultBaseSpeedsBonus.isZero).toBe(false);
        expect(defaultBaseSpeedsBonus.base).toBe(30);
        expect(defaultBaseSpeedsBonus.burrow).toBeUndefined();
        expect(defaultBaseSpeedsBonus.climb).toBeUndefined();
        expect(defaultBaseSpeedsBonus.swim).toBeUndefined();
        expect(defaultBaseSpeedsBonus.fly).toBeUndefined();
        expect(defaultBaseSpeedsBonus.maneuverability).toBeUndefined();
    });

    it('should construct a full bonus', () => {
        expect(fullBaseSpeedsBonus.isZero).toBe(false);
        expect(fullBaseSpeedsBonus.base).toBe(35);
        expect(fullBaseSpeedsBonus.burrow).toBe(40);
        expect(fullBaseSpeedsBonus.climb).toBe(45);
        expect(fullBaseSpeedsBonus.swim).toBe(50);
        expect(fullBaseSpeedsBonus.fly).toBe(55);
        expect(fullBaseSpeedsBonus.maneuverability).toBe('perfect');
    });

    it('should return a zero bonus', () => {
        expect(BaseSpeedsBonus.zero.isZero).toBe(true);
    });

    it('should get the maximum bonus', () => {
        const maxBonus = BaseSpeedsBonus.max(
            emptyBaseSpeedsBonus,
            defaultBaseSpeedsBonus,
            fullBaseSpeedsBonus,
        );
        expect(maxBonus.base).toBe(35);
        expect(maxBonus.burrow).toBe(40);
        expect(maxBonus.climb).toBe(45);
        expect(maxBonus.swim).toBe(50);
        expect(maxBonus.fly).toBe(55);
        expect(maxBonus.maneuverability).toBe(FlyManeuverability.perfect);
    });

    it('should export the bonus', () => {
        expect(defaultBaseSpeedsBonus.export()).toEqual({
            base: 30,
        });
        expect(fullBaseSpeedsBonus.export()).toEqual({
            base: 35,
            burrow: 40,
            climb: 45,
            swim: 50,
            fly: 55,
            maneuverability: 'perfect',
        });
    });
});
