document.getElementById("scoreform").addEventListener("submit", function(event){
    event.preventDefault()
    let number = document.getElementById("number").value
    console.log(number)
    if (number > 100) {
        alert("Input cannot be larger than 100.")
    } else if (number >= 80 && number <= 100) {
        document.getElementById("result").innerHTML = "A"
    } else if (number >= 70 && number <= 79) {
        document.getElementById("result").innerHTML = "B"
    } else if (number >= 60 && number <= 69) {
        document.getElementById("result").innerHTML = "C"
    } else if (number >= 50 && number <= 59) {
        document.getElementById("result").innerHTML = "D"
    } else {
        document.getElementById("result").innerHTML = "E"
    }
})