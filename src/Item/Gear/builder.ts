// import { builder, ByKeyRecursive, ByKeyRecursiveEntry } from '@wowfinder/ts-utils';
// import { Item } from '../base';
import { Armor } from './Armor';
import { Weapon } from './Weapon';
import { Gear } from './base';

const gearBuilderByTypeKey: { [key: string]: any /* builder<Item> */ } = {
    Gear: Gear.build,
    Accessory: Gear.build, // TODO #429: Review: specific class & builder needed?
    Weapon: Weapon.build,
    Armor: Armor.build,
};

function buildGear(raw: any): Gear {
    if (raw instanceof Gear) {
        return raw;
    }
    if (typeof raw === 'string') {
        // let data: ByKeyRecursiveEntry<Gear> = Gear.load(buildGear);
        let data: any = Gear.load();
        for (const chunk of raw.split('.')) {
            if (Object.keys(data).includes(chunk)) {
                data = (data as any) /* ByKeyRecursive<Gear> */[chunk];
            } else {
                throw new Error(`Not a valid fqKey for Gear: ${raw}`);
            }
        }
        if (data instanceof Gear) {
            return data as Gear;
        } else {
            throw new Error(`Not a valid fqKey for Gear: ${raw}`);
        }
    }
    switch ((raw.$type as string) || '') {
        case 'Armor':
            return Armor.build(raw);
        case 'Weapon':
            return Weapon.build(raw);
        default:
            return Gear.build(raw);
    }
}

export { gearBuilderByTypeKey, buildGear };
