import { SpellCoreComponent } from '@wowfinder/ts-enums';
import type { Item } from '../../Item/base';
import { buildItem } from '../../Item/builders';

type SpellComponent = SpellCoreComponent | Item;

function parseSpellComponent(component: string): SpellComponent {
    if (component in SpellCoreComponent) {
        return component as SpellCoreComponent;
    }
    return buildItem(component);
}

export { parseSpellComponent };
export type { SpellComponent };
