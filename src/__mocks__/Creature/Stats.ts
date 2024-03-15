import { Stats } from '@wowfinder/asset-schemas';

const mixedStatsMock: Stats = {
    strength: 16,
    dexterity: 14,
    constitution: 12,
    intelligence: 18,
    wisdom: 10,
    charisma: 8,
};

const minimalStatsMock: Stats = {
    strength: 3,
    dexterity: 3,
    constitution: 3,
    intelligence: 3,
    wisdom: 3,
    charisma: 3,
};

const defaultStatsMock: Stats = {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
};

const twentyStatsMock: Stats = {
    strength: 20,
    dexterity: 20,
    constitution: 20,
    intelligence: 20,
    wisdom: 20,
    charisma: 20,
};

export { mixedStatsMock, minimalStatsMock, defaultStatsMock, twentyStatsMock };
