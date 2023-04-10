const gRPC = require('grpc');

const protoLoader = require('@grpc/proto-loader');


const packageDefinition = protoLoader.loadSync("todo.proto", {});

const grpcObject = gRPC.loadPackageDefinition(packageDefinition);

const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("localhost:4000", gRPC.credentials.createInsecure())

client.createTodo({
    "Id":-1,
    "Text":"First Todo"
}, (err, response) => {
    console.log(`Received from server: ${JSON.stringify(response)}`)
});