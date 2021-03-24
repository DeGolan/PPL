import { State, bind } from "./state";

export type Queue = number[];

export const enqueue = (x: number): State<Queue, undefined> => {
  return (q: Queue): [Queue, undefined] => [q.concat([x]), undefined];
};

export const dequeue: State<Queue, number> = (q: Queue): [Queue, number] => {
  return [q.slice(1), q[0]];
};
export const queueManip = (q: Queue): [Queue, number] => {
  return bind(dequeue, (x: number) =>
    bind(enqueue(x * 2), (u: undefined) =>
      bind(enqueue(x / 3), (u: undefined) => dequeue)
    )
  )(q);
};
