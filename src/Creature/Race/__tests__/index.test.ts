import { mockedRaceRawAsset } from '../../../__mocks__/Creature/race';
import { Race } from '../index';
import {
    Alignment,
    InnateTrait,
    Languages,
    Skill,
    Stat,
    TimeUnit,
} from '@wowfinder/ts-enums';
import { defaultSpeedUnit } from '../../../Scalar';
import { fillStatSet } from '../../Stats';

describe('Race', () => {
    it('should be able to create a new instance', () => {
        const instance = new Race(mockedRaceRawAsset);
        expect(instance instanceof Race).toBe(true);
        expect(instance.key).toEqual('mocked-race');
        expect(instance.size).toBe(0);
        for (const stat of Object.values(Stat)) {
            expect(instance.statMods[stat as Stat]).toBe(0);
        }
        for (const skill of Object.values(Skill)) {
            expect(instance.skillMods[skill as Skill]).toBeUndefined();
        }
        expect(instance.bonusSkillRanksPerLevel).toBe(0);
        expect(instance.bonusStartingFeats).toBe(0);
        expect(instance.initialLanguages).toEqual([Languages.common]);
        expect(instance.additionalLanguages).toEqual([]);
        expect(instance.commonAlignments).toEqual([Alignment.neutralNeutral]);
        expect(instance.speeds.base.value).toEqual(30);
        expect(instance.speeds.base.unit).toEqual(defaultSpeedUnit);
        expect(instance.saves.fortitude).toBe(1);
        expect(instance.saves.reflexes).toBe(-1);
        expect(instance.saves.will).toBe(0);
        expect(instance.naturalArmor).toBe(0);
        const { vitals, resistances, traits } = instance;
        expect(vitals).toBeDefined();
        expect(vitals.sleepTimeReduction.convert(TimeUnit.hour).value).toBe(2);
        expect(
            vitals.breathHoldingTimeBonus.convert(TimeUnit.second).value,
        ).toBe(30);
        expect(resistances).toBeDefined();
        expect(resistances.cold).toBe(5);
        expect(traits).toBeDefined();
        expect(traits).toContain(InnateTrait.darkvision60);
    });
    it('should create a new instance with minimal arguments', () => {
        const instance = new Race({
            key: 'minimal-test-race',
            size: 0,
            statMods: fillStatSet({}, 0),
            racialPoints: 0,
            speeds: {
                base: 30,
            },
            initialLanguages: [],
            additionalLanguages: [],
            commonAlignments: [],
        });
        expect(instance instanceof Race).toBe(true);
        expect(instance.key).toEqual('minimal-test-race');
        expect(instance.traits).toBeDefined();
        expect(instance.traits).toHaveLength(0);
    });
    it('should identify common alignments', () => {
        const instance = new Race(mockedRaceRawAsset);
        for (const alignment of Object.values(Alignment)) {
            expect(instance.isCommonAlignment(alignment)).toBe(
                mockedRaceRawAsset.commonAlignments.includes(alignment),
            );
        }
    });
});
