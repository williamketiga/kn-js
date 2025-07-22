let article = prompt("Place your article here");
let authorname = prompt("Input your name here");
document.getElementById("article").innerHTML = `Article: ${article}`
document.getElementById("name").innerHTML = `By: ${authorname}`