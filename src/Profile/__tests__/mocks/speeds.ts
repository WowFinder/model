import { SpeedsModifiersBonus } from '../../../Bonus';
import { SpeedsProfile } from '../../SpeedsProfile';

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

const combinedSpeeds = new SpeedsProfile({
    base: 40,
    dexBonus: 2,
    otherInitiativeModifiers: [1, 3],
    swim: 30,
    fly: 20,
});

export { baseSpeeds, swimSpeedBonus, multipleSpeedsBonus, combinedSpeeds };
