import { Scalar } from '../Scalar';

function genericUnitsFormatter(unit: string): string {
    expect(unit.startsWith('units.')).toBe(true);
    const raw = unit.slice(6);
    return `[[${raw}]]`;
}

describe('Scalar', () => {
    it('should construct a generic scalar object', () => {
        const scalar = new Scalar({ value: 1, unit: 'arbitrary-unit' });
        expect(scalar.value).toBe(1);
        expect(scalar.unit).toBe('arbitrary-unit');
    });
    it('should convert to a string', () => {
        const scalar = new Scalar({ value: 1, unit: 'arbitrary-unit' });
        expect(scalar.toString()).toBe('1 arbitrary-unit');
    });
    it('should convert to a string with a custom formatter', () => {
        const scalar = new Scalar({ value: 1, unit: 'arbitrary-unit' });
        expect(scalar.toString(genericUnitsFormatter)).toBe(
            '1 [[arbitrary-unit]]',
        );
    });
    // Intentionally omitted `tryParse`: fully covered by the tests for subclasses
    // Intentionally omitted `makeConverter`: fully covered by the tests for subclasses
    // Intentionally omitted `add`: explicitly covered by subclasses
});
