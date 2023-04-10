const gRPC = require('grpc');

const protoLoader = require('@grpc/proto-loader');
const { Server } = require('grpc');

const packageDefinition = protoLoader.loadSync("todo.proto", {});

const grpcObject = gRPC.loadPackageDefinition(packageDefinition);

const todoPackage = grpcObject.todoPackage;

const server = new Server();
server.bind("0.0.0.0:4000", gRPC.ServerCredentials.createInsecure());

server.addService(todoPackage.Todo.service, {
    "createTodo":createTodo,
    "readTodos":readTodos
});

server.start();
const todos = []
function createTodo(call, callback){
    let todo = {
        Id: todos.length +1,
        Text: call.request.Text
    }
    todos.push(todo);
    callback(null, todo)

}

function readTodos(call, callback){

}