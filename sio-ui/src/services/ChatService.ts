import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';

@Injectable()
export class ChatService {

    constructor(private socket: Socket) { }

    sendMessage(msg: Message) {
        this.socket.emit('new-message', msg);
    }

    getMessages(): Observable<Message[]> {
        return this.socket
            .fromEvent('messages');
    }

}
