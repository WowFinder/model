import {
    ArmorValues,
    Class,
    CreatureBase,
    Race,
    Skills,
    Speeds,
    StatsBlock,
} from '../index';

describe('index', () => {
    it('should export ArmorValues', () => {
        expect(ArmorValues).toBeDefined();
    });

    it('should export Class', () => {
        expect(Class).toBeDefined();
    });

    it('should export CreatureBase', () => {
        expect(CreatureBase).toBeDefined();
    });

    it('should export Race', () => {
        expect(Race).toBeDefined();
    });

    it('should export Skills', () => {
        expect(Skills).toBeDefined();
    });

    it('should export Speeds', () => {
        expect(Speeds).toBeDefined();
    });

    it('should export StatsBlock', () => {
        expect(StatsBlock).toBeDefined();
    });
});
