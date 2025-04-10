import {
    simpleMartialClassFeatureListMock,
    simpleMartialClassFeatureCountsMock,
} from '../../../../__mocks__';
import { CondensedProgressionFeatures, ProgressionFeature } from '..';

describe('CondensedClassFeatures', () => {
    const condensed = new CondensedProgressionFeatures(
        simpleMartialClassFeatureListMock,
    );

    it('should count features', () => {
        expect(condensed.count(ProgressionFeature.bonusCombatFeat)).toBe(3);
        expect(condensed.count(ProgressionFeature.weaponTraining)).toBe(2);
        expect(condensed.count(ProgressionFeature.armorTraining)).toBe(1);
        expect(condensed.count(ProgressionFeature.arcaneSchool)).toBe(0);
    });

    it('should list features', () => {
        expect(condensed.list).toEqual(simpleMartialClassFeatureCountsMock);
    });
});
