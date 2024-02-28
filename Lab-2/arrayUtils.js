/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayStats = (array) => {
  //count
  len = array.length;
  if(len === 0)   throw "Length is Zero."
  
  //sort
  if(len > 1)
    array = array.sort(function(a,b) {return a-b});
  
  array.forEach(element => {
    if(typeof element != 'number')  throw "Array doesnot contain numbers"
    if(typeof element === 'string') throw "Array contains string, hence not valid"
  });

  //mean
  var sum=0;
  array.forEach(element => {
    sum += element
  });
  mean = sum/len;

  //median
  if(len%2 === 0){
    median = (array[len/2 -1] + array[len/2] /2)
  }
  else{
    median = array[(len-1)/2]
  }

  //mode
  modenums = {}
  for (let i = 0; i < array.length; i++) {
    if(modenums[array[i]]){
      modenums[array[i]] +=1
    }else{
      modenums[array[i]] = 1
    }
  }
  
  let mode = []
  let maxval = -1
  for(let key in modenums){
    if(modenums[key] > maxval){
      mode = [Number(key)]
      maxval = modenums[key];
    }
    else if(modenums[key] === maxval){
      mode.push(Number(key))
    }
  }  
  if(mode.length === Object.keys(modenums).length) mode = [0];

  //minimum
  min = array[0];

  //maximum
  max = array[len-1]

  //range
  range = max - min

  return {
    mean : mean,
    median : median,
    mode : mode, 
    range : range,
    minimum : min,
    maximum : max,  
    count : len,
    sum : sum,
  }
};

let makeObjects = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  if(arrays.length == 0)         throw "Pass an argument"
  for (let i = 0; i < arrays.length; i++) {
    if(arrays[i].length == 0)         throw "Length cannot be zero"
      
    if(typeof arrays[i] == 'number')  throw "Pass arrays, not numbers"

    if(typeof arrays[i] == 'string')  throw "Pass arrays, not strings"
    
    if (arrays[i].length !== 2)       throw "The array should have only 2 elements in sub array";

  }
  newobj = Object.fromEntries(arrays);
  return newobj
};

let commonElements = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies

  if(arrays.length == 0)   throw "Length cannot be zero"
  if(arrays.length == 1)   throw "Pass atleast 2 arrays"
  commele = (array1, array2) => {
    res = []
    
    for(let i=0;i<array1.length;i++){
      for(let j=0;j<array2.length;j++){
        console.log(array1[i], array2[j])
          if(typeof array1[i] === 'object' && typeof array2[j] === 'object'){
            console.log(array1[i], array2[j])
            result = commele(array1[i], array2[j])
            if (result){
              res.push(result)
            }
          }
          else if(array1[i] === array2[j]){
            console.log(array1[i], array2[j])
            res.push(array1[i])
          }
        }
      }
    return res;
  }

  res = arrays[0].slice();
  // console.log(res)
  for (let i = 1; i < arrays.length; i++) {
    if(arrays[i].length == 0)         throw "Length cannot be zero"
      
    if(typeof arrays[i] == 'number')  throw "Pass arrays, not numbers"

    if(typeof arrays[i] == 'string')  throw "Pass arrays, not strings"
    
    res = commele(res, arrays[i])    
  }
  return res

};

module.exports = {
  arrayStats,
  makeObjects,
  commonElements,
}