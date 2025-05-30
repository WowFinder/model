import { sum } from '@wowfinder/ts-utils';
import {
    rawBaseCreatureExpanded,
    rawBaseCreatureMinimal,
} from '../../__mocks__';
import { type ClassEntries } from '../CreatureBase';
import Race from '../Race';
import { mkExpandedCreature, mkMinimalCreature } from './helpers';

describe('CreatureBase', () => {
    it('should create a minimal instance', async () => {
        const instance = await mkMinimalCreature();
        expect(instance.key).toBe('base-creature-mock-minimal');
        expect(instance.notes).toEqual('');
        expect(instance.baseStats).toEqual(rawBaseCreatureMinimal.baseStats);
        expect(instance.race instanceof Race).toBe(true);
        expect(instance.personal.fullName).toEqual(
            rawBaseCreatureMinimal.personal.fullName,
        );
        expect(instance.classes).toHaveLength(0);
    });
    it('should create an expanded instance', async () => {
        const instance = await mkExpandedCreature();
        expect(instance.key).toBe('base-creature-mock-expanded');
        expect(instance.notes).toEqual(rawBaseCreatureExpanded.notes);
        expect(instance.baseStats).toEqual(rawBaseCreatureExpanded.baseStats);
        expect(instance.personal.alignment).toBe(
            rawBaseCreatureExpanded.personal.alignment,
        );
        expect(instance.personal.weight.pounds).toBe(
            rawBaseCreatureExpanded.personal.weight,
        );
        expect(instance.race instanceof Race).toBe(true);
        const classes: ClassEntries = instance.classes;
        expect(classes).toHaveLength(4);
        expect(sum(...classes.map(c => c.level))).toBe(16);
        expect(instance.featSelections).toEqual(rawBaseCreatureExpanded.feats);
        expect(instance.feats.length).toBe(
            rawBaseCreatureExpanded.feats?.length,
        );
    });
});
