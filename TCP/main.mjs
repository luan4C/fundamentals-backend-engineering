import net from 'net'
import readline from 'readline'

var reader = readline.createInterface({input: process.stdin, output: process.stdout})

function sendsBack(socket){
    reader.question("=>: ", (input)=>{

        socket.write(input+"\n")
    })
}

const server= net.createServer(socket => {
    socket.on("connet", ()=> console.log("TCP CONNECTION WITH:" + socket.remoteAddress))

    socket.write("Hello jonas!\n");

    socket.on("data", data => {
        console.log("Incomming: " + data.toString())
        sendsBack(socket);
    })
});

server.listen(2556, "192.168.0.150");