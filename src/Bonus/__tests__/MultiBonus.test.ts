import { MultiBonus, stackableBonusTypes } from '../MultiBonus';
import { SimpleBonus } from '../SimpleBonus';
import {
    defaultMultiBonusBuilder,
    fullMultiBonusBuilder,
    defaultSimpleBonusBuilder,
    fullSimpleBonusBuilder,
} from '../../__mocks__/';
import { BonusType } from '@wowfinder/ts-enums';

describe('MultiBonus', () => {
    let defaultMultiBonus: MultiBonus;
    let fullMultiBonus: MultiBonus;
    let defaultSimpleBonus: SimpleBonus;
    let fullSimpleBonus: SimpleBonus;

    beforeEach(() => {
        defaultMultiBonus = new MultiBonus(defaultMultiBonusBuilder);
        fullMultiBonus = new MultiBonus(fullMultiBonusBuilder);
        defaultSimpleBonus = new SimpleBonus(defaultSimpleBonusBuilder);
        fullSimpleBonus = new SimpleBonus(fullSimpleBonusBuilder);
    });

    it('should create an instance with default values', () => {
        expect(defaultMultiBonus).toBeInstanceOf(MultiBonus);
        expect(defaultMultiBonus.gear).toBeDefined();
        expect(defaultMultiBonus.enhancement).toBeDefined();
        expect(defaultMultiBonus.deflection).toBeDefined();
        expect(defaultMultiBonus.natural).toBeDefined();
        expect(defaultMultiBonus.temporal).toBeDefined();
        expect(defaultMultiBonus.aura).toBeDefined();
        expect(defaultMultiBonus.total.export()).toEqual(
            SimpleBonus.multiply(defaultSimpleBonus, 6).export(),
        );
    });

    it('should create an instance with full values', () => {
        expect(fullMultiBonus).toBeInstanceOf(MultiBonus);
        expect(fullMultiBonus.gear).toBeDefined();
        expect(fullMultiBonus.enhancement).toBeDefined();
        expect(fullMultiBonus.deflection).toBeDefined();
        expect(fullMultiBonus.natural).toBeDefined();
        expect(fullMultiBonus.temporal).toBeDefined();
        expect(fullMultiBonus.aura).toBeDefined();
        expect(fullMultiBonus.total.export()).toEqual(
            SimpleBonus.multiply(fullSimpleBonus, 6).export(),
        );
    });

    it('should export to JSON', () => {
        const exportedDefault = defaultMultiBonus.export();
        expect(exportedDefault.aura).toBeDefined();
        expect(exportedDefault.deflection).toBeDefined();
        expect(exportedDefault.enhancement).toBeDefined();
        expect(exportedDefault.gear).toBeDefined();
        expect(exportedDefault.natural).toBeDefined();
        expect(exportedDefault.temporal).toBeDefined();
    });

    describe('combine', () => {
        let combinedBonuses: MultiBonus;
        beforeEach(() => {
            combinedBonuses = MultiBonus.combine(
                defaultMultiBonus,
                fullMultiBonus,
                fullMultiBonus,
            );
        });

        it('should return a MultiBonus', () => {
            expect(combinedBonuses).toBeInstanceOf(MultiBonus);
        });

        it('only stackable bonuses should stack', () => {
            Object.keys(BonusType)
                .map(t => t as BonusType)
                .forEach(type => {
                    if (stackableBonusTypes[type]) {
                        expect(combinedBonuses[type].export()).toEqual(
                            SimpleBonus.multiply(
                                fullMultiBonus[type],
                                2,
                            ).export(),
                        );
                    } else {
                        expect(combinedBonuses[type].export()).toEqual(
                            fullMultiBonus[type].export(),
                        );
                    }
                });
        });
    });
});
