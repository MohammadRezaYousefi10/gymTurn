import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Dialog } from '@capacitor/dialog';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform , private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      App.addListener('backButton', async () => {
        if (this.router.url === '/exersices' || this.router.url === '/meals' || this.router.url === '/explore' || this.router.url === '/profile') { // صفحه اصلی اپلیکیشن شما
          const alert = await Dialog.confirm({
            title: 'خروج',
            message: 'آیا می‌خواهید از برنامه خارج شوید؟',
            okButtonTitle: 'بله',
            cancelButtonTitle: 'خیر'
          });

          if (alert.value) {
            App.exitApp();
          }
        } else {
          // اگر در صفحه دیگری هستید، فقط به صفحه قبل برگردید
          window.history.back();
        }
      });
    });
  }
}
