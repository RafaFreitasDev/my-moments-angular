//scr>app>services>messages.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  message: string = '';

  constructor() {}

  add(message: string) {
    this.message = message;

    setTimeout(() => {
      this.clear();
    }, 1500);
  }

  clear() {
    this.message = '';
  }
}
