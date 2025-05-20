// and or not
let user = "apel88"
let pass = "he110w0r1d"
document.getElementById("login").addEventListener("submit", function(event){
    event.preventDefault()
    let userpost = document.getElementById("user").value
    let passpost = document.getElementById("pass").value
    if (userpost == user && passpost == pass) {
        document.getElementById("msg").innerHTML = "Login successful"
    } else {
        document.getElementById("msg").innerHTML = "Login failed"
    }
})