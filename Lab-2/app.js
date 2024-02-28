/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
//Code writted y Mansi Mistry(20011402)
const arrayfunctions = require('./arrayUtils')
const objectfunctions = require('./objectUtils')
const stringfunctions = require('./stringUtils')

//function of arrayUtils.js
  //testing arrayStats
try{
  const stats = arrayfunctions.arrayStats([7, 9, 11, 15, 19, 20, 35, 0])
  console.log(stats)
  console.log('arrayStats passed successfully')
}
catch(e){
  console.log('arrayStats test case failed')
}

try{
  const stats = arrayfunctions.arrayStats("guitar", 1, 3, "apple")
  console.log('arrayStats got no errors')
}
catch(e){
  console.log('arrayStats failed successfully')
}

//   //testing makeObjects
try {
  const make = arrayfunctions.makeObjects(["Name", "Mansi Mistry"], ["Subject", "CS-546"])
  console.log('makeObjects passed successfully');
} catch (e) {
  console.error('makeObjects test case failed');
}
try {
  const make = arrayfunctions.makeObjects("Mansi Mistry", "Jersey City", "CS-546")
  console.error('makeObjects got no error');
} catch (e) {
  console.log('makeObjects failed successfully');
}
try {
  const make = arrayfunctions.makeObjects()
  console.error(make);
} catch (e) {
  console.log(e);
}

  //testing commonElements
const arr1 = [7, 'Mansi']; 
const arr2 = ["Mansi", "CS-546"]; 
const arr3 = [20011402, 'Mansi', "Mistry"]; 
const arr4 = [true, 5, 'Mansi']; 
const arr5 = [undefined, 'Mansi']; 

try {
  const common = arrayfunctions.commonElements(arr1, arr2, arr3, arr4, arr5)
  console.log('commonElements passed successfully');
} catch (e) {
  console.error('commonElements test case failed');
}
try {
  const common = arrayfunctions.commonElements([1, 0, 16.001, ['foo', 'bar'], 7, 7], ['7', false, true, 16.01, ['bar', 'foo']]) 
  console.error(common);
} catch (e) {
  console.log(e);
}


// //fuctions of stringUtils.js
//   //testing palindromes
try {
  const pali = stringfunctions.palindromes('Do geese see God?')
  console.log(pali);
} catch (e) {
  console.error(e);
}
try {
  const pali = stringfunctions.palindromes()
  console.error(pali);
} catch (e) {
  console.log(e);
}

//   //testing replaceChar
try {
  const replace = stringfunctions.replaceChar("Was it a car or a cat I saw?")
  console.log('replaceChar passed successfully');
} catch (e) {
  console.error('replaceChar test case failed');
}
try {
  const replace = stringfunctions.replaceChar(20011402)
  console.error('replaceChar got no error');
} catch (e) {
  console.log('replaceChar failed successfully');
}

  //testing charSwap
try {
  const swap = stringfunctions.charSwap("Mansi", "Mistry")
  console.log(swap);
} catch (e) {
  console.error(e);
}
try {
  const swap = stringfunctions.charSwap(' four ', ' lett') 
  console.error(swap);
} catch (e) {
  console.log(e);
}


// //function of objectUtils.js
//   //testing deepEquality

const object1 = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const object2  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}

try {
  const deep = objectfunctions.deepEquality(object1, object2)
  console.log(deep);
} catch (e) {
  console.error(e);
}
try {
  const deep = objectfunctions.deepEquality({a: 2, b: 4}, [3,4,5])
  console.error(deep);
} catch (e) {
  console.log(e);
}

  //testing commonKeysValues
const first = {name: {first: "Mansi", last: "Mistry"}, age: 22};
const second = {school: "Stevens", name: {first: "Mansi", last: "Mistry"}, age: 22};

try {
  const keyvalue = objectfunctions.commonKeysValues(first, second)
  console.log('commonKeysValues passed successfully');
} catch (e) {
  console.error('commonKeysValues test case failed');
}
try {
  const keyvalue = objectfunctions.commonKeysValues({name: {first: "Patrick", last: "Hill", goodbye: [6,4,5]}, age: 46, hello: NaN}, {school: "Stevens", name: {first: "Patrick", last: "Hill", goodbye: [6,4,5]}, hello:NaN})
  console.error(keyvalue);
} catch (e) {
  console.log(e);
}

  //testing calculateObject
try {
  const calculate = objectfunctions.calculateObject({A:2, B:6, C:18}, M => M * 4)
  console.log('calculateObject passed successfully');
} catch (e) {
  console.error('calculateObject test case failed');
}
try {
  const calculate = objectfunctions.calculateObject([2,3])
  console.error('calculateObject got no error');
} catch (e) {
  console.log('calculateObject failed successfully');
}


