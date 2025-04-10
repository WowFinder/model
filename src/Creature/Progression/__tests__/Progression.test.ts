import { Aura, Skill } from '@wowfinder/ts-enums';
import { ProgressionFeature } from '../Features';
import { Progression, type ProgressionConstructorArgs } from '../Progression';

class ProgressionImplementationDefaults extends Progression {
    constructor(key: string) {
        super({
            key,
        });
    }
}

class ProgressionImplementationFull extends Progression {
    constructor(args: ProgressionConstructorArgs) {
        super(args);
    }
}

describe('Progression', () => {
    it('should create an instance with default values', () => {
        const progression = new ProgressionImplementationDefaults('test-key');
        expect(progression.key).toBe('test-key');
        expect(progression.hitDie).toBe(0);
        expect(progression.baseAttackProgression).toBe(0);
        expect(progression.saves).toEqual({
            fortitude: false,
            reflexes: false,
            will: false,
        });
        expect(progression.casting).toEqual({
            arcane: 0,
            divine: 0,
            spontaneous: 0,
        });
        expect(progression.skillRanks).toBe(0);
        expect(progression.features).toEqual([]);
        expect(progression.auras).toEqual([]);
        expect(progression.skills).toEqual(new Set());
    });
    it('should create an instance with custom values', () => {
        const args: ProgressionConstructorArgs = {
            key: 'custom-key',
            hitDie: 8,
            baseAttackProgression: 0.75,
            saves: { fortitude: true, reflexes: false, will: true },
            casting: { arcane: 1, divine: 0, spontaneous: 0 },
            skillRanks: 4,
            features: [
                {
                    level: 1,
                    feature: ProgressionFeature.evasion,
                },
                { level: 2, feature: ProgressionFeature.trapSense },
            ],
            auras: [
                {
                    level: 1,
                    aura: Aura.wild,
                },
            ],
            skills: new Set([Skill.acrobatics, Skill.athletics]),
        };
        const progression = new ProgressionImplementationFull(args);
        expect(progression.key).toBe('custom-key');
        expect(progression.hitDie).toBe(8);
        expect(progression.baseAttackProgression).toBe(0.75);
        expect(progression.saves).toEqual({
            fortitude: true,
            reflexes: false,
            will: true,
        });
        expect(progression.casting).toEqual({
            arcane: 1,
            divine: 0,
            spontaneous: 0,
        });
        expect(progression.skillRanks).toBe(4);
        expect(progression.features).toEqual([
            { level: 1, feature: ProgressionFeature.evasion },
            { level: 2, feature: ProgressionFeature.trapSense },
        ]);
        expect(progression.auras).toEqual([{ level: 1, aura: Aura.wild }]);
        expect(progression.skills).toEqual(
            new Set([Skill.acrobatics, Skill.athletics]),
        );
        expect(progression.skills.size).toBe(2);
    });
});
