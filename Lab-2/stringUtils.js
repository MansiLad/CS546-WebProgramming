/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let palindromes = (string) => {
      if(!string)       throw "passed Empty string"
      if(typeof string !== 'string')      throw "Input should be a string"
      if(string.length === 0)             throw "Passed Empty String"
      
      string = string.split(" ")
      palinstr = []
      for (let i = 0; i < string.length; i++) {
            string[i] = string[i].replace(/[^a-zA-Z ]/g, '')
            original = string[i].toLowerCase()
            revstr = ""
            for (let j=original.length-1; j >= 0; j--) {
                  revstr+=original[j]
            }
            if(revstr === original){
                  palinstr.push(string[i])
            }
      }
      return palinstr
};

let replaceChar = (string) => {
      if(!string)       throw "passed Empty string"
      if(string.length === 0)             throw "Passed Empty String"

      if(typeof string !== 'string')      throw "Input should be a string"

      string = string.split("")
      for (let i = 0; i < string.length-2; i+=4) {
            string[i+1] = '*'
            string[i+3] = '$'     
      }
      string = string.join("")
      return string
};

let charSwap = (string1, string2) => {
      if(string1.length === 0)      throw "String 1 is empty"

      if(string2.length === 0)      throw "String2 is empty"

      if(string1.length < 4 )       throw "Input string1 lengths should be minimum of length 4";
            
      if(string2.length < 4)    throw "Input string2 lengths should be minimum of length 4";
      
      finalstr = ""

      string1 = string1.trim()
      string2 = string2.trim()
      strarray1 = string1.split('')
      strarray2 = string2.split('')
      console.log(strarray1)
      for (let i = 0; i < 4; i++) {
            temp = strarray1[i]
            strarray1[i] = strarray2[i]
            strarray2[i] = temp
            
      }
      strarray1 = strarray1.join("")
      strarray2 = strarray2.join("")
      finalstr = strarray1 + " " + strarray2 
      return finalstr
};

module.exports = {
      palindromes,
      replaceChar,
      charSwap,
}
