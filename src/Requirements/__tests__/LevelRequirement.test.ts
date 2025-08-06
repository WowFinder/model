import {
    mockedBruteCharacter,
    mockedDruidCharacter,
    mockedBasicCharacter,
} from '../../__mocks__';
import {
    AttackBonusRequirement,
    CasterLevelRequirement,
    CharacterLevelRequirement,
} from '../LevelRequirement';

describe('LevelRequirement', () => {
    describe('AttackBonusRequirement', () => {
        it('should require a minimum attack bonus', () => {
            const requirement = new AttackBonusRequirement(3);
            expect(requirement.test(mockedBruteCharacter)).toBe(true);
            expect(requirement.test(mockedDruidCharacter)).toBe(false);
        });
        it('should return the level value', () => {
            const requirement = new AttackBonusRequirement(5);
            expect(requirement.level).toBe(5);
        });
    });
    describe('CasterLevelRequirement', () => {
        it('should require a minimum caster level', () => {
            const requirement = new CasterLevelRequirement(3);
            expect(requirement.test(mockedBruteCharacter)).toBe(false);
            expect(requirement.test(mockedDruidCharacter)).toBe(true);
        });
        it('should return the level value', () => {
            const requirement = new CasterLevelRequirement(5);
            expect(requirement.level).toBe(5);
        });
    });
    describe('CharacterLevelRequirement', () => {
        it('should require a minimum character level', () => {
            const requirement = new CharacterLevelRequirement(3);
            expect(requirement.test(mockedBruteCharacter)).toBe(true);
            expect(requirement.test(mockedDruidCharacter)).toBe(true);
            expect(requirement.test(mockedBasicCharacter)).toBe(false);
        });
        it('should return the level value', () => {
            const requirement = new CharacterLevelRequirement(5);
            expect(requirement.level).toBe(5);
        });
    });
});
