import { Money, asMoney, type PartialMoneyBreakdown } from '../Money';

describe('Money', () => {
    describe('builder methods', () => {
        it('should create a new instance from a raw value', () => {
            const rawValue = 12345;
            const moneyInstance = Money.fromRaw(rawValue);
            expect(moneyInstance).toBeInstanceOf(Money);
            expect(moneyInstance.raw).toBe(rawValue);
        });
        it('should create a new instance from a breakdown', () => {
            const breakdown: PartialMoneyBreakdown = { c: 10, s: 15, g: 20 };
            const moneyInstance = Money.fromBreakdown(breakdown);
            expect(moneyInstance).toBeInstanceOf(Money);
            expect(moneyInstance.raw).toBe(201510);
        });
        it('should create a zero instance from an empty breakdown', () => {
            const breakdown: PartialMoneyBreakdown = {};
            const moneyInstance = Money.fromBreakdown(breakdown);
            expect(moneyInstance).toBeInstanceOf(Money);
            expect(moneyInstance.raw).toBe(0);
        });
        it('should create a new instance from an existing instance', () => {
            const moneyInstance1 = Money.fromRaw(12345);
            const moneyInstance2 = Money.fromMoney(moneyInstance1);
            expect(moneyInstance2).toBeInstanceOf(Money);
            expect(moneyInstance2.raw).toBe(moneyInstance1.raw);
        });
        it('should create a zero instance', () => {
            const zeroInstance = Money.zero;
            expect(zeroInstance).toBeInstanceOf(Money);
            expect(zeroInstance.raw).toBe(0);
        });
    });

    describe('add method overloads', () => {
        it('should add a Money instance', () => {
            const money1 = Money.fromRaw(100);
            const money2 = Money.fromRaw(50);
            const result = money1.add(money2);
            expect(result).toBeInstanceOf(Money);
            expect(result.raw).toBe(150);
        });

        it('should add a number', () => {
            const money = Money.fromRaw(100);
            const result = money.add(50);
            expect(result).toBeInstanceOf(Money);
            expect(result.raw).toBe(150);
        });

        it('should add a breakdown', () => {
            const money = Money.fromRaw(100);
            const breakdown: PartialMoneyBreakdown = { c: 10, s: 15, g: 20 };
            const result = money.add(breakdown);
            expect(result).toBeInstanceOf(Money);
            expect(result.raw).toBe(201610);
        });
    });

    describe('subtract method overloads', () => {
        it('should subtract a Money instance', () => {
            const money1 = Money.fromRaw(100);
            const money2 = Money.fromRaw(50);
            const result = money1.subtract(money2);
            expect(result).toBeInstanceOf(Money);
            expect(result.raw).toBe(50);
        });

        it('should subtract a number', () => {
            const money = Money.fromRaw(100);
            const result = money.subtract(50);
            expect(result).toBeInstanceOf(Money);
            expect(result.raw).toBe(50);
        });

        it('should subtract a breakdown', () => {
            const money = Money.fromRaw(201610);
            const breakdown: PartialMoneyBreakdown = { c: 10, s: 15, g: 20 };
            const result = money.subtract(breakdown);
            expect(result).toBeInstanceOf(Money);
            expect(result.raw).toBe(100);
        });
    });

    it('should split an instance into a breakdown', () => {
        const money = Money.fromRaw(201510);
        const breakdown = money.split;
        expect(breakdown).toEqual({ _: 0, c: 10, s: 15, g: 20 });
    });

    it('should stringify an instance', () => {
        const money = Money.fromRaw(12345);
        const stringValue = money.toString();
        expect(stringValue).toBe('1g 23s 45c');
    });
});

describe('asMoney', () => {
    it('should convert a number to Money', () => {
        const rawValue = 12345;
        const moneyInstance = asMoney(rawValue);
        expect(moneyInstance).toBeInstanceOf(Money);
        expect(moneyInstance.raw).toBe(rawValue);
    });

    it('should return a Money instance as is', () => {
        const moneyInstance1 = Money.fromRaw(12345);
        const moneyInstance2 = asMoney(moneyInstance1);
        expect(moneyInstance2).toBe(moneyInstance1);
    });

    it('should convert a breakdown to Money', () => {
        const breakdown: PartialMoneyBreakdown = { c: 10, s: 15, g: 20 };
        const moneyInstance = asMoney(breakdown);
        expect(moneyInstance).toBeInstanceOf(Money);
        expect(moneyInstance.raw).toBe(201510);
    });
});
