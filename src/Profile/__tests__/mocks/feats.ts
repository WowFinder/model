import { FeatsBonus } from '../../../Bonus';
import { Feat } from '../../../Creature/Feats';

const baseFeats = {
    [Feat.acrobaticSteps]: 1,
    [Feat.brewPotion]: 1,
};

const featBonus1 = new FeatsBonus([Feat.acrobaticSteps, Feat.cleave]);

const featBonus2 = new FeatsBonus([Feat.acrobaticSteps, Feat.vitalStrike]);

const combinedFeats = {
    [Feat.acrobaticSteps]: 2,
    [Feat.brewPotion]: 1,
    [Feat.cleave]: 1,
    [Feat.vitalStrike]: 1,
};
export { baseFeats, featBonus1, featBonus2, combinedFeats };
