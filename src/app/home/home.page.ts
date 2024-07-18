import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router , private loadingController : LoadingController) {}

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();
    await this.router.navigateByUrl(`login`);
    await loading.dismiss();
  }

  async register(){
    const loading = await this.loadingController.create();
    await loading.present();
    await this.router.navigateByUrl(`register`);
    await loading.dismiss();
  }

}
