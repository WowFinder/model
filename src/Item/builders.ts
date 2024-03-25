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

const errors = {
    badKey: (fqkey: string): Error =>
        new Error(`Not a valid fqKey for Item: ${fqkey}`),
    badData: (raw: any): Error => new Error(`Invalid item data: ${raw}`),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function retrievePreloaded(fqKey: string): Item {
    throw new Error('Not implemented');
}

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
        throw errors.badData(raw);
    }
}

export { buildItem };
