type ArmorProfile = {
    armorClass: number;
    touchArmorClass: number;
    flatFootedArmorClass: number;
    touchFlatFootedArmorClass: number;
    combatManeuverDefense: number;
};

const defaultArmorProfile: ArmorProfile = {
    armorClass: 10,
    touchArmorClass: 10,
    flatFootedArmorClass: 10,
    touchFlatFootedArmorClass: 10,
    combatManeuverDefense: 10,
};

export { type ArmorProfile, defaultArmorProfile };
