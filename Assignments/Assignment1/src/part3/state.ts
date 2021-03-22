export type State<S, A> = (initialState: S) => [S, A];

export const bind = <S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>) => {
  return (init: S) => {
    const [newSeed, comp] = state(init);
    const newState = f(comp);
    return newState(newSeed);
  };
};

// ==> [ 3, 6 ]
/*const f = (x: A) => {
  // x is comp1
  return (init: S) => { //init = newSeed
    
    const newSeed2 = do somthing
    const comp2 = do something

    return [newSeed2,[comp1,comp2]];
  };
  */
