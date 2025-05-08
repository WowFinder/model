import { auraBonuses } from '..';
import { Aura } from '@wowfinder/ts-enums';

describe('Aura bonuses', () => {
    for (const key of Object.keys(Aura)) {
        it(`should return a bonus for ${key}`, () => {
            const bonus = auraBonuses[key as Aura](1);
            expect(bonus).toBeDefined();
        });
    }
});
