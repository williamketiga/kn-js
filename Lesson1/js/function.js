function sayname(myname){
    console.log(`Hello my name is ${myname}`)
}
async function shopping(items){
    console.log(`Buy ${items}`)
}
setTimeout(() => {
    shopping("windah")
    shopping("ucok")
    shopping("jarjir")
}, 1000);