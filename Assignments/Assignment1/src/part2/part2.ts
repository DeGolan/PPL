import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countVowels : (str: string) => number = (str: string)=>{
  const strAsArray: string[] = stringToArray(str);
  const vowels: string="aeiouAEIOU";
  return strAsArray.reduce((
    (acc :number, curr: string) =>
     vowels.indexOf(curr) != -1 ? acc + 1 : acc),
     0
     );
};
console.log(countVowels("This is SOME Text"));
/* Question 2 */
export const runLengthEncoding : (str :string) => string = (str: string)=>{
  const strAsArray: string[] = stringToArray(str); 
  let counter: number = 0; //need to change
  const newStr:string= strAsArray.reduce((
    (acc :string, curr: string) =>
      {
        if(curr==acc.charAt(acc.length-1)){
          counter=counter+1;
          return acc;
        }
        else{
          acc=acc+counter+curr;
          counter=1;
          return acc;

        }
      }),
      strAsArray[0]
     );
  return counter>1 ? newStr+counter: newStr;
};
console.log(runLengthEncoding("aaaabbbccdd"));
/* Question 3 */
export const isPaired :(str: string)=>boolean = (str:string)=>{
  const strAsArray: string[] = stringToArray(str); 
  const parentheses:string="(){}[]";
  const filteredArray = strAsArray.filter(
    (curr: string)=> parentheses.indexOf(curr) != -1
  );
  console.log(filteredArray);
  return false;
};
