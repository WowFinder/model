import { Character } from '../Character';

type Transformation = {
    apply(base: Character): Character;
};

export type { Transformation };
