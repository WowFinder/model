import { MassUnit, Rarity } from '@wowfinder/ts-enums';
import { Mass } from '../../Scalar';
import { Item, type ItemBuilder } from '../base';
import { Money } from '../Money';

const mockWeightPounds = 3;
const mockMoneyRaw = 12345;

class ItemImpl extends Item {
    get weight(): Mass {
        return new Mass({
            value: mockWeightPounds,
            unit: MassUnit.pound,
        });
    }

    get value(): Money {
        return Money.fromRaw(mockMoneyRaw);
    }
}

const mockItemKey = 'simpleItem';

const mockItemBuilder: ItemBuilder = {
    label: `test.${mockItemKey}`,
};

const mockRareItemBuilder: ItemBuilder = {
    label: 'test.rareItem',
    rarity: Rarity.rare,
};

export {
    ItemImpl,
    mockItemBuilder,
    mockRareItemBuilder,
    mockItemKey,
    mockWeightPounds,
    mockMoneyRaw,
};
