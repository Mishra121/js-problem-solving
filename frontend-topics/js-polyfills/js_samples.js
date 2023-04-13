

// Js reduce sample examples

let input1 = [10,20,30,40]
let output1 = input1.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
});

console.log(`Sum is ${output1}`)


let input = [
    {"name":"Sam","age":29,"gender":"male"},
    {"name":"Josh","age":29,"gender":"male"},
    {"name":"Simon","age":29,"gender":"male"},
    {"name":"Timon","age":29,"gender":"male"},
];

// Reduce the input to get only the name key
let output = input.reduce((accumulator, currentValue) => {
    accumulator.push({"name" : currentValue.name});
    return accumulator;
},[]);

console.log(output)
