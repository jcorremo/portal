import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  URL: string
  showChat = false
  icon: string = 'comment-alt'
  label: string = 'Abrir Chat'
  constructor() { }

  ngOnInit() {
    this.URL = "http://storage.googleapis.com/producto-digital-chatbot/www/index.html#/productodigital"
  }

  toggleChat() {
    this.showChat = !this.showChat
    this.icon = this.showChat ? "sign-out-alt" : "comment-alt"
    this.label = this.showChat ? "Cerrar Chat" : "Abrir Chat"
  }

}
