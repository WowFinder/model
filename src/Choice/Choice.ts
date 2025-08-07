import { Validator } from '@wowfinder/ts-utils';

type BaseChoiceBuilder = {
    label: string;
};

type ChoiceBuilder<T> = BaseChoiceBuilder & {
    validator: Validator<T>;
};

class Choice<T = any> {
    readonly #label: string;
    readonly #validator: Validator<any>;

    constructor({ label, validator }: ChoiceBuilder<T>) {
        this.#label = label;
        this.#validator = validator;
    }

    get label(): string {
        return this.#label;
    }

    validate(value: T): boolean {
        return this.#validator(value);
    }
}

type ChoiceSelectionBuilder<T> = {
    choice: Choice<T>;
    value: T;
};
class ChoiceSelection<T = any> {
    readonly #choice: Choice<T>;
    readonly #value: T;

    constructor({ choice, value }: ChoiceSelectionBuilder<T>) {
        if (!choice.validate(value)) {
            throw new Error(`Invalid value for choice ${choice.label}`);
        }
        this.#choice = choice;
        this.#value = value;
    }

    get label(): string {
        return this.#choice.label;
    }

    get value(): T {
        return this.#value;
    }
}

export type { BaseChoiceBuilder };

export { Choice, ChoiceSelection };
