import { mockedDruidCharacter } from '../../../__mocks__';
import { Shapeshift, type ShapeshiftBuilder } from '../base';

class ShapeshiftTest extends Shapeshift {
    constructor({ rank }: ShapeshiftBuilder) {
        super({ rank });
    }

    compute(): any {
        throw new Error('Not implemented yet');
    }
}

describe('Shapeshift', () => {
    describe('constructor', () => {
        it('should create an instance of ShapeshiftTest with arbitrary ranks', () => {
            for (const rank of [1, 2, 3, 4, 5]) {
                const shapeshift = new ShapeshiftTest({ rank });
                expect(shapeshift).toBeInstanceOf(ShapeshiftTest);
                expect(shapeshift.rank).toBe(rank);
            }
        });
    });
    describe('apply', () => {
        it('should throw a NotImplemented error', () => {
            const shapeshift = new ShapeshiftTest({ rank: 1 });
            expect(() => shapeshift.apply({})).toThrow(
                'Not implemented yet',
            );
        });
    });
    describe('defaultSize', () => {
        it('should return the default size based on the rank', () => {
            expect(Shapeshift.defaultSize(1)).toBe(0);
            expect(Shapeshift.defaultSize(2)).toBe(0);
            expect(Shapeshift.defaultSize(3)).toBe(1);
            expect(Shapeshift.defaultSize(4)).toBe(1);
            expect(Shapeshift.defaultSize(5)).toBe(2);
        });
    });

    describe('effectiveDruidLevel', () => {
        it('should return the effective druid level based on the base profile', () => {
            const edl = Shapeshift.effectiveDruidLevel(mockedDruidCharacter);
            expect(edl).toBe(3);
        });
    });
});
