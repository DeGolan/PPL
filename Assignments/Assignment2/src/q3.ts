import { ClassExp, ProcExp,  Exp, Program } from "./L31-ast";
import { Result, makeFailure, mapResult } from "../shared/result";
import { Binding, CExp, IfExp, makeAppExp, makeIfExp, makePrimOp, makeProcExp, makeStrExp, makeVarDecl, VarDecl } from "../imp/L3-ast";
import { first } from "../shared/list";

/*
Purpose: Transform ClassExp to ProcExp
Signature: for2proc(classExp)
Type: ClassExp => ProcExp
*/
//ProcExp {tag: "ProcExp"; args: VarDecl[], body: CExp[]; }
// (define pair
//     (lambda (a b)
//       (lambda (msg)
//           (if (eq? msg 'first)
//               ((lambda () a) )
//               (if (eq? msg 'second)
//                      ((lambda () b) )
//                      (if (eq? msg 'sum)
//                          ((lambda () (+ a b)) )
//                            #f))))))
const reWriteClassBody = (bindings:Binding[]):CExp[] =>{
    const ifStatment:IfExp = makeIfExp(
        (
            (funcName:string)=>makeAppExp(makePrimOp("eq?"),[makeStrExp(funcName)]),
            

            
            
        )

}
export const class2proc = (exp: ClassExp): ProcExp =>{
    const procArgs: VarDecl[]  = exp.fields;
    const procBody : CExp = makeProcExp([makeVarDecl("msg")],reWriteClassBody(exp.methods));
    return makeProcExp(procArgs,[procBody]);
}
    

/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/
export const L31ToL3 = (exp: Exp | Program): Result<Exp | Program> =>
    makeFailure("TODO");
