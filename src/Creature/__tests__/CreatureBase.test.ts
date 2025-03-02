import { sum } from '@wowfinder/ts-utils';
import {
    mockAssetResolver,
    rawBaseCreatureExpanded,
    rawBaseCreatureMinimal,
} from '../../__mocks__';
import { ClassEntries, CreatureBase } from '../CreatureBase';
import Race from '../Race';

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
    it('should create an expanded instance', async () => {
        const instance = new CreatureBaseTestingImplementation(
            rawBaseCreatureExpanded,
            mockAssetResolver,
        );
        expect(instance.key).toBe('base-creature-mock-expanded');
        expect(instance.notes).toEqual(rawBaseCreatureExpanded.notes);
        expect(instance.baseStats).toEqual(rawBaseCreatureExpanded.baseStats);
        expect(instance.personal.alignment).toBe(
            rawBaseCreatureExpanded.personal.alignment,
        );
        expect(instance.personal.weight.pounds).toBe(
            rawBaseCreatureExpanded.personal.weight,
        );
        expect((await instance.race) instanceof Race).toBe(true);
        const classes: ClassEntries = await instance.classes;
        expect(classes).toHaveLength(4);
        expect(sum(...classes.map(c => c.level))).toBe(16);
    });
});
