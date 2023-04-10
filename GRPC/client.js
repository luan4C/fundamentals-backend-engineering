const gRPC = require('grpc');

const protoLoader = require('@grpc/proto-loader');


const packageDefinition = protoLoader.loadSync("todo.proto", {});

const grpcObject = gRPC.loadPackageDefinition(packageDefinition);

const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("localhost:4000", gRPC.credentials.createInsecure())

const text = process.argv[2]

client.createTodo({
    "Id":-1,
    "Text":text
}, (err, response) => {
    console.log(`Received from server: ${JSON.stringify(response)}`)
});

// client.readTodos({}, (err, response)=>{
//     console.log(`Receveid from serer: ${JSON.stringify(response)}`)
// })

const call = client.readTodosStream()

call.on('data', item =>{
    console.log("received item from server "+ JSON.stringify(item))
})

call.on("end", () => console.log("Server done!"))