/* 2.1 */

export const MISSING_KEY = '___MISSING___'

type PromisedStore<K, V> = {
    get(key: K): Promise<V>,
    set(key: K, value: V): Promise<void>,
    delete(key: K): Promise<void>
}


export function makePromisedStore<K, V>(): PromisedStore<K, V> {
    let database = new Map();
    return {
  
        get(key: K) {
            
            return new Promise((resolve,reject)=>!database.has(key) ? reject(MISSING_KEY) : resolve(database.get(key)));
        },
        set(key: K, value: V) {

            return new Promise((resolve,reject)=>{
                database.set(key,value);
                resolve();
            });
        },
        delete(key: K) {

            return new Promise((resolve,reject)=> {
               
                if(!database.has(key))
                    reject(MISSING_KEY);
                
                else{
                    database.delete(key);
                    resolve();
                }
            });
        },
    }
}

 export function getAll<K, V>(store: PromisedStore<K, V>, keys: K[]): Promise<V [] |string> {
    
    return Promise.all(keys.map(key=>store.get(key)));
}

/* 2.2 */



export function asycMemo<T, R>(f: (param: T) => R): (param: T) => Promise<R> {
    
    const asyncStore : PromisedStore<T, R> = makePromisedStore();
    return async function (param : T) : Promise<R> {

        try{
           return await asyncStore.get(param); 
        }catch{
           const value = f(param);
           await asyncStore.set(param,value);
           return value;
        }
    }

}

/* 2.3 */

 export function lazyFilter<T>(genFn: () => Generator<T>, filterFn: (param : T) => Boolean ) :()=> Generator<T> { 
        
    return function* () { 
    for(let v of genFn()){
        if(filterFn(v))
            yield v;
        }        
    }
 }

 export function lazyMap<T, R>(genFn: () => Generator<T>, mapFn: (param: T) => R) : () => Generator<R> {
     
    return function* () {
        for(let v of genFn())
            yield mapFn(v);
    }
 }

/* 2.4 */
// you can use 'any' in this question

 export async function asyncWaterfallWithRetry(fns: [() => Promise<any>, ...((param: any) => any)[]] ): Promise<any> {
     
        
        let value = undefined;
        for(const func of fns ){
            try{
                value = await func(value); 
            }catch{
                    await new Promise((resolve) => 
                    setTimeout(() => resolve('done'), 2000));
               try{
                    value = await func(value);
               }catch{
                    await new Promise((resolve) => 
                    setTimeout(() => resolve('done'), 2000));
                    try{

                        value = await(func(value));

                    }catch{
                        throw new Error("failed");
                    }
               }

            }
        }
        return value;
    }


