/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let deepEquality = (obj1, obj2) => {
      if(obj1 === 'null' || obj2 === 'null')                      throw "Null inputs passed"
            
      if(typeof obj1 !== 'object' || typeof obj2 !== 'object')    throw "Pass objects only"
      
      keys1 = Object.keys(obj1)
      keys2 = Object.keys(obj2)
      
      if(keys1.length != keys2.length)   return false
      result = true
      keys1.forEach(keys => {
            if(keys2.includes(keys)){
                  if(typeof obj1[keys] === 'object' && typeof obj2[keys] === 'object'){
                        deepEquality(obj1[keys], obj2[keys])
                  }
                  else{
                        if(obj1[keys] != obj2[keys])       result =  false
                  }
            }        
      });
      return result
};

let commonKeysValues = (obj1, obj2) => {
      if( obj1 === undefined || obj2 === undefined)               throw "Undefined value passed, Invalid"

      if(Array.isArray(obj1) || Array.isArray(obj2))              throw "Arrays passed, Invalid"
      
      if(typeof obj1 !== 'object' || typeof obj2 !== 'object')    throw "Pass objects only";

      var common = {};
      var k1 = Object.keys(obj1);   
      var k2 = Object.keys(obj2);

      compare = (obj1, obj2) => {
            if(typeof obj1 === 'object' && typeof obj2 === 'object') {
                  return commonKeysValues(obj1, obj2)
            } else {
                  return obj1 == obj2
            }
      }

      k1.forEach(keys => {
            if(k2.includes(keys)){
                  if(typeof obj1[keys] === 'object' || typeof obj2[keys] === 'object'){
                        commonKeysValues(obj1[keys], obj2[keys])
                  }
                  common[keys] = obj1[keys]
            }
      })
      return common
};

let calculateObject = (object, func) => {
      if(typeof object !== 'object' || typeof func !== 'function')      throw 'Object/function not passed, Invalid'
      
      if(object === undefined || func === undefined)                    throw "Null value passed, Invalid"

      for(const [key, val] of Object.entries(object)){
            if(typeof val !== 'number')                                 throw "Not a number value, invalid"
      }

      var result = {}
      for(keys in object){
            num = Math.sqrt(func(object[keys]))
            result[keys] = num.toFixed(2)
      }
      return result
};

module.exports = {
      deepEquality,
      commonKeysValues,
      calculateObject,
}