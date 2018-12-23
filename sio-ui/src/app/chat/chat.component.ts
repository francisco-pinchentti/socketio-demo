import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/services/ChatService';
import { Message } from 'src/models/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public message: string;
  public username: string;

  public messages: Message[];

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((messages: Message[]) => {
        this.messages = messages;
      });
  }

  public get isValid(): boolean {
    return !!this.username && !!this.message;
  }

  public sendMesage(): void {
    this.chatService.sendMessage({
      timestamp: new Date().getTime(),
      author: this.username,
      text: this.message
    });
    this.message = '';
  }

}
