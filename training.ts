//1.Types - Arrays and Maps
/*
let a =[16,8,27,13];
console.log(a[3]);
console.log(a.slice(1,4));

let map={a:1,b:2};
console.log(map['a']);
console.log(map.b);
console.log(Object.keys(a));
console.log(Object.keys(map));
*/
//2.JSON
/*
let person1={name:"Yosi", age : 31, city : "Beer Sheva"};
let person1JSONString=JSON.stringify(person1);

console.log("person1 serialized in JSON =" + person1JSONString);
console.log(`person1JSONString is of type ${typeof person1JSONString}`);

let person2 = JSON.parse(person1JSONString);

console.log(person2); 
console.log(`person2 is of type ${typeof person2}`);

let studentsData = {
    department: "Computer Science", 
    students: [
        { name: "Alice", degree: "PhD" },
        { name: "Bob", degree: "MSc" }
    ]
};

let studentsJSON = JSON.stringify(studentsData);
console.log(studentsJSON); 
console.log(`studentsJSON is of type ${typeof studentsJSON}`); 
let studentsJSONParsed = JSON.parse(studentsJSON);
console.log(studentsJSONParsed);
console.log(`studentsJSONParsed is of type ${typeof studentsJSONParsed}`); 
*/

