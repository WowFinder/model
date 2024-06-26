import Race from '../Race';
import { CreatureBase } from '../CreatureBase';
import {
    rawBaseCreatureMinimal,
    // rawBaseCreatureExpanded,
    mockAssetResolver,
} from '../../__mocks__';

class CreatureBaseTestingImplementation extends CreatureBase {}

describe('CreatureBase', () => {
    it('should create a minimal instance', async () => {
        const instance = new CreatureBaseTestingImplementation(
            rawBaseCreatureMinimal,
            mockAssetResolver,
        );
        expect(instance.key).toBe('base-creature-mock-minimal');
        expect(instance.notes).toEqual('');
        expect(instance.baseStats).toEqual(rawBaseCreatureMinimal.baseStats);
        expect((await instance.race) instanceof Race).toBe(true);
        expect(instance.personal.fullName).toEqual(
            rawBaseCreatureMinimal.personal.fullName,
        );
        expect(await instance.classes).toHaveLength(0);
    });
    /* TODO
    !! Test disabled until Character/Class is fully covered
    // import { sum } from '@wowfinder/ts-utils';
    it('should create an expanded instance', () => {
        const instance = new CreatureBaseTestingImplementation(
            rawBaseCreatureExpanded,
            mockAssetResolver,
        );
        expect(instance.key).toBe('base-creature-mock-expanded');
        expect(instance.notes).toEqual(rawBaseCreatureExpanded.notes);
        expect(instance.baseStats).toEqual(rawBaseCreatureExpanded.baseStats);
        expect(instance.race instanceof Race).toBe(true);
        expect(instance.personal.alignment).toBe(
            rawBaseCreatureExpanded.personal.alignment,
        );
        expect(instance.personal.weight).toBe(
            rawBaseCreatureExpanded.personal.weight,
        );
        expect(instance.classes).toHaveLength(4);
        expect(sum(...instance.classes.map(c => c.level))).toBe(16);
    }); */
});
