import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent {

  isCollapsed = false;
  unreadMessages = 0;

  toggleChat() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.unreadMessages = 0;
    }
  }

  sendMessage() {
    // Implement your message sending logic here
    console.log('Message sent');
    if (!this.isCollapsed) {
      this.unreadMessages++;
    }
  }
}
