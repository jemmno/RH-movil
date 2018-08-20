
import { Component, OnInit } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { MessageService } from '../../app/services/message.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: []
})
export class MessagesComponent implements OnInit {

  constructor(
    public messageService: MessageService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.messageService.messages.forEach( mensaje => {
      this.presentToast(mensaje)
    })
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}