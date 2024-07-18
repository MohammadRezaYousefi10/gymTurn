import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as jalaali from "jalaali-js";
import { SaveServiceService } from '../myService/save-service.service';
import { ServisesService } from '../myService/servises.service';
import { AlertController } from '@ionic/angular/standalone';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  shamsiDate : string = '';
  fullname_1: string = '';
  image: string = '';
  
  data : any;
  user : any;
  
  workoutPlans: any[] = [];
  api_get_workout = 'http://localhost:3500/api/exercises';
  AllworkoutPlans: any[] = [];

  defultImage = '../assets/image/fitness1.png'

  selectedFile: File | null = null;
  profileImageUrl: string = 'http://localhost:3500/';
  ImageUrl: string = 'http://localhost:3500/';
  
  constructor(private router:Router , private loadingController : LoadingController ,
    private saveService : SaveServiceService , private myService : ServisesService,
    private alertController : AlertController , private http: HttpClient
  ) {
    
   }


  ngOnInit() {
    this.shamsiDate = this.getShamsiDate();
    this.fullname_1 = this.myService.currentUser.user;
    console.log(this.fullname_1)
      if (this.fullname_1 == '' || this.fullname_1 == undefined) {
        this.router.navigateByUrl(`login`);
      }else {
        this.fullname_1 =  this.myService.currentUser.user;
      }
    this.user = this.myService.currentUser.user;

    this.getWorkoutPlans();
    this.getAllWorkoutPlans();
    
    console.log(this.myService.currentUser.profileImage);
     if (this.myService.currentUser.profileImage == '') {
      this.profileImageUrl = this.defultImage;
    }if(this.myService.currentUser.profileImage.slice(0 , 7) == 'uploads'){
      this.profileImageUrl =  `${this.ImageUrl}${this.myService.currentUser.profileImage}`;
    }
    else {
      this.profileImageUrl =  this.defultImage;
    } 
    console.log(this.profileImageUrl)
 }

  // get exersices for that user
  getWorkoutPlans(){
    this.http.get(`${this.api_get_workout}/${this.myService.currentUser.user}`).subscribe((response: any )=> {
      
        this.workoutPlans = response;
      
    } , error => {
      console.error('Error fetching workout plans' , error);
    });
  }

  //get all exercises
  getAllWorkoutPlans(){
    this.http.get(`${this.api_get_workout}`).subscribe((response: any )=> {
      
        this.AllworkoutPlans = response;
        console.log(this.AllworkoutPlans)
    } , error => {
      console.error('Error fetching workout plans' , error);
    });
  }

  // check for is user admin
  isAdmin(){
    return this.myService.hasRole('5150');
}
 
chooseFile(){
  document.getElementById('fileInput')?.click();
}

onFileSelected(event : any){
  this.selectedFile = event.target.files[0] as File;
  const reader = new FileReader();
  reader.onload = () => {
    this.profileImageUrl = reader.result as string;
  }
  reader.readAsDataURL(this.selectedFile);

}
uploadProfileImage(){
  if(!this.selectedFile){
    console.log('No file selected');
    return;
  }
  
  const userId = this.myService.currentUser.id;
  console.log(userId)
  const fd = new FormData();
  fd.append('image' , this.selectedFile , this.selectedFile.name);
  fd.append('userId' , userId)
  
  const token = localStorage.getItem('accessToken');
  const headers = new HttpHeaders().set('Authorization' , `Bearer ${token}`);

  
  
  // add image
  this.http.post(`http://localhost:3500/upload` , fd ,{headers}).subscribe((response: any) => {
    console.log(response);
    this.myService.currentUser.profileImage = response['path'];
    this.profileImageUrl = `http://localhost:3500/${response['path']}`;
    this.message();
    
  });
  

}

deleteProfileImage(){

  const userId = this.myService.currentUser.id;
  const token = localStorage.getItem('accessToken');
  const headers = new HttpHeaders().set('Authorization' , `Bearer ${token}`);

  // delete image
  this.http.delete(`http://localhost:3500/upload/${userId}` , {headers}).subscribe(response =>{
    console.log(response);
    this.myService.currentUser.profileImage = '';
    this.profileImageUrl = '';   
  } , error => {
    console.error('Error deleting profile image: ' , error);
  });
}


  getShamsiDate() {
    const now = new Date();
    const jdate = jalaali.toJalaali(now);

    const weekdays = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
    const month = ["دی","آذر","آبان", "مهر", "شهریور", "مرداد", "تیر", "خرداد", "اردیبهشت", "فروردین","اسفند","بهمن"];
    const dayOfWeek = weekdays[now.getDay()];
    const monthOfYear = month[now.getMonth()];
    return `${dayOfWeek} ${jdate.jd} ${monthOfYear} ${jdate.jy}`;
  }

  async logout(){
    const loading = await this.loadingController.create();
    await loading.present();
    await this.router.navigateByUrl(`login`);
    await loading.dismiss();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
    header: 'خروج',
    
    message: 'آیا میخواهید خارج شوید ؟',
    cssClass: 'alert-message',
    buttons: [
      {
        text : 'خیر' ,
        role: 'cancel',
        cssClass : 'alert-buttons',
        
        },
    {
      text: 'خروج' ,
      cssClass : 'alert-buttons',
      handler: ()=> {
        this.logout();
      }
    },
    
  ] 
    
    });
    
    await alert.present();
    }

    async message() {
      const alert = await this.alertController.create({
      header: 'تبریک!',
      
      message: 'تصویر شما به موفقیت ثبت شد',
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
  

  handleRefresh(event:any) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  async Exercises(){
    await this.router.navigateByUrl(`exercises`);
  }

  async meals(){
    await this.router.navigateByUrl(`meals`);
  }
  async explore(){
    await this.router.navigateByUrl(`explore`);
  }

  async profile(){
    await this.router.navigateByUrl(`profile`);
  }

}
