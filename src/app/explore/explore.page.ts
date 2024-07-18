import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ServisesService } from '../myService/servises.service';
import { SaveServiceService } from '../myService/save-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular/standalone';

interface Exercises{
  name:string ;
  reps : string | number;
  sets : string | number;
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  // user data
  data : any;
  username : string = '';
  currentUser : any;
  selectedUser : any = null;
  
  workoutPlan = {
    name: '',
    description: '',
    exercises: [] as Exercises[]
  };
  
  api_send_workout = 'http://localhost:3500/api/exercises';
  
  deafulteImage = '../../assets/icon/fitness.png';
  profileImageUrl: string = '';
 

  constructor(private router:Router , private loadingController : LoadingController ,
    private saveService : SaveServiceService , private myService : ServisesService,
    private alertController : AlertController , private http : HttpClient,
    private toastController : ToastController
  ) { }

  
  ngOnInit() {
    this.currentUser = this.myService.getCurrentUser();
    console.log(this.currentUser);

    
      this.username = this.myService.fullname;
      console.log(this.username)
      if (this.username == '' || this.username == undefined) {
        this.router.navigateByUrl(`login`);
      }else {
        this.username = this.myService.fullname;
      }
    this.myService.getData().subscribe(response => {
      this.data = response;
      
      console.log(this.data[0].profileImage );
      console.log(this.data);
    } , error => {
      console.error('Error fetching data' , error);
    });

    
    /* for (let index = 1; index < 6; index++) {
      this.profileImage = `${this.ImageUrl}${this.data[index].profileImage}`;
      console.log(`this is new log ${this.profileImage}`);
    } */

    /* console.log(this.myService.currentUser.profileImage);
     if (this.myService.currentUser.profileImage == '') {
      this.profileImageUrl = this.deafulteImage;
    }if(this.myService.currentUser.profileImage.slice(0 , 7) == 'uploads'){
      this.profileImageUrl =  `${this.ImageUrl}${this.myService.currentUser.profileImage}`;
    }
    else {
      this.profileImageUrl =  this.deafulteImage;
    } 
    console.log(this.profileImageUrl) */
    
  }
  ImageUrl(profileImage : string){
    if(!profileImage || profileImage === ''){
      return '../../assets/icon/fitness.png';
    }
    
    return `http://localhost:3500/${profileImage}`;
  }

  async confirmDelete(userId: string) {
    const alert = await this.alertController.create({
      header: 'حذف ورزشکار',
      message: 'آیا مطمئن هستید ؟',
      cssClass: 'alert-message',
      buttons: [
        {
          text: 'خیر',
          role: 'cancel',
          cssClass : 'alert-buttons',
        },
        {
          text: 'حذف',
          cssClass : 'alert-buttons',
          handler: () => {
            this.deleteUser(userId);
          },
        },
      ],
    });

    await alert.present();
  }

  deleteUser(userId: string) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`http://localhost:3500/Users/${userId}`, { headers })
      .subscribe(
        () => {
          this.data = this.data.filter((d:any) => d.id !== userId);
          this.presentToast('User deleted successfully');
        },
        (error) => {
          console.error('Error deleting user:', error);
          this.presentToast('Failed to delete user');
        }
      );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  isAdmin(){
      return this.myService.hasRole('5150');
  }
   
  async openModal(user :any) {
    this.selectedUser = user;
    this.workoutPlan = {
      name: '',
      description: '',
      exercises: []
    };
  
    }
    

    async addExercise(): Promise<void>{

      const alert = await this.alertController.create({
        header: 'افزودن تمرین', 
        cssClass: 'alert-message',
        inputs: [
          {
            name: 'name',
            type : 'text',
            placeholder : 'نام حرکت',
            cssClass: 'alert-message'
          },
          {
            name: 'reps',
            type : 'number',
            placeholder : 'تعداد حرکت',
            cssClass: 'alert-message'
          },
          {
            name: 'sets',
            type : 'text',
            placeholder : 'تعداد ست‌ها',
            cssClass: 'alert-message'
          },
        ],
        buttons: [
          {
            text: 'لغو' ,
            role: 'cancel',
            cssClass: 'alert-message'
            
          },
          {
            text: 'اضافه کردن',
            cssClass: 'alert-message',
            handler: result => {
              if(result.name && result.reps && result.sets){
                const exercises: Exercises = {name: result.name , reps: result.reps , sets: result.sets};
                this.workoutPlan.exercises.push(exercises);
              }
            }
          }
        ]
      });

      await alert.present();

    }

    submitWorkoutPlan(): void {
      if (this.selectedUser) {
        const workoutData = {
          userId : this.selectedUser.id ,
          userName: this.selectedUser.username ,
          workoutPlan: this.workoutPlan
        };
        this.http.post(this.api_send_workout , workoutData).subscribe(response => {
          console.log('Workout Plan Submitted', response);
          this.message();
          this.selectedUser = null;
        } , error => {
          console.error('Error submitting workout plan' , error);
        });
      }
    }

    async message() {
      const alert = await this.alertController.create({
      header: 'تبریک!',
      
      message: ` برنامه تمرینی برای ${this.selectedUser.username} ارسال شد`,
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
          // Any calls to load data go here
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
