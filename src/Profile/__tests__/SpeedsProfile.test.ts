import { SpeedsProfile, addSpeeds } from '../SpeedsProfile';
import { SpeedsModifiersBonus } from '../../Bonus';

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

    describe('addSpeeds', () => {
        it('should add speed bonuses to a SpeedsProfile', () => {
            const baseSpeeds = new SpeedsProfile({
                base: 30,
                dexBonus: 2,
                otherInitiativeModifiers: [1, 3],
            });

            const swimSpeedBonus = new SpeedsModifiersBonus({
                swim: 10,
            });

            const multipleSpeedsBonus = new SpeedsModifiersBonus({
                base: 10,
                swim: 20,
                fly: 20,
            });

            const newSpeedsProfile = addSpeeds(
                baseSpeeds,
                swimSpeedBonus,
                multipleSpeedsBonus,
            );

            expect(newSpeedsProfile.initiative).toBe(6);
            expect(newSpeedsProfile.base.value).toBe(40);
            expect(newSpeedsProfile.swim.value).toBe(30);
            expect(newSpeedsProfile.fly.value).toBe(20);
        });
    });
});
