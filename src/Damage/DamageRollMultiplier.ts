enum SpecialDamageRollMultiplier {
    CasterLevel = 'CasterLevel',
    TotalLevel = 'TotalLevel',
}

type DamageRollMultiplier = number | SpecialDamageRollMultiplier;

export { type DamageRollMultiplier, SpecialDamageRollMultiplier };
