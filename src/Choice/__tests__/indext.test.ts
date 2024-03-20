import {
    Choice,
    ChoiceSelection,
    FeatChoice,
    CombatFeatChoice,
    MagicFeatChoice,
} from '../index';

describe('root exports', () => {
    it('should export Choice', () => {
        expect(Choice).toBeDefined();
    });
    it('should export ChoiceSelection', () => {
        expect(ChoiceSelection).toBeDefined();
    });
    it('should export FeatChoice', () => {
        expect(FeatChoice).toBeDefined();
    });
    it('should export CombatFeatChoice', () => {
        expect(CombatFeatChoice).toBeDefined();
    });
    it('should export MagicFeatChoice', () => {
        expect(MagicFeatChoice).toBeDefined();
    });
});
