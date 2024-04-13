import { Skill, Stat } from '@wowfinder/ts-enums';
import { statMod } from '../../Stats/helpers';
import {
    defaultStatsMock,
    exhaustiveSkillSpecBuilderMock as exhaustiveBuilder,
    minimalSkillSpecBuilderMock as minimalBuilder,
    mixedStatsMock,
} from '../../../__mocks__';
import { SkillSpec } from '../SkillSpec';
import { classTrainedBonus } from '../helpers';

describe('SkillSpec', () => {
    it('is immutable', () => {
        const spec = new SkillSpec(minimalBuilder);
        expect(() => {
            // @ts-expect-error: TS2540: Cannot assign to 'key' because it is a read-only property.
            spec.key = 'athletics';
        }).toThrow();
        expect(() => {
            // @ts-expect-error: TS2540: Cannot assign to 'primary' because it is a read-only property.
            spec.primary = 'strength';
        }).toThrow();
        expect(() => {
            // @ts-expect-error: TS2540: Cannot assign to 'secondary' because it is a read-only property.
            spec.secondary = 'strength';
        }).toThrow();
        expect(() => {
            // @ts-expect-error: TS2540: Cannot assign to 'trainedOnly' because it is a read-only property.
            spec.trainedOnly = true;
        }).toThrow();
        expect(() => {
            // @ts-expect-error: TS2540: Cannot assign to 'acp' because it is a read-only property.
            spec.acp = 1;
        }).toThrow();
        expect(() => {
            // @ts-expect-error: TS2540: Cannot assign to 'sizeModFactor' because it is a read-only property.
            spec.sizeModFactor = 1;
        }).toThrow();
    });
    it('should handle default values when built with minimal arguments', () => {
        const spec = new SkillSpec(minimalBuilder);
        expect(spec.secondary).toBeNull();
        expect(spec.trainedOnly).toBe(false);
        expect(spec.sizeModFactor).toBe(0);
    });
    it('should handle all arguments when built with exhaustive arguments', () => {
        const spec = new SkillSpec(exhaustiveBuilder);
        expect(spec.key).toBe(Skill.alchemy);
        expect(spec.primary).toBe(Stat.intelligence);
        expect(spec.secondary).toBe(Stat.dexterity);
        expect(spec.trainedOnly).toBe(true);
        expect(spec.sizeModFactor).toBe(2);
    });
    it('should compute totals', () => {
        const specMinimal = new SkillSpec(minimalBuilder);
        const specExhaustive = new SkillSpec(exhaustiveBuilder);
        const ranks = {
            [minimalBuilder.key]: 1,
            [exhaustiveBuilder.key]: 2,
        };
        const byClass = [exhaustiveBuilder.key];
        const acp = -2;
        const size = +1;
        const expectedMinimal = ranks[minimalBuilder.key] + acp;
        expect(
            specMinimal.total({
                stats: defaultStatsMock,
                ranks,
                byClass,
                acp,
                size,
            }),
        ).toBe(expectedMinimal);
        const expectedExhaustive =
            ranks[exhaustiveBuilder.key] +
            statMod(mixedStatsMock[exhaustiveBuilder.primary]) +
            size * 2 +
            classTrainedBonus;
        expect(
            specExhaustive.total({
                stats: mixedStatsMock,
                ranks,
                byClass,
                acp,
                size,
            }),
        ).toBe(expectedExhaustive);
    });
});
