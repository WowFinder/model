import { SpellCoreComponent } from '@wowfinder/ts-enums';
import { buildItem, Item } from 'Item';

type SpellComponent = SpellCoreComponent | Item;

function parseSpellComponent(component: string): SpellComponent {
    if (component in SpellCoreComponent) {
        return component as SpellCoreComponent;
    }
    return buildItem(component);
}

export type { SpellComponent };
export { parseSpellComponent };
