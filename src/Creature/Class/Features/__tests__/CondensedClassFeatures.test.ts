import {
    simpleMartialClassFeatureListMock,
    simpleMartialClassFeatureCountsMock,
} from '__mocks__';
import { CondensedClassFeatures, ClassFeature } from '../';

describe('CondensedClassFeatures', () => {
    const condensed = new CondensedClassFeatures(
        simpleMartialClassFeatureListMock,
    );

    it('should count features', () => {
        expect(condensed.count(ClassFeature.bonusCombatFeat)).toBe(3);
        expect(condensed.count(ClassFeature.weaponTraining)).toBe(2);
        expect(condensed.count(ClassFeature.armorTraining)).toBe(1);
        expect(condensed.count(ClassFeature.arcaneSchool)).toBe(0);
    });

    it('should list features', () => {
        expect(condensed.list).toEqual(simpleMartialClassFeatureCountsMock);
    });
});
