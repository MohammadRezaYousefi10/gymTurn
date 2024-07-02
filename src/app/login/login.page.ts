import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router , private loadingController : LoadingController) { }

  ngOnInit() {
  }
    
  async login(){
    const loading = await this.loadingController.create();
    await loading.present();
      this.router.navigateByUrl(`exercises`); 
    await loading.dismiss();
  }


  
}
