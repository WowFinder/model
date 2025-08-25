import { StringFormatter } from '@wowfinder/ts-utils';

const t: StringFormatter = (
    key: string,
    params?: Record<string, any>,
): string => {
    if (params && Object.keys(params).length) {
        return `${key} ${JSON.stringify(params)}`;
    }
    return key;
};

function expectDefined<T>(value: T | undefined): asserts value is T {
    expect(value).toBeDefined();
}

export { t, expectDefined };
