import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from './auth.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class EmailCheckGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private authService: AuthService) {}

   handleConnection(client: Socket) {
    console.log('✅ Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('❌ Client disconnected:', client.id);
  }

  @SubscribeMessage('checkEmail')
  async handleCheckEmail(@MessageBody() email: string) {
    const exists = await this.authService.emailExists(email);
    // Emit only to sender
    this.server.emit('emailStatus', { email, exists });
  }
}