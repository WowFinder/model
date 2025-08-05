function mapEnum<TEnum extends string, TValue>(
    enumObj: Record<TEnum, TEnum>,
    value: TValue,
): Record<TEnum, TValue> {
    return Object.keys(enumObj).reduce(
        (acc, key) => {
            acc[key as TEnum] = value;
            return acc;
        },
        {} as Record<TEnum, TValue>,
    );
}

export { mapEnum };
