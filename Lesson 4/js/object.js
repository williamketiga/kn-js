data = {
    "id":1,
    "username":"adam",
    "title":"objects in js",
    "category":["tech","coding"],
    "likes":67,
    "content":"Lorem ipsum dolor sit amet."
}
console.log(data);
document.getElementById("title").innerHTML = data.title
document.getElementById("content").innerHTML = data.content
document.getElementById("likes").innerHTML = data.likes