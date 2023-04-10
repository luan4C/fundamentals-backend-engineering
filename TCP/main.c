#include <stdio.h>
#ifndef WIN32_LEAN_AND_MEAN
#define WIN32_LEAN_AND_MEAN
#endif
#include <windows.h>
#include <winsock2.h>
#include <ws2tcpip.h>

#define PORT 2556

int main(){

    WSADATA wsdata;

    int err = WSAStartup(MAKEWORD(2,2), &wsdata);

    if(err !=0){
        printf("WSAStartup failed with error: %d\n", err);
        return 1;
    }

    SOCKET sockfd = INVALID_SOCKET;
    struct sockaddr_in server_addr;

    int newSocket;
    struct sockaddr_in new_addr;

    socklen_t addr_size;
    char buffer[1024];
    //Create a TCP Socket
    sockfd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if(sockfd == INVALID_SOCKET){
        wprintf(L"socket function failed with error: %ld\n", WSAGetLastError());
        WSACleanup();
        return 1;
    }
    printf("Socket created! %d\n", sockfd);
    
    //memset to initialize server address struct
    memset(&server_addr, '\0', sizeof(server_addr));

    //Set server address
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    server_addr.sin_addr.S_un.S_addr = inet_addr("192.168.0.150");

    //Bind socket ("any packet that is received, go aread and delevery receiveds datagrams or segments to me")
    err = bind(sockfd, (struct sockaddr*)&server_addr, sizeof(server_addr));
   
    if(err != 0){
        printf("Bind failed with error: %d\n", err);
        return 1;
    }
    printf("[+]Done bind to port %d.\n", PORT);

    //Listen on socket ("Listen for incomming connection request")
    //Listen is what performs the TCP handshake
    //The backlog parameter is the maximun number of connections not accepted tha will fit in the queue
    err = listen(sockfd, 5);
        printf("[-]Error %ld\n", WSAGetLastError());
    if(err == SOCKET_ERROR){
        printf("Listen failed with error: %d\n", err);
        return 1;
    }
    printf("[+]Listening...\n");
    
    //After listened a connection request you need to accept
    //New socket holds the requester
    newSocket = accept(sockfd, (struct sockaddr*)&new_addr, &addr_size);

    strcpy(buffer, "Hello Jonatas\n");
    send(newSocket, buffer,strlen(buffer), 0);
    printf("[+]Closing the connection.\n");
    
    return 0;
}