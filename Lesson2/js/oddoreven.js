document.getElementById("check").addEventListener("submit", function(event){
    event.preventDefault()
    let number = document.getElementById("number").value
    console.log(number)
    if(number % 2 == 0){
        document.getElementById("result").innerHTML = "Even"
    } else {
        document.getElementById("result").innerHTML = "Odd"
    }
})