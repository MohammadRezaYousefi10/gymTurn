import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ServisesService } from '../myService/servises.service';
import { SaveServiceService } from '../myService/save-service.service';
import { HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // data
  user_1 = "";
  pwd_1 = "";

  // Error handlening
  ErrorForUser : string = '';
  ErrorForPwd : string = '';
  errorMessage : string = '';

  constructor(
    private router:Router ,
    private loadingController : LoadingController ,
    private myService : ServisesService,
    private saveService : SaveServiceService,
    private alertController : AlertController
  ) {}

  ngOnInit() {
  }
    
  async login(){
    const loading = await this.loadingController.create();
    await loading.present();
    try {
      this.saveName();    
      const data = {
        user : this.user_1 ,
        pwd : this.pwd_1 ,   
      };
      
      this.myService.login(data).subscribe({ next :(response) =>{
      const token = localStorage.setItem('accessToken' , response.accessToken); 
        this.message();
      this.router.navigateByUrl(`exercises`);
    } , error: (error) => {
      this.errorMessage = error;
      console.error('There was an Error' , error);
    }
    });
    await loading.dismiss();
    } catch (err) {  
      console.error(err);
      navigator.vibrate(1000);
    }
    await loading.dismiss();
  }
  

  saveName (){
    this.saveService.setFullName(this.user_1);
   }



  async register(){
    const loading = await this.loadingController.create();
    await loading.present();
      this.router.navigateByUrl(`register`); 
    await loading.dismiss();
  }
  async forgotPassword(){
    const loading = await this.loadingController.create();
    await loading.present();
      this.router.navigateByUrl(`forgot-password`); 
    await loading.dismiss();
  }

  async message() {
    const alert = await this.alertController.create({
    header: 'تبریک!',
    
    message: `${this.user_1} عزیز به جیم تایم خوش آمدی`,
    cssClass: 'alert-message',
    buttons: [
    {
      text : 'بستن' ,
      role: 'cancel',
      cssClass : 'alert-buttons',
      
      },
  ] 
    
    });
    
    await alert.present();
    }


  
}
