import { ResistancesBonus } from '../../../Bonus';
import { fillResistances } from '../../../Creature/Resistances/fill';

const baseResistances = fillResistances({
    nature: 5,
    cold: 10,
    fire: 15,
});

const resistanceBonus1 = new ResistancesBonus({
    nature: 2,
    cold: 3,
});

const resistanceBonus2 = new ResistancesBonus({
    fire: 4,
});

const combinedResistances = fillResistances({
    nature: 7,
    cold: 13,
    fire: 19,
});
export {
    baseResistances,
    resistanceBonus1,
    resistanceBonus2,
    combinedResistances,
};
