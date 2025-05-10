import { type CharacterBaseInterface } from '../Character';

type Transformation = {
    apply(base: CharacterBaseInterface): CharacterBaseInterface;
};

export type { Transformation };
