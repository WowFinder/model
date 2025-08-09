import { Item } from './base';
import { consumableBuilderByTypeKey } from './Consumable';
import { gearBuilderByTypeKey } from './Gear';
import { goodBuilderByTypeKey } from './Good';

const builderByTypeKey: { [key: string]: any /* builder<Item> */ } = {
    ...gearBuilderByTypeKey,
    ...goodBuilderByTypeKey,
    ...consumableBuilderByTypeKey,
};

const builderKeys = Object.keys(builderByTypeKey);

const badData = (raw: any): Error => new Error(`Invalid item data: ${raw}`);

/**
 * Retrieves a preloaded `Item` instance by its fully qualified key.
 *
 * @param fqKey - The fully qualified key identifying the item
 * @returns The corresponding `Item` instance
 * @throws Error if the function is not implemented
 */
function retrievePreloaded(fqKey: string): Item {
    throw new Error('Not implemented');
}

/**
 * Constructs an `Item` instance from various raw input formats.
 *
 * If the input is already an `Item`, it is returned as-is. If the input is a string, it is treated as a key to retrieve a preloaded item. Otherwise, the function attempts to build an `Item` using a registered builder based on the `$type` property of the input. Throws an error if the input cannot be processed.
 *
 * @param raw - The raw input to convert into an `Item`
 * @returns The constructed `Item` instance
 */
function buildItem(raw: any): Item {
    if (raw instanceof Item) {
        return raw;
    }
    if (typeof raw === 'string') {
        return retrievePreloaded(raw);
    }
    const $type = (raw?.$type as string) || '';
    if (builderKeys.includes($type)) {
        return builderByTypeKey[$type](raw);
    } else {
        throw badData(raw);
    }
}

export { buildItem };
