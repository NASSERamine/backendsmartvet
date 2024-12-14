import { Component } from '@angular/core';
import { ChatBotService } from '../services/chat-bot.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent {
  isCollapsed = false;
  unreadMessages = 0;
  chatMessages: { type: string; content: string }[] = [];
  userInput: string = '';
  sessionId: string = '12345'; // Utilisez une session unique si possible

  constructor(private chatBotService: ChatBotService) {}

  toggleChat() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.unreadMessages = 0;
    }
  }

  sendMessage() {
    if (!this.userInput.trim()) {
      return; // Ne rien faire si le message est vide
    }

    // Ajouter le message utilisateur dans la liste des messages
    this.chatMessages.push({
      type: 'user',
      content: this.userInput
    });

    const userMessage = this.userInput; // Sauvegarde du message
    this.userInput = ''; // Effacer l'entrée utilisateur

    // Appeler le service pour envoyer le message au backend
    this.chatBotService.sendMessage(userMessage, this.sessionId).subscribe(
      (response: any) => {
        const botResponse = response.response || 'Désolé, je ne peux pas répondre à votre demande pour le moment.';
        this.chatMessages.push({
          type: 'bot',
          content: botResponse
        });
      },
      (error) => {
        console.error('Erreur :', error);
        this.chatMessages.push({
          type: 'bot',
          content: 'Désolé, une erreur est survenue. Veuillez réessayer.'
        });
      }
    );
  }
}
