import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countVowels: (str: string) => number = (str: string): number => {
  const stringArr: string[] = stringToArray(str.toLowerCase());
  const vowels: String = "aeiou";
  return stringArr.reduce(
    (acc: number, curr: string) => (vowels.indexOf(curr) != -1 ? acc + 1 : acc),
    0
  );
};

const helper = (
  strArr: string[],
  position: number,
  result: string,
  lastChar: string,
  count: number
): string => {
  if (position === strArr.length)
    return `${result}${lastChar}${count > 1 ? count : ""}`;
  if (strArr[position] === lastChar)
    return helper(strArr, position + 1, result, lastChar, count + 1);
  return helper(
    strArr,
    position + 1,
    `${result}${lastChar}${count > 1 ? count : ""}`,
    strArr[position],
    1
  );
};
export const runLengthEncoding: (str: string) => string = (
  str: string
): string => {
  return helper(stringToArray(str), 0, "", "", 0); //input,position,result,lastChar,count
};
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
