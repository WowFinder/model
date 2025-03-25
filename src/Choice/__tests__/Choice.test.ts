import { Validator } from '@wowfinder/ts-utils';
import { Choice, ChoiceSelection } from '../Choice';

const trivialValidator: Validator<any> = (value: any) => !!value;
const numberValidator: Validator<any> = (value: any) =>
    typeof value === 'number';
describe('Choice', () => {
    it('should construct an instance', () => {
        const choice = new Choice({
            label: 'test',
            validator: trivialValidator,
        });
        expect(choice.label).toBe('test');
        expect(choice.validate('')).toBe(false);
        expect(choice.validate('test')).toBe(true);
    });
});

describe('ChoiceSelection', () => {
    const numberChoice = new Choice({
        label: 'number',
        validator: numberValidator,
    });
    it('should construct an instance', () => {
        const selection = new ChoiceSelection({
            choice: numberChoice,
            value: 42,
        });
        expect(selection.label).toBe('number');
        expect(selection.value).toBe(42);
    });
    it('should throw for invalid values', () => {
        expect(
            () =>
                new ChoiceSelection({
                    choice: numberChoice,
                    value: 'test',
                }),
        ).toThrow();
    });
});
