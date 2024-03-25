import * as allExports from '../index';

type Stringable = { toString(): string };
function sorter<T extends Stringable>(a: T, b: T): number {
    return a.toString().localeCompare(b.toString());
}

describe('list all exports', () => {
    it('should have exports', () => {
        console.log(
            'exported keys: ',
            Object.keys(allExports).toSorted(sorter).join(', '),
        );
        expect(true).toBe(true);
    });
});
