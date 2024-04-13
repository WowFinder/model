import { yellowSnowBall } from '../../../__mocks__';
import { Spell } from '../../Spell/Spell';
import { SpellList } from '../SpellList';
const mockedSpell = new Spell(yellowSnowBall);
const mockedSpellResolver = (): Spell => mockedSpell;

describe('SpellList', () => {
    it('should correctly create a new instance', () => {
        const list = new SpellList({
            key: 'test',
            core: false,
            spells: {
                3: [{ spell: yellowSnowBall.key, rank: 1 }],
                7: [{ spell: yellowSnowBall.key, rank: 2 }],
                10: [{ spell: yellowSnowBall.key, rank: 3 }],
            },
            resolver: mockedSpellResolver,
        });
        expect(list).toBeInstanceOf(SpellList);
        expect(list.key).toBe('test');
        expect(Object.values(list.spells).length).toBe(3);
        expect(list.spells[3][0].spell).toEqual(mockedSpell);
        expect(list.core).toBe(false);
    });
    it('should throw an error if the level is not a number', () => {
        let instance: SpellList | undefined;
        expect(() => {
            instance = new SpellList({
                key: 'test',
                spells: {
                    3: [{ spell: yellowSnowBall.key, rank: 1 }],
                    a: [{ spell: yellowSnowBall.key, rank: 3 }],
                },
                resolver: mockedSpellResolver,
            });
        }).toThrow('Invalid spell list level: a');
        expect(instance).toBeUndefined();
    });
});
