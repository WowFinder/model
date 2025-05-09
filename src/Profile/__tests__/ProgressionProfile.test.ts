import { mockArcaneClass, mockMeleeClass } from '../../__mocks__';
import { type ClassEntries } from '../../Creature';
import { buildProgressionProfile } from '../ProgressionProfile';

describe('ProgressionProfile', () => {
    it('should create a ProgressionProfile instance with the correct properties', () => {
        const mockedClasses: ClassEntries = [
            {
                level: 10,
                class: mockMeleeClass,
            },
            {
                level: 5,
                class: mockArcaneClass,
            },
        ];
        const profile = buildProgressionProfile({
            xp: 210000,
            classes: mockedClasses,
        });

        expect(profile.xp).toBeCloseTo(15 * 14 * 1000);
        expect(profile.level).toBe(15);
        expect(profile.classes).toEqual(mockedClasses);
    });
});
