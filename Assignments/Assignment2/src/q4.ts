import { AppExp, Exp, isAppExp, isBoolExp, isDefineExp, isIfExp, isNumExp, isPrimOp, isProcExp, isProgram, isVarRef, PrimOp, ProcExp, Program } from '../imp/L3-ast';
import { Value } from '../imp/L3-value';
import { Result, makeFailure, makeOk } from '../shared/result';
import { isNumber } from '../shared/type-predicates';

/*
Purpose: Transform L2 AST to Python program string
Signature: l2ToPython(l2AST)
Type: [EXP | Program] => Result<string>
*/

const unparsePrimOp = (exp : PrimOp) : string => {
    const basics = ['+','-','/','>','<','*','not','and','or'];

    return basics.includes(exp.op) ? exp.op :
           (exp.op === 'eq?' || exp.op === '=') ? '==' :
           exp.op === 'number?' ? `(lambda x: (type(x) == int or type(x) == float))` :
           exp.op === 'boolean?' ? `(lambda x: (type(x) == bool))`:
           ''
}

const valueToString = (val: Value) : string => 
    isNumber(val) ? val.toString() : 
    val === 'true' ? 'True' : 
    val === 'false' ? 'False' :
    ''


const unparseApp = (exp: AppExp) : string =>
    isPrimOp(exp.rator) && exp.rator.op!='number?' && exp.rator.op!='boolean?' && exp.rator.op!='not' ? `(${exp.rands.map(unparse).join(` ${unparsePrimOp(exp.rator)} `)})` :
    isPrimOp(exp.rator) && exp.rator.op === 'not' ? `(${exp.rator.op} ${exp.rands.map(unparse).join("")})`:
    `${unparse(exp.rator)}(${exp.rands.map(unparse).join(",")})`

const unparse = (exp: Exp | Program) : string =>
    isPrimOp(exp) ? unparsePrimOp(exp) :
    isNumExp(exp) ? valueToString(exp.val) : 
    isBoolExp(exp) ? valueToString(exp.val) :
    isVarRef(exp) ? exp.var :
    isProcExp(exp) ? `(lambda ${exp.args.map((elem)=>elem.var).join(",")} : ${exp.body.map(unparse)})` :
    isAppExp(exp) ? unparseApp(exp) :
    isIfExp(exp) ? `(${unparse(exp.then)} if ${unparse(exp.test)} else ${unparse(exp.alt)})` :
    isDefineExp(exp) ? `${exp.var.var} = ${unparse(exp.val)}` :
    isProgram(exp) ? `${exp.exps.map(unparse).join("\n")}` :
    ''


export const l2ToPython = (exp: Exp | Program): Result<string>  => makeOk(unparse(exp))
    


