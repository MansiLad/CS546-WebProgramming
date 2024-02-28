
(function () {
    let flag = 1
    function resultantArray(string){
        var resultant = []
        let cnt = 0
        let input1 = 0
        while(string[string.length-1] === ','){
            string = string.substr(0, string.length-1)
            cnt++
        }
        if(cnt > 1){
            throw "Enter Valid Input"
        }

        //string = string.replace(/(^,)|(,$)/g, '');  
        try{
            input1 = JSON.parse("[" + string + "]")
        }catch(e){
            throw "Check input again, array should be of numbers only"
            //throw "Error: Check your inputs again, Inputs should be Arrays(atleast one array) of numbers, only whole numbers, no floats, no alphabets"
        }
        
        let count = 0
        for (let index = 0; index < input1.length; index++) {
            const element = input1[index]
            if(Array.isArray(element)){
                count++
            }
            else if(!Array.isArray(element)) {
                throw "Enter only Array"
            }
        }
        if(count < 1){
            throw "Enter atleast one Array"
        }

        for (let i = 0; i < input1.length; i++) {
            const element = input1[i]
            for (let j = 0; j < element.length; j++) {
                let num = element[j]
                if(!Number.isInteger(num)){
                    throw "Should be a Whole Number"
                }
                resultant.push(num)
            }
        }
        resultant = resultant.sort()
        return resultant
    }

    const data = document.getElementById("data")
    
    if(data) {
        const arrays = document.getElementById('input')
        const output = document.getElementById('output')

        const errorContainer = document.getElementById('error');
        const errorTextElement = errorContainer.getElementsByClassName(
          'text-goes-here'
        )[0];

        const resultContainer = document.getElementById('result');
        const resultTextElement = resultContainer.getElementsByClassName(
          'text-goes-here'
        )[0];

        data.addEventListener('submit', event => {
            event.preventDefault()
            try {
                errorContainer.hidden = true;
                resultContainer.hidden = true;

                const array = arrays.value
                const resultant = resultantArray(array)

                const finalres = '[' + resultant.toString() + ']'
                const li = document.createElement("li")

                if(finalres.length < 3) {
                    throw 'At least one element'
                }

                li.appendChild(document.createTextNode(finalres))

                if(flag == 1) {
                    li.setAttribute("class", "is-green")
                    flag = flag * -1
                } else {
                    li.setAttribute("class", "is-red")
                    flag = flag * -1
                }

                output.appendChild(li)
                //resultTextElement.textContent = output.appendChild(li)
                resultContainer.hidden = false

            }
            catch(e) {
                const message = typeof e === 'string' ? e : e.message
                const errormessage = "Error: Check your inputs again, Inputs should be Arrays(atleast one array) of numbers, only whole numbers, no floats, no alphabets"
                errorTextElement.textContent = e;
                errorContainer.hidden = false
            }
        });
    }
})();