import { DamageSpec } from '../DamageSpec';
import { minRoll, maxRoll } from './utils';
import type { DamageComponentSpecBuilder } from '../DamageComponent';
import { Stat } from '@wowfinder/ts-enums';
import { mockMindBurnFullDamageTypes, rollArgsSimple } from '../../__mocks__';

describe('DamageSpec', () => {
    const testDamageComponentSpecBuilder: DamageComponentSpecBuilder = {
        types: mockMindBurnFullDamageTypes,
        diceCount: 2,
        diceSides: 6,
        fixedMod: 3,
        modStat: Stat.strength,
    };
    it('should initialize with the provided components', () => {
        const damageSpec = new DamageSpec({
            components: [testDamageComponentSpecBuilder],
        });
        const components = damageSpec.components;
        expect(components.length).toEqual(1);
        expect(components[0].types).toEqual(mockMindBurnFullDamageTypes);
        expect(components[0].diceCount).toEqual(2);
        expect(components[0].diceSides).toEqual(6);
        expect(components[0].fixedMod).toEqual(3);
        expect(components[0].mod).toEqual(Stat.strength);
    });
    it('should always roll within the expected range', () => {
        const numberOfTestRolls = 100;
        const damageSpec = new DamageSpec({
            components: [testDamageComponentSpecBuilder],
        });
        for (let i = 0; i < numberOfTestRolls; i++) {
            const roll = damageSpec.roll(rollArgsSimple);
            expect(roll.components.length).toEqual(1);
            expect(roll.components[0].total).toBeGreaterThanOrEqual(
                minRoll(testDamageComponentSpecBuilder, rollArgsSimple.stats),
            );
            expect(roll.components[0].total).toBeLessThanOrEqual(
                maxRoll(testDamageComponentSpecBuilder, rollArgsSimple.stats),
            );
        }
    });
});
