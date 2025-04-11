import { Validator } from '@wowfinder/ts-utils';

type BaseChoiceBuilder = {
    label: string;
};

type ChoiceBuilder = BaseChoiceBuilder & {
    validator: Validator<any>;
};

class Choice {
    readonly #label: string;
    readonly #validator: Validator<any>;

    constructor({ label, validator }: ChoiceBuilder) {
        this.#label = label;
        this.#validator = validator;
    }

    get label(): string {
        return this.#label;
    }

    validate(value: any): boolean {
        return this.#validator(value);
    }
}

type ChoiceSelectionBuilder = {
    choice: Choice;
    value: any;
};
class ChoiceSelection {
    readonly #choice: Choice;
    readonly #value: any;

    constructor({ choice, value }: ChoiceSelectionBuilder) {
        if (!choice.validate(value)) {
            throw new Error(`Invalid value for choice ${choice.label}`);
        }
        this.#choice = choice;
        this.#value = value;
    }

    get label(): string {
        return this.#choice.label;
    }

    get value(): any {
        return this.#value;
    }
}

export type { BaseChoiceBuilder };

export { Choice, ChoiceSelection };
