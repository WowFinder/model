import { FeatFlag } from '@wowfinder/ts-enums';
import { Feat } from '../Feat';
import { FeatSpec } from '../FeatSpec';
import { mockBasicCreatureProfile } from '../../../__mocks__';

describe('FeatSpec', () => {
    function build(): FeatSpec {
        return new FeatSpec({
            label: Feat.improvedCounterspell,
            flags: [FeatFlag.magic],
        });
    }
    function buildMultiple(): FeatSpec {
        return new FeatSpec({
            label: Feat.extendSpell,
            flags: [FeatFlag.magic, FeatFlag.metaMagic, FeatFlag.multiple],
        });
    }
    describe('constructor', () => {
        it('should create an instance of FeatSpec', () => {
            const featSpec = build();
            expect(featSpec).toBeInstanceOf(FeatSpec);
        });

        it('should set the label', () => {
            const featSpec = build();
            expect(featSpec.label).toBe(Feat.improvedCounterspell);
        });

        it('should set the flags', () => {
            const featSpec = build();
            expect(featSpec.flags).toContain(FeatFlag.magic);
        });
    });
    describe('testRequirements', () => {
        it('should return true if all requirements are met', () => {
            const featSpec = build();

            expect(
                featSpec.testRequirements({
                    key: 'dummy-character-placeholder',
                    baseProfile: mockBasicCreatureProfile,
                }),
            ).toBe(true);
        });
    });

    describe('multiple', () => {
        it('should return true if the feat is marked as multiple', () => {
            const featSpec = buildMultiple();
            expect(featSpec.multiple).toBe(true);
        });

        it('should return false if the feat is not marked as multiple', () => {
            const featSpec = build();
            expect(featSpec.multiple).toBe(false);
        });
    });
});
