import { Armor } from './Armor';
import { Weapon } from './Weapon';
import { Gear } from './base';

const gearBuilderByTypeKey: Record<string, (raw: unknown) => Gear> = {
    Gear: Gear.build,
    Accessory: Gear.build, // TODO #429: Review: specific class & builder needed?
    Weapon: Weapon.build,
    Armor: Armor.build,
};

/* istanbul ignore next: pending full rewrite */
function buildGear(raw: any): Gear {
    if (raw instanceof Gear) {
        return raw;
    }
    if (typeof raw === 'string') {
        let data: any = Gear.load();
        for (const chunk of raw.split('.')) {
            if (data == null || !(chunk in data)) {
                throw new TypeError(`Not a valid fqKey for Gear: ${raw}`);
            }
            data = data[chunk];
        }
        if (data instanceof Gear) {
            return data;
        } else {
            throw new TypeError(`Not a valid fqKey for Gear: ${raw}`);
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
