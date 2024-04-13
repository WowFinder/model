import { MultiBonusBuilder } from '../../Bonus/MultiBonus';
import { fullSimpleBonusBuilder } from './SimpleBonusBuilders';

const defaultMultiBonusBuilder: MultiBonusBuilder = {};

const fullMultiBonusBuilder: Required<MultiBonusBuilder> = {
    gear: { ...fullSimpleBonusBuilder },
    enhancement: { ...fullSimpleBonusBuilder },
    deflection: { ...fullSimpleBonusBuilder },
    natural: { ...fullSimpleBonusBuilder },
    temporal: { ...fullSimpleBonusBuilder },
    aura: { ...fullSimpleBonusBuilder },
};

export { defaultMultiBonusBuilder, fullMultiBonusBuilder };
