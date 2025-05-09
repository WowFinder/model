import { Feat } from '../../Feat';
import { checkFeatKey, checkWeaponFeatKey } from '../helpers';
import { raw, req, build, feat, allOf, either } from '..';

describe('Feats/builder/helpers', () => {
    describe('checkNoDuplicate', () => {
        it('should throw an error if there are duplicate keys', () => {
            expect(() => {
                feat(Feat.acrobaticSteps);
                feat(Feat.acrobaticSteps);
            }).toThrow('Duplicate feat key: acrobaticSteps');
        });
    });

    describe('checkFeatKey', () => {
        it('should throw an error if the key is not a valid Feat', () => {
            expect(() => {
                checkFeatKey('invalidFeat' as Feat);
            }).toThrow('Invalid feat key: invalidFeat');
        });
    });

    describe('checkWeaponFeatKey', () => {
        it('should throw an error if the key is not a valid WeaponFeat', () => {
            expect(() => {
                checkWeaponFeatKey('invalidWeaponFeat' as Feat);
            }).toThrow('Invalid weapon feat key: invalidWeaponFeat');
        });
    });

    describe('reexports from index.ts', () => {
        it('should reexport raw, req, build, feat, allOf, either', () => {
            expect(raw).toBeDefined();
            expect(req).toBeDefined();
            expect(build).toBeDefined();
            expect(feat).toBeDefined();
            expect(allOf).toBeDefined();
            expect(either).toBeDefined();
        });
    });
});
