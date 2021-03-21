import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
<<<<<<< HEAD
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
=======
export const countVowels: (str: string) => number = (str: string): number => {
  const stringArr: string[] = stringToArray(str.toLowerCase());
  const vowels: String = "aeiou";
  return stringArr.reduce(
    (acc: number, curr: string) => (vowels.indexOf(curr) != -1 ? acc + 1 : acc),
    0
  );
};
//console.log(countVowels("This is SOME Text"));
/* Question 2 */
/*export const runLengthEncoding: (str: string) => string = (
  str: string
): string => {
  if (str.length == 0) return "";
  let stringArr: string[] = stringToArray(str);
  let count: number = 0;
  const result: string = stringArr.reduce((acc: string, curr: string) => {
    if (curr == acc[acc.length - 1]) {
      count++;
      return acc;
    } else {
      acc = acc + count + curr;
      count = 1;
      return acc;
    }
  }, stringArr[0]);
  return count > 1 ? result + count : result;
};
*/
interface pair {
  letter: string;
  count: number;
}
export const runLengthEncoding: (str: string) => string = (
  str: string
): string => {
  if (str.length == 0) return "";
  const stringArr: string[] = stringToArray(str);
  const firstLetter: pair = { letter: stringArr[0], count: 0 };
  const pairArr: pair[] = stringArr.reduce(
    (acc: pair[], curr: string) => {
      const last: pair = acc[acc.length - 1];
      if (last.letter === curr) {
        acc[acc.length - 1] = { letter: last.letter, count: last.count + 1 };
        return acc;
      } else {
        const newLetter: pair = { letter: curr, count: 1 };
        return acc.concat([newLetter]);
      }
    },
    [firstLetter]
  );

  return pairArr.reduce(
    (acc: string, curr: pair) =>
      curr.count > 1 ? acc + curr.letter + curr.count : acc + curr.letter,
    ""
  );
};
//console.log(runLengthEncoding("aaabbbccc"));

//Question 3
export const isPaired: (str: string) => boolean = (str: string): boolean => {
  const stringArr: string[] = stringToArray(str);
  const parentheses: string = "(){}[]";
  const open: string = "([{";
  const close: string = ")]}";
  const filteredArr = stringArr.filter(
    (curr: string) => parentheses.indexOf(curr) != -1
  );

  const result: string = filteredArr.reduce((acc: string, curr: string) => {
    if (open.indexOf(curr) != -1 || acc.length == 0) return acc + curr;
    if (open.indexOf(acc.charAt(acc.length - 1)) == close.indexOf(curr))
      return acc.substring(0, acc.length - 1);
    return acc + curr;
  }, "");
  return result.length == 0;
};
console.log(isPaired("This is [some[ (text)"));
>>>>>>> 8a44c19cdaf022067465c1893f390e36fd5b9b5f
