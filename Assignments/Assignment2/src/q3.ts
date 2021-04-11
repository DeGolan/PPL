import { DefineExp,ClassExp, ProcExp, Exp, Program,Binding,CExp,makeBoolExp,makeIfExp,makeAppExp,makeStrExp,makePrimOp,makeVarDecl,makeProcExp,VarDecl,isDefineExp, makeDefineExp, isNumExp, isBoolExp, isStrExp, isPrimOp, isVarRef, isClassExp, isAppExp, isIfExp, isProcExp, isLetExp, makeLetExp, makeBinding, isLitExp, isExp, isCExp, isProgram, makeProgram, makeVarRef  } from "./L31-ast";
import { Result, makeFailure, makeOk } from "../shared/result";
import {first,rest} from  "../shared/list"
/*
Purpose: Transform ClassExp to ProcExp
Signature: for2proc(classExp)
Type: ClassExp => ProcExp
*/
const reWriteToIf = (bindings: Binding[]) : CExp => {
   
    if(bindings.length==0)
        return makeBoolExp(false);
    const firstElement : Binding = first(bindings);
    const proc : CExp = firstElement.val;
    return makeIfExp(makeAppExp(makePrimOp('eq?'),[makeVarRef('msg'),makeVarRef(`'${firstElement.var.var}`)]),makeAppExp(proc, []),reWriteToIf(rest(bindings)));

}
export const class2proc = (exp: ClassExp): ProcExp =>{

    const procVars : VarDecl[] = exp.fields;
    const procBody : ProcExp = makeProcExp([makeVarDecl('msg')],[reWriteToIf(exp.methods)]);

    return makeProcExp(procVars,[procBody]);
}
/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/
//rewrite fo CExps
const rewriteAll = (exp: CExp): CExp => 
    isNumExp(exp) ? exp :
    isBoolExp(exp) ? exp :
    isStrExp(exp) ? exp : 
    isPrimOp(exp) ? exp :
    isVarRef(exp) ? exp :
    isClassExp(exp) ? class2proc(exp) :
    isAppExp(exp) ? makeAppExp(rewriteAll(exp.rator),exp.rands.map(rewriteAll)) : 
    isIfExp(exp) ? makeIfExp(rewriteAll(exp.test),rewriteAll(exp.then),rewriteAll(exp.alt)) : 
    isProcExp(exp) ? makeProcExp(exp.args,exp.body.map(rewriteAll)) : 
    isLetExp(exp) ? makeLetExp(exp.bindings.map((bind : Binding)=> makeBinding(bind.var.var,rewriteAll(bind.val))),exp.body.map(rewriteAll)):
    isLitExp(exp) ? exp : exp
    
//rewrite for Define
const rewriteForDefine = (exp: DefineExp) : DefineExp => makeDefineExp(exp.var,rewriteAll(exp.val));

export const L31ToL3 = (exp: Exp | Program): Result<Exp | Program> => 

    isDefineExp(exp) ? makeOk(rewriteForDefine(exp)) :
    isCExp(exp) ? makeOk(rewriteAll(exp)) : 
    isProgram(exp) ? makeOk(makeProgram(exp.exps.map((exp: Exp)=> isDefineExp(exp)? rewriteForDefine(exp) : rewriteAll(exp)))) :
    makeFailure("Error in transformation");