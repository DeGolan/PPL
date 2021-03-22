export type State<S, A> = (initialState: S) => [S, A];

export const bind = <S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>) : State<S, B>=>{

    return (seed:S)=>{
        const [newSeed, comp] = state(seed);
        return (f(comp))(newSeed);
        };
    
};
const random = (seed: number): number =>
(80189 * seed + 190886) % 1052010;
const randomDie = (seed: number): [number, number] => {
    const newSeed = random(seed);
    const die = 1 + Math.floor(newSeed / 1052010 * 6);
    return [newSeed, die];
    };
    
const rollTwoDice: State<number, [number, number]> =
bind(randomDie, die1 => bind(randomDie, die2 => s => [s, [die1, die2]]));
const seed = 42;
const [newSeed, dice] = rollTwoDice(seed);
console.log(dice); // ==> [ 3, 6 ]
