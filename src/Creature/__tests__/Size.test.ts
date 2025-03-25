import { Size } from '@wowfinder/ts-enums';
import { sizeCombatMod, parseSize } from '../Size';

function numericSizes(): Size[] {
    return Object.values(Size).filter(s => typeof s === 'number') as Size[];
}

describe('sizeCombatMod', () => {
    describe('comparison coherency', () => {
        for (const s1 of numericSizes()) {
            for (const s2 of numericSizes()) {
                it(`should be coherent for ${Size[s1]} and ${Size[s2]}`, () => {
                    if (s1 === s2) {
                        expect(sizeCombatMod(s1)).toEqual(sizeCombatMod(s2));
                    } else if (s1 < s2) {
                        expect(sizeCombatMod(s1)).toBeLessThan(
                            sizeCombatMod(s2),
                        );
                    } else {
                        expect(sizeCombatMod(s1)).toBeGreaterThan(
                            sizeCombatMod(s2),
                        );
                    }
                });
            }
        }
    });
});

describe('parseSize', () => {
    it('should return undefined for invalid size', () => {
        expect(parseSize(NaN)).toBeUndefined();
    });

    for (const size of numericSizes()) {
        it(`should return ${Size[size]} for ${size}`, () => {
            expect(parseSize(size)).toEqual(size);
        });
    }
});
