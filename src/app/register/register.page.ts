import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  
  constructor(
    private http : HttpClient,
    private router:Router ,
    private loadingController : LoadingController ,
    private alertController: AlertController,
     ) { }
     
    

  
     formData = {
      name: this.name,  
      email: this.email
    }
  
  
  /* this.http.post('http://loacalhost:3500' , formData).subscribe(response => {
    console.log('Response:' , response);
  }, error => {
    console.error('Error:' , error);
  });  */ 


  

  async register(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.http.post('http://loacalhost:3500' , this.formData).subscribe(response => {
      console.log('Response:' , response);
    }, error => {
      console.error('Error:' , error);
    });
      this.router.navigateByUrl(`login`);
      
    await loading.dismiss();
  }
   
}
