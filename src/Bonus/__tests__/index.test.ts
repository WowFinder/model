import {
    BaseSpeedsBonus,
    FeatsBonus,
    ResistancesBonus,
    SensesBonus,
    SimpleBonus,
    SkillsBonus,
    SpeedsModifiersBonus,
    SpellPowerBonus,
    StatsBonus,
    VitalNeedsBonus,
} from '..';

describe('index', () => {
    it('should export all bonuses', () => {
        expect(BaseSpeedsBonus).toBeDefined();
        expect(FeatsBonus).toBeDefined();
        expect(ResistancesBonus).toBeDefined();
        expect(SensesBonus).toBeDefined();
        expect(SimpleBonus).toBeDefined();
        expect(SkillsBonus).toBeDefined();
        expect(SpeedsModifiersBonus).toBeDefined();
        expect(SpellPowerBonus).toBeDefined();
        expect(StatsBonus).toBeDefined();
        expect(VitalNeedsBonus).toBeDefined();
    });
});
