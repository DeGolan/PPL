export type State<S, A> = (initialState: S) => [S, A];

export const bind = <S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>) => {
  return (init: S) => {
    const [newSeed, comp] = state(init);
    const newState = f(comp);
    return newState(newSeed);
  };
};
