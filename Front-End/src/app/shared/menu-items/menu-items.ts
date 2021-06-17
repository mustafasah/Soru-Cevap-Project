import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'questions', name: 'Sorular', type: 'link', icon: 'comments' },
  { state: 'addquestion', name: 'Soru Sor', type: 'link', icon: 'assistant' },
  { state: 'users', name: 'Kullanıcılar', type: 'link', icon: 'account_circle' },
  { state: 'register', name: 'Kayıt Ol', type: 'link', icon: 'face' }
]

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
