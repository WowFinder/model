type RewardByFaction = {
    [factionLabel: string]: number;
};

type RewardByCharacter = {
    [characterKey: string]: number;
};

type RewardsByCharacter = {
    [characterKey: string]: RewardByFaction;
};

type RewardsByFaction = {
    [factionLabel: string]: RewardByCharacter;
};

export type {
    RewardByFaction,
    RewardsByCharacter,
    RewardsByFaction,
    RewardByCharacter,
};
