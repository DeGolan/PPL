import { State, bind } from "./state";

export type Queue = number[];

export const enqueue = (x:number):State<Queue,number>=>{ //takes a number x and returns a State that adds x to the queue
    return (queue:Queue)=>{
        const newQueue=queue.concat(x);
        return [newQueue,x];
    };
};

export const dequeue: State<Queue,number>= (queue:Queue):[Queue,number]=>{ // State which dequeues a number from the queue and returns it
    const x:number=queue[0];
    const newQueue=queue.slice(1);
    return [newQueue,x];
};

export const queueManip =(queue:Queue):[Queue,number]=>{
    const act1=bind(dequeue,
        (x:number):State<Queue,number>=>enqueue(2*x));
    const act2=bind(act1,(y:number):State<Queue,number>=>enqueue(y/6));
    const act3=bind(act2,dequeue());
    
    return act3(queue);

};

  //bind(bind(dequeue,(x:number):State<Queue,number>=>enqueue(2*x)),(y:number):State<Queue,number>=>enqueue(y/3));
//bind(randomDie, die1 => bind(randomDie, die2 => s => [s, [die1, die2]]));

console.log(queueManip([6,7,8]));
/*
queueManip([6,7,8])
([6,7,8])=>{
        const [newSeed=[7,8], comp=6] = state=dequeu(seed=[6,7,8]);
        return (f=enque(comp=6))(newSeed=[7,8]); =[ [ 7, 8, 6 ], undefined ]
        };


*/
