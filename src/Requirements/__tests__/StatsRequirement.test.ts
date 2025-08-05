import { Stat } from '@wowfinder/ts-enums';
import {
    MaxStatsRequirement,
    MinStatsRequirement,
    characterStatsRequirement,
} from '../StatsRequirement';
import { mockedBruteCharacter, mockedDruidCharacter } from '../../__mocks__';

const muscleRawStats = {
    [Stat.strength]: 15,
    [Stat.charisma]: 10,
    [Stat.wisdom]: 5,
} as const;

const lowerMuscleRawStats = {
    [Stat.strength]: 10,
    [Stat.charisma]: 10,
    [Stat.wisdom]: 5,
} as const;

const higherMuscleRawStats = {
    [Stat.strength]: 20,
    [Stat.charisma]: 10,
    [Stat.wisdom]: 5,
} as const;

describe('StatsRequirements', () => {
    describe('MaxStatsRequirement', () => {
        const maxStatsReq = new MaxStatsRequirement(muscleRawStats);
        it('should create an instance of MaxStatsRequirement', () => {
            expect(maxStatsReq).toBeInstanceOf(MaxStatsRequirement);
        });
        it('should have the correct values', () => {
            expect(maxStatsReq.strength).toBe(muscleRawStats.strength);
            expect(maxStatsReq.dexterity).toBe(0);
            expect(maxStatsReq.constitution).toBe(0);
            expect(maxStatsReq.intelligence).toBe(0);
            expect(maxStatsReq.wisdom).toBe(muscleRawStats.wisdom);
            expect(maxStatsReq.charisma).toBe(muscleRawStats.charisma);
        });
        it('should accept identical values', () => {
            expect(maxStatsReq.test(muscleRawStats)).toBe(true);
        });
        it('should accept a lower value', () => {
            expect(maxStatsReq.test(lowerMuscleRawStats)).toBe(true);
        });
        it('should reject a higher value', () => {
            expect(maxStatsReq.test(higherMuscleRawStats)).toBe(false);
        });
        it('should accept an empty object', () => {
            expect(maxStatsReq.test({})).toBe(true);
        });
    });
    describe('MinStatsRequirement', () => {
        const minStatsReq = new MinStatsRequirement(muscleRawStats);
        it('should create an instance of MinStatsRequirement', () => {
            expect(minStatsReq).toBeInstanceOf(MinStatsRequirement);
        });
        it('should have the correct values', () => {
            expect(minStatsReq.strength).toBe(muscleRawStats.strength);
            expect(minStatsReq.dexterity).toBe(0);
            expect(minStatsReq.constitution).toBe(0);
            expect(minStatsReq.intelligence).toBe(0);
            expect(minStatsReq.wisdom).toBe(muscleRawStats.wisdom);
            expect(minStatsReq.charisma).toBe(muscleRawStats.charisma);
        });
        it('should accept identical values', () => {
            expect(minStatsReq.test(muscleRawStats)).toBe(true);
        });
        it('should accept a higher value', () => {
            expect(minStatsReq.test(higherMuscleRawStats)).toBe(true);
        });
        it('should reject a lower value', () => {
            expect(minStatsReq.test(lowerMuscleRawStats)).toBe(false);
        });
        it('should reject an empty object', () => {
            expect(minStatsReq.test({})).toBe(false);
        });
    });
    describe('characterStatsRequirement', () => {
        const charStatsWiseRequirement = characterStatsRequirement(
            new MinStatsRequirement({
                wisdom: 16,
            }),
        );
        const charStatsToughRequirement = characterStatsRequirement(
            new MinStatsRequirement({
                constitution: 14,
                strength: 14,
            }),
        );
        it('should create a characterStatsRequirement', () => {
            expect(charStatsWiseRequirement).toBeDefined();
            expect(charStatsToughRequirement).toBeDefined();
        });
        it('should accept good values', () => {
            expect(charStatsWiseRequirement.test(mockedDruidCharacter)).toBe(
                true,
            );
            expect(charStatsToughRequirement.test(mockedBruteCharacter)).toBe(
                true,
            );
        });
        it('should reject bad values', () => {
            expect(charStatsWiseRequirement.test(mockedBruteCharacter)).toBe(
                false,
            );
            expect(charStatsToughRequirement.test(mockedDruidCharacter)).toBe(
                false,
            );
        });
    });
});

