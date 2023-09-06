//src>app>components>messages>messages.component.ts
import { Component, OnInit } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  faTimes = faTimes;

  //será publuc pque queremos ter acesso ao serviço do template
  constructor(public messagesService: MessagesService) {}

  ngOnInit(): void {}
}
