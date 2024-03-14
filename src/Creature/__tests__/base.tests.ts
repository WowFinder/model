import Race from 'Character/Race';
import { CreatureBase } from '../base';
import {
    rawBaseCreatureMinimal,
    // rawBaseCreatureExpanded,
    mockAssetResolver,
} from '__mocks__';

class CreatureBaseTestingImplementation extends CreatureBase {}

describe('CreatureBase', () => {
    it('should create a minimal instance', () => {
        const instance = new CreatureBaseTestingImplementation(
            rawBaseCreatureMinimal,
            mockAssetResolver,
        );
        expect(instance.key).toBe('base-creature-mock-minimal');
        expect(instance.baseStats).toEqual(rawBaseCreatureMinimal.baseStats);
        expect(instance.race instanceof Race).toBe(true);
    });
});
