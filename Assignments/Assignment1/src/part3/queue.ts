import { State, bind } from "./state";

export type Queue = number[];

export const enqueue = (x: number): State<Queue, undefined> => {
  return (q: Queue) => {
    const q2: Queue = q.concat([x]);
    return [q2, undefined];
  };
};
/*1. Dequeues a number x from the queue
2. Enqueues 2 * x
3. Enqueues x / 3
4. Dequeues*/

export const dequeue: State<Queue, number> = (q: Queue): [Queue, number] => {
  const x: number = q[0];
  const q2: Queue = q.slice(1);
  return [q2, x];
};
/*export const bind = <S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>) => {
    return (init: S) => {[7,8]
      const [newSeed, comp] = state(init); [[7,8],6] -> [[7,8,12],undefined]
      const newState = f(comp);  bind(enqueue(x * 2), (x: number) => enqueue(x / 3)
      return newState(newSeed); 
    };
  };*/
export const queueManip = (q: Queue): [Queue, undefined | number] => {
  //[6,7,8]
  //const act1and2 = bind(dequeue, (x: number) =>
  // bind(enqueue(x * 2), (x: number) => enqueue(x / 3))
  // );
  const act1and2 = bind(dequeue, (x: number) =>
    bind(enqueue(x * 2), (x: number) => enqueue(x / 3))
  );
  return act1and2(q);
  //const [q2, comp] = act1and2(q); //[[7,8,12],undefind]
  // const act2and3 = bind(enq);
};
console.log(queueManip([6, 7, 8]));
