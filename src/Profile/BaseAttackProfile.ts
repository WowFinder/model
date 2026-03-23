type BaseAttackProfile = {
    meleeAttackBonus: number;
    rangedAttackBonus: number;
    touchAttackBonus: number;
    rayAttackBonus: number;
    combatManeuverBonus: number;
};

const defaultBaseAttackProfile: BaseAttackProfile = {
    meleeAttackBonus: 0,
    rangedAttackBonus: 0,
    touchAttackBonus: 0,
    rayAttackBonus: 0,
    combatManeuverBonus: 0,
};

export { type BaseAttackProfile, defaultBaseAttackProfile };
