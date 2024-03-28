import {
    ResistancesBonus,
    SensesBonus,
    SimpleBonus,
    SkillsBonus,
    SpellPowerBonus,
    StatsBonus,
    VitalNeedsBonus,
} from '..';

describe('index', () => {
    it('should export all bonuses', () => {
        // expect(FeatsBonus).toBeDefined();
        expect(ResistancesBonus).toBeDefined();
        expect(SensesBonus).toBeDefined();
        expect(SimpleBonus).toBeDefined();
        expect(SkillsBonus).toBeDefined();
        // expect(SpeedsBonus).toBeDefined();
        expect(SpellPowerBonus).toBeDefined();
        expect(StatsBonus).toBeDefined();
        expect(VitalNeedsBonus).toBeDefined();
    });
});
