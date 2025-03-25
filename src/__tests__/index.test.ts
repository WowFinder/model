import {
    ActionTime,
    Adventure,
    AsyncAssetResolver,
    AsyncCachingAssetResolver,
    DamageSpec,
    Dice,
    Faction,
    reputationByScore,
    nextScore,
    initialHatedScore,
    threshholds,
    Item,
    defaultLang,
    SpellBase,
    Shapeshift,
    Scalar,
} from '../index';

describe('index', () => {
    it('should export Action-related members', () => {
        expect(ActionTime).toBeDefined();
    });
    it('should export Adventure-related members', () => {
        expect(Adventure).toBeDefined();
    });
    it('should export Asset-related members', () => {
        expect(AsyncAssetResolver).toBeDefined();
        expect(AsyncCachingAssetResolver).toBeDefined();
    });
    // Intentionally excluded: Character (pending rewrite)
    // Intentionally excluded: Choice (pending rewrite)
    it('should export Damage-related members', () => {
        expect(DamageSpec).toBeDefined();
        // Additional checks to be handled by Damage/__tests__/index.test.ts
    });
    it('should export Dice-related members', () => {
        expect(Dice).toBeDefined();
        // Additional checks to be handled by Dice/__tests__/index.test.ts and Dice/__tests__/helpers.test.ts
    });
    it('should export Faction-related members', () => {
        expect(Faction).toBeDefined();
        expect(reputationByScore).toBeDefined();
        expect(nextScore).toBeDefined();
        expect(initialHatedScore).toBeDefined();
        expect(threshholds).toBeDefined();
    });
    // Intentionally excluded: FullData (deprecated: will be replaced by AssetResolver objects)
    it('should export Item-related members', () => {
        expect(Item).toBeDefined();
        // Additional checks to be handled by Item/__tests__/index.test.ts
    });
    // Intentionally excluded: Rewards (only type exports)
    it('should export Language-related members', () => {
        expect(defaultLang).toBeDefined();
    });
    it('should export Magic-related members', () => {
        expect(SpellBase).toBeDefined();
        // Additional checks to be handled by Magic/__tests__/index.test.ts
    });
    it('should export Transformation-related members', () => {
        expect(Shapeshift).toBeDefined();
        // Additional checks to be handled by Transformation/__tests__/index.test.ts
    });
    it('should export Scalar-related members', () => {
        expect(Scalar).toBeDefined();
        // Additional checks to be handled by Scalar/__tests__/index.test.ts
    });
});
