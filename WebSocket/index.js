const http = require('http');

const WebSocketServer = require('websocket').server

let connections = [];

//Create a raw http server (this will help us create the TCP which will the pass down to websocket)
 const httpserver = http.createServer();

 const websocket = new WebSocketServer({httpServer: httpserver});



 websocket.on("request", req =>{
    const connection = req.accept(null, req.origin);

    connection.on("message", message => {
        connections.forEach(c=>c.send(`User ${connection.socket.remotePort} says: ${message.utf8Data}`))

    })

    connections.push(connection);
    connections.forEach(c=>c.send(`User ${connection.socket.remotePort} just connected.`))
 })

 httpserver.listen(8080, ()=>{
    console.log("Server listening o port 8080")
 });