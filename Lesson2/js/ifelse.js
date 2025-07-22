document.getElementById("login").addEventListener("submit", function(event){
    event.preventDefault()
    let user = "apel88"
    let pass = "he110w0r1d"
    let userpost = document.getElementById("user").value
    let passpost = document.getElementById("pass").value
    console.log(userpost)
    console.log(passpost)
    if (user !== userpost) {
        document.getElementById("msg").innerHTML = "Incorrect username"
    } else if (pass !== passpost) {
        document.getElementById("msg").innerHTML = "Incorrect password"
    } else {
        document.getElementById("msg").innerHTML = "Login successful"
    }
})