import { SpeedsProfile } from '../SpeedsProfile';

describe('SpeedsProfile', () => {
    it('should create a SpeedsProfile instance with default values', () => {
        const speedsProfile = new SpeedsProfile({
            base: 30,
        });

        expect(speedsProfile.initiative).toBe(0);
    });

    it('should create a SpeedsProfile instance with custom values', () => {
        const speedsProfile = new SpeedsProfile({
            base: 30,
            dexBonus: 2,
            otherInitiativeModifiers: [1, 3],
        });

        expect(speedsProfile.initiative).toBe(6);
        const exported = speedsProfile.export();
        expect(exported.dexBonus).toBeDefined();
        expect(exported.dexBonus).toBe(2);
        expect(exported.otherInitiativeModifiers).toBeDefined();
        expect(exported.otherInitiativeModifiers.length).toBe(2);
        expect(exported.otherInitiativeModifiers).toContain(1);
        expect(exported.otherInitiativeModifiers).toContain(3);
    });
});
