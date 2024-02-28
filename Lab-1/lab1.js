
const questionOne = function questionOne(arr) {
  const ans = []
  for(let i=0; i<arr.length; i++)
  {
    if(arr[i] <= 0 || arr[i] === 1)
    {
      ans[i] = false
    }
    else if(arr[i] === 2) 
    {
      ans[i] =true
    }
    else{
      let flag=2
      while(flag<arr[i])
      {
        ans[i] = true
        if(arr[i]%flag == 0)
        {
          ans[i] = false
          break
        }
        flag++
      }
    }
    
  }
 return ans
} 

const questionTwo = function questionTwo(startingNumber, commonRatio, numberOfTerms) { 
  let sum = 0
  if(startingNumber == 0 || commonRatio == 0)
  {
    return 0
  }
  if(numberOfTerms <=0 || Number.isInteger(numberOfTerms) == 0)
  {
    return NaN
  }
  sum = startingNumber * ((1-Math.pow(commonRatio, numberOfTerms))/(1-commonRatio))
  return Math.trunc(sum)
} 

const questionThree = function questionThree(text) { 
  // Implement question 3 here
  text = text.replace(/[^a-zA-Z ]/g, ''); //removes all symbols and numbers
  text = text.split(' ').join('')  //removes spaces
  let cnt = text.length;
  for(let char of text.toLowerCase()){
    if(char == 'a' || char == 'e' || char == 'i' | char == 'o' | char == 'u')
    {
      cnt--
    }
  }
  return cnt 
} 

const questionFour = function questionFour(str, substr) { 
  let splitString = str.split(substr)
  let result = splitString.length - 1
  return result
} 

module.exports = { 
  firstName: "Mansi", 
  lastName: "Mistry", 
  studentId: "20011402", 
  questionOne, 
  questionTwo, 
  questionThree, 
  questionFour 
}; 