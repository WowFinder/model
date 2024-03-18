import { Stats } from '@wowfinder/asset-schemas';

const zeroStatsMock: Stats = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
};

const defaultStatsMock: Stats = {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
};

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

const twentyStatsMock: Stats = {
    strength: 20,
    dexterity: 20,
    constitution: 20,
    intelligence: 20,
    wisdom: 20,
    charisma: 20,
};

const meleeBonusesStatsMock: Stats = {
    ...zeroStatsMock,
    strength: +2,
    dexterity: +1,
};

const mixedBonusStatsMock: Stats = {
    ...zeroStatsMock,
    constitution: -2,
    intelligence: +2,
    charisma: +2,
};

const goodFinesseStatsMock: Stats = {
    ...defaultStatsMock,
    strength: 8,
    dexterity: 12,
};

const badFinesseStatsMock: Stats = {
    ...defaultStatsMock,
    strength: 12,
    dexterity: 8,
};

export {
    zeroStatsMock,
    mixedStatsMock,
    minimalStatsMock,
    defaultStatsMock,
    twentyStatsMock,
    goodFinesseStatsMock,
    badFinesseStatsMock,
    meleeBonusesStatsMock,
    mixedBonusStatsMock,
};
