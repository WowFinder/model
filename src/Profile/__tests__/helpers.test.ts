import {
    addStats,
    addSkills,
    addSaves,
    addResistances,
    addFeats,
    addProfileBonuses,
} from '../helpers';
import {
    baseStats,
    statBonus1,
    statBonus2,
    baseSkills,
    skillBonus1,
    skillBonus2,
    baseResistances,
    baseSaves,
    resistanceBonus1,
    resistanceBonus2,
    saveBonus1,
    saveBonus2,
    combinedStats,
    combinedSkills,
    combinedSaves,
    combinedResistances,
    baseFeats,
    combinedFeats,
    featBonus1,
    featBonus2,
    swimSpeedBonus,
    mkVitalsProfile,
    baseSpeeds,
    multipleSpeedsBonus,
    combinedSpeeds,
} from './mocks';
import { SimpleBonus, VitalsBonus } from '../../Bonus';

describe('Profile helpers', () => {
    describe('addStats', () => {
        it('should add stats bonuses to a StatsProfile', () => {
            const newStatsProfile = addStats(baseStats, statBonus1, statBonus2);
            expect(newStatsProfile).toEqual(combinedStats);
        });
    });

    describe('addSkills', () => {
        it('should add skills bonuses to a SkillsProfile', () => {
            const newSkillsProfile = addSkills(
                baseSkills,
                skillBonus1,
                skillBonus2,
            );
            expect(newSkillsProfile).toEqual(combinedSkills);
        });
    });

    describe('addSaves', () => {
        it('should add saves bonuses to a SavesProfile', () => {
            const newSavesProfile = addSaves(baseSaves, saveBonus1, saveBonus2);
            expect(newSavesProfile).toEqual(combinedSaves);
        });
    });

    describe('addResistances', () => {
        it('should add resistances bonuses to a ResistancesProfile', () => {
            const newResistancesProfile = addResistances(
                baseResistances,
                resistanceBonus1,
                resistanceBonus2,
            );

            expect(newResistancesProfile).toEqual(combinedResistances);
        });
    });

    describe('addFeats', () => {
        it('should add feats bonuses to a FeatsProfile', () => {
            const newFeatsProfile = addFeats(baseFeats, featBonus1, featBonus2);
            expect(newFeatsProfile).toEqual(combinedFeats);
        });
    });

    describe('addProfileBonuses', () => {
        it('should add multiple bonuses to a profile', () => {
            const base = {
                stats: baseStats,
                speeds: baseSpeeds,
                vitals: mkVitalsProfile({}),
                skills: baseSkills,
                saves: baseSaves,
                resistances: baseResistances,
                feats: baseFeats,
                features: {},
                traits: [],
            };
            const bonus1 = new SimpleBonus({
                stats: statBonus1,
                speedsModifiers: swimSpeedBonus,
                vitals: new VitalsBonus({ maxHpBonus: 5 }).export(),
                skills: skillBonus1,
                saves: saveBonus1,
                resistances: resistanceBonus1,
                feats: featBonus1.export(),
            });
            const bonus2 = new SimpleBonus({
                stats: statBonus2,
                speedsModifiers: multipleSpeedsBonus,
                vitals: new VitalsBonus({ maxSanityBonus: 3 }).export(),
                skills: skillBonus2,
                saves: saveBonus2,
                resistances: resistanceBonus2,
                feats: featBonus2.export(),
            });

            const combined = addProfileBonuses(base, bonus1, bonus2);
            expect(combined.stats).toEqual(combinedStats);
            expect(combined.speeds).toEqual(combinedSpeeds);
            // expect(combined.vitals).toEqual(mkVitalsProfile({}));
            expect(combined.skills).toEqual(combinedSkills);
            expect(combined.saves).toEqual(combinedSaves);
            //expect(combined.resistances).toEqual(combinedResistances);
            expect(combined.feats).toEqual(combinedFeats);
            expect(combined.features).toEqual({});
            expect(combined.traits).toEqual([]);
        });
    });
});
