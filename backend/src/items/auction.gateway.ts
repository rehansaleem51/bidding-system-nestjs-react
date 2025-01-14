import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Socket } from "socket.io";

@WebSocketGateway({
    cors: true,
    transports: ['websocket'],
  })
  export class AuctionGateway {
    @WebSocketServer()
    private readonly server: Server;
  
    @SubscribeMessage('place-bid-join')
    async joinRoom(client: Socket, roomId: string): Promise<void> {
      await client.join(roomId);
    }
  
    @SubscribeMessage('place-bid-leave')
    async leaveRoom(client: Socket, roomId: string): Promise<void> {
      await client.leave(roomId);
    }
  
    public placeBidToRoom(roomId: string, payload: any): void {
      this.server.to(roomId).emit('new-bid-placed', payload);
    }
  }