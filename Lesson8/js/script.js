const express = require('express')
const app = express()
const port = 3000
const http = require('http')
const server = http.createServer((req,res)=>{
  // anti cors
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,OPTION,DELETE')
  res.setHeader('Access-Control-Allow-Headers','Content-Type')
  // preflight
  if(req.method === 'OPTIONS'){
    res.writeHead(204)
    res.end()
    return
  }
  // ssr
  if(req.url === '/hello' && req.method === 'GET'){
    // pass component from backend
    res.write("<h1>server text</h1>")
    res.end()
  }
  // csr
  if(req.url === '/user' && req.method === 'GET'){
    res.writeHead(200,{
      'Content-Type':'application/json'
    })
    const user = {
      name:'jarren',
      job:'coding',
      age:15,
    }
    res.end(JSON.stringify(user))
  } else if(req.url === '/ball' && req.method === 'GET'){
    res.writeHead(200,{
      'Content-Type':'application/json'
    })
    const player = {
      name:'Lebron James',
      team:'LAL',
      year:21,
      rings:4,
    }
    res.end(JSON.stringify(player))
    return
  } else {
    res.writeHead(404,{
      'Content-Type':'application/json'
    })
    data = {
      code:404,
      message:'Not Found!'
    }
  }
})
server.listen(port,()=>{
  console.log(`Server started at localhost:${port}`);
})