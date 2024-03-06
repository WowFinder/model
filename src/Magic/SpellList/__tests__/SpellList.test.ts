import { SpellList } from '../SpellList';
import { Spell } from 'Magic/Spell/Spell';
import exampleSpell from '../../__tests__/mocks/yellowSnowBall';
const mockedSpell = new Spell(exampleSpell);
const mockedSpellResolver = (): Spell => mockedSpell;

describe('SpellList', () => {
    it('should correctly create a new instance', () => {
        const list = new SpellList({
            key: 'test',
            core: false,
            spells: {
                3: [{ spell: exampleSpell.key, rank: 1 }],
                7: [{ spell: exampleSpell.key, rank: 2 }],
                10: [{ spell: exampleSpell.key, rank: 3 }],
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
                    3: [{ spell: exampleSpell.key, rank: 1 }],
                    a: [{ spell: exampleSpell.key, rank: 3 }],
                },
                resolver: mockedSpellResolver,
            });
        }).toThrow('Invalid spell list level: a');
        expect(instance).toBeUndefined();
    });
});
