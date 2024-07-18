import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ServisesService } from '../myService/servises.service';
import { SaveServiceService } from '../myService/save-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  // data
  fullname_1: string = '';
  pwd_1: string = '';
  age_1: string = '';
  height_1: string = '';
  weight_1: string = '';
  sport_1: string = '';
  mobile_1: string = '';
  email_1: string = '';

  // Error handling
  ErrorForUser : string = '';
  ErrorForPwd : string = '';
  ErrorForAge : string = '';
  ErrorForHeight : string = '';
  ErrorForWeight : string = '';
  ErrorForSport : string = '';
  ErrorForMobile : string = '';
  ErrorForEmail : string = '';
  
  
  
  constructor(
    private http : HttpClient,
    private router:Router ,
    private loadingController : LoadingController ,
    private alertController: AlertController,
    private myservice: ServisesService,
     ) {}

     


      async sendData (){
        const loading = await this.loadingController.create();
        await loading.present();
      try {
 
        // Username Error handler
        if ( this.fullname_1.length < 3){
          this.ErrorForUser = ' نام اشتباه است ';
          this.fullname_1 = '';
        }else{
          this.ErrorForUser = '';
        }
        // Password Error handler
        if ( this.pwd_1.length < 8){
          this.ErrorForPwd = 'رمز کوتاه است';
          this.pwd_1 = '';
        }else{
          this.ErrorForPwd = '';
        }
        // Age Error handler
        if ( this.age_1.length !== 2){
          this.ErrorForAge = ' سن اشتباه است ';
          this.age_1 = '';
        }else{
          this.ErrorForAge = '';
        }
        // Height Error handler
        if ( this.height_1.length !== 3){
          this.ErrorForHeight = ' قد اشتباه است ';
          this.height_1 = '';
        }else{
          this.ErrorForHeight = '';
        }
        // Weight Error handler
        if ( this.weight_1.length > 3 ||  this.weight_1.length < 2){
          this.ErrorForWeight = ' وزن اشتباه است ';
          this.weight_1 = '';
        }else{
          this.ErrorForWeight = '';
        }
        // Sport Error handler
        if ( this.sport_1.length < 2){
          this.ErrorForSport = ' ورزش اشتباه است ';
          this.sport_1 = '';
        }else{
          this.ErrorForSport = '';
        }
        // Mobile Error handler
        if ( this.mobile_1.length != 11 || this.mobile_1.slice(0 , 2) != '09'){
          this.ErrorForMobile = ' شماره موبایل اشتباه است ';
          this.mobile_1 = '';
          
        }else{
          this.ErrorForMobile = '';
        }

        // Email Error handler
        function validateEmail(email : any) {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(email);
        }

        if (validateEmail(this.email_1)) {
          this.ErrorForEmail = '';
          
        }else{
          this.ErrorForEmail = ' ایمیل اشتباه است ';
          this.email_1 = '';
        }


        const data = {
          user : this.fullname_1 ,
          pwd : this.pwd_1 ,
          age : this.age_1 ,
          height : this.height_1 ,
          weight : this.weight_1 ,
          sport : this.sport_1 ,
          mobile : this.mobile_1 ,
          email : this.email_1 ,
        };

        this.myservice.sendData(data).subscribe(response =>{
        console.log(response);
        this.message();
        this.router.navigateByUrl(`login`);
      });
      await loading.dismiss();
      } catch (err) {
        navigator.vibrate(1000);
        console.log(err)
      }   
     }

     

     async message() {
      const alert = await this.alertController.create({
      header: 'تبریک!',
      
      message: `شما با موفقیت ثبت نام کردید `,
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
