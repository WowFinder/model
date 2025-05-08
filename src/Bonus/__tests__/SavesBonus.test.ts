import { type RawSaves } from '@wowfinder/asset-schemas';
import { SavesBonus } from '../SavesBonus';

const mockSaves: RawSaves = {
    fortitude: 2,
    reflexes: 1,
    will: 3,
};

describe('SavesBonus', () => {
    it('should construct a saves bonus with all properties', () => {
        const savesBonuses = new SavesBonus(mockSaves);
        expect(savesBonuses.fortitude).toBe(2);
        expect(savesBonuses.reflexes).toBe(1);
        expect(savesBonuses.will).toBe(3);
    });

    it('should construct a saves bonus with default values', () => {
        const savesBonuses = new SavesBonus();
        expect(savesBonuses.fortitude).toBe(0);
        expect(savesBonuses.reflexes).toBe(0);
        expect(savesBonuses.will).toBe(0);
    });

    it('should return a zero bonus', () => {
        expect(SavesBonus.zero.fortitude).toBe(0);
        expect(SavesBonus.zero.reflexes).toBe(0);
        expect(SavesBonus.zero.will).toBe(0);
    });

    it('should sum bonuses', () => {
        const savesBonuses = new SavesBonus(mockSaves);
        const bonusesToAdd = [savesBonuses, savesBonuses];
        const sumBonus = SavesBonus.sum(...bonusesToAdd);
        expect(sumBonus.fortitude).toBe(4);
        expect(sumBonus.reflexes).toBe(2);
        expect(sumBonus.will).toBe(6);
    });

    it('should get the maximum non-zero bonus', () => {
        const maxBonus = SavesBonus.max(
            new SavesBonus(mockSaves),
            SavesBonus.zero,
        );
        expect(maxBonus.fortitude).toBe(2);
        expect(maxBonus.reflexes).toBe(1);
        expect(maxBonus.will).toBe(3);
    });
});
