  
import { AppExp, Exp, isAppExp, isBoolExp, isDefineExp, isIfExp, isNumExp, isPrimOp, isProcExp, isProgram, isVarRef, PrimOp, ProcExp, Program, VarDecl } from '../imp/L3-ast';
import { Value } from '../imp/L3-value';
import { Result, makeOk } from '../shared/result';
import { isNumber } from '../shared/type-predicates';

/*
Purpose: Transform L2 AST to Python program string
Signature: l2ToPython(l2AST)
Type: [EXP | Program] => Result<string>
*/
// export const valueToString = (val: Value): string =>
//     isNumber(val) ?  val.toString() :
//     val === true ? '#t' :
//     val === false ? '#f' :
//     isString(val) ? `"${val}"` :
//     isClosure(val) ? closureToString(val) :
//     isPrimOp(val) ? val.op :
//     isSymbolSExp(val) ? val.val :
//     isEmptySExp(val) ? "'()" :
//     isCompoundSExp(val) ? compoundSExpToString(val) :
//     val;

// export const closureToString = (c: Closure): string =>
//     // `<Closure ${c.params} ${L3unparse(c.body)}>`
//     `<Closure ${c.params} ${c.body}>

export const valueToString2 = (val: Value): string =>
    isNumber(val)? val.toString():
    val === true ? 'true' :
    val === false ? 'false':
    "";

    const unparsePrimOp = (exp : PrimOp) : string => {
        const basics = ['+','-','/','>','<','*','not','and','or'];
    
        return basics.includes(exp.op) ? exp.op :
               (exp.op === 'eq?' || exp.op === '=') ? '==' :
               exp.op === 'number?' ? `(lambda x: type(x) == number)` :
               exp.op === 'boolean?' ? `(lambda x: type(x) == bool)`:
               ''
    }
export const unparseApp = (exp: AppExp) : string =>
    isPrimOp(exp.rator) && exp.rator.op!='number?' && exp.rator.op!='boolean?' && exp.rator.op!='not' ? `(${exp.rands.map(unparseToPython).join(` ${unparsePrimOp(exp.rator)} `)})` :
    isPrimOp(exp.rator) && exp.rator.op === 'not' ? `(${exp.rator.op} ${exp.rands.map(unparseToPython).join("")})`:
    `${unparseToPython(exp.rator)}(${exp.rands.map(unparseToPython).join(",")})`

export const unparseToPython =(exp: Exp | Program): string =>

    isBoolExp(exp) ? valueToString2(exp.val) :
    isNumExp(exp) ? valueToString2(exp.val) :
    isVarRef(exp) ? exp.var :
    isProcExp(exp) ? `(lambda ${exp.args.map((elem)=>elem.var).join(",")} : ${exp.body.map(unparseToPython)})`:
    isIfExp(exp) ? `(${unparseToPython(exp.then)} if ${unparseToPython(exp.test)} else ${unparseToPython(exp.alt)})` :
    isAppExp(exp) ?  unparseApp(exp):
    isPrimOp(exp) ? unparsePrimOp(exp) :
    isDefineExp(exp) ? `${exp.var.var} = ${unparseToPython(exp.val)}` :
    isProgram(exp) ? `${exp.exps.map(unparseToPython).join("\n")}`:
    "";

export const l2ToPython = (exp: Exp | Program): Result<string>  => 
    makeOk(unparseToPython(exp))
    
