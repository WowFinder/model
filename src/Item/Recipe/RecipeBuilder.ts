import { Skill } from '@wowfinder/ts-enums';
import { ItemCollectionBuilder } from './ItemCollection';

type RecipeBuilder = {
    skill: Skill;
    dc: number;
    materials: ItemCollectionBuilder;
    time: string;
    output: ItemCollectionBuilder;
};

export type { RecipeBuilder };
