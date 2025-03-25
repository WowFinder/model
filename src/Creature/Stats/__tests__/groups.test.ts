import { Stat, StatGroup } from '@wowfinder/ts-enums';
import { statGroups, inGroup } from '../groups';

describe('statGroups', () => {
    it('should have the correct physical stats', () => {
        expect(statGroups.physical).toContain('strength');
        expect(statGroups.physical).toContain('dexterity');
        expect(statGroups.physical).toContain('constitution');
        expect(statGroups.physical.length).toBe(3);
    });
    it('should have the correct mental stats', () => {
        expect(statGroups.mental).toContain('intelligence');
        expect(statGroups.mental).toContain('wisdom');
        expect(statGroups.mental).toContain('charisma');
        expect(statGroups.mental.length).toBe(3);
    });
});
describe('inGroup', () => {
    it('should return true for correct group members', () => {
        expect(inGroup(Stat.strength, StatGroup.physical)).toBe(true);
        expect(inGroup(Stat.dexterity, StatGroup.physical)).toBe(true);
        expect(inGroup(Stat.constitution, StatGroup.physical)).toBe(true);
        expect(inGroup(Stat.intelligence, StatGroup.mental)).toBe(true);
        expect(inGroup(Stat.wisdom, StatGroup.mental)).toBe(true);
        expect(inGroup(Stat.charisma, StatGroup.mental)).toBe(true);
    });
    it('should return false for incorrect group members', () => {
        expect(inGroup(Stat.intelligence, StatGroup.physical)).toBe(false);
        expect(inGroup(Stat.wisdom, StatGroup.physical)).toBe(false);
        expect(inGroup(Stat.charisma, StatGroup.physical)).toBe(false);
        expect(inGroup(Stat.strength, StatGroup.mental)).toBe(false);
        expect(inGroup(Stat.dexterity, StatGroup.mental)).toBe(false);
        expect(inGroup(Stat.constitution, StatGroup.mental)).toBe(false);
    });
    it('should return false for non-stats', () => {
        expect(inGroup('foo' as Stat, StatGroup.physical)).toBe(false);
        expect(inGroup('bar' as Stat, StatGroup.mental)).toBe(false);
    });
});
