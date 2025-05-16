import { SavesBonus } from '../../../Bonus';

const baseSaves = {
    fortitude: 10,
    reflexes: 12,
    will: 14,
};

const saveBonus1 = new SavesBonus({
    fortitude: 2,
    reflexes: 3,
});

const saveBonus2 = new SavesBonus({
    will: 4,
});

const combinedSaves = {
    fortitude: 12,
    reflexes: 15,
    will: 18,
};

export { baseSaves, saveBonus1, saveBonus2, combinedSaves };
