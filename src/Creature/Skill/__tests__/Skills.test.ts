import { Skill } from '@wowfinder/ts-enums';
import { Skills } from '../';
import { SkillSpec } from '../SkillSpec';

describe('Skills', () => {
    describe('should provide an exhaustive set of valid Skill specs', () => {
        for (const s of Object.values(Skill)) {
            it(`Entry for ${s} should be a valid SkillSpec`, () => {
                const spec = Skills[s];
                expect(spec).toBeInstanceOf(SkillSpec);
                expect(spec.key).toBe(s);
            });
        }
    });
});
