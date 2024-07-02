import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { ModalComponent } from '../components/modal/modal.component';
import { IonModal } from '@ionic/angular/common';
import { HtmlParser } from '@angular/compiler';



@Component({
  
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage   {
  
  items: Array<{ label: string, img:string, description: string }> = [
    { label: 'شکم',  img:'../../assets/icon/human.png', description: 'تقویت عضلات شکم' },
    { label: 'پشت',  img:'../../assets/icon/back.png', description: 'تقویت عضلات پشت' },
    { label: 'فیله',  img:'../../assets/icon/Quadratus lumborum.png', description: 'تقویت عضلات فیله' },
    { label: 'ذوزنقه ای',  img:'../../assets/icon/trapezius.png', description: 'تقویت عضلات ذوزنقه ای' },
    { label: 'پشت بازو',  img:'../../assets/icon/Traceps.png', description: 'تقویت عضلات پشت بازو' },
    { label: 'جلو بازو',  img:'../../assets/icon/biceps.png', description: 'تقویت عضلات جلو بازو' },
    { label: 'ساعد',  img:'../../assets/icon/forearm.png', description: 'تقویت عضلات ساعد' },
    { label: 'سرشانه',  img:'../../assets/icon/shoulder.png', description: 'تقویت عضلات سرشانه' },
    { label: 'سینه',  img:'../../assets/icon/chest.png', description: 'تقویت عضلات سینه' },
    { label: 'پشت پا',  img:'../../assets/icon/Hamstrings.png', description: 'تقویت عضلات پشت پا' },
    { label: 'چهارسر',  img:'../../assets/icon/quads.png', description: 'تقویت عضلات چهارسر' },
    { label: 'سرینی',  img:'../../assets/icon/gluteal.png', description: 'تقویت عضلات سرینی' },
    { label: 'ساق',  img:'../../assets/icon/calf.png', description: 'تقویت عضلات ساق' },
    
    
    ];
    
    filteredItems: Array<{ label: string,  img:string, description: string }>;
    
  task : any;
  player : any;
  videoId : string = '';
  stopped : boolean = true;
  /* isActive : false; */
  is_open_1 = false;
  is_open_2 = false;


  is_open_1_1 = false;
  sort = '../../assets/icon/nutrition.png';
  

  constructor(private router:Router , private loadingController : LoadingController ) {
    this.filteredItems = [...this.items]; 
   }

   filterItems(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (!searchTerm) {
    this.filteredItems = [...this.items];
    return;
    }
    
    this.filteredItems = this.items.filter(item =>
    item.label.toLowerCase().includes(searchTerm)
    );
    }
    
    async openModal(task :any) {
      
      if (task == 'شکم')
        this.is_open_1 = true;
      if (task == 'پشت')
        this.is_open_2 = true; 
      
      
      } 

      
      handleRefresh(event:any) {
        setTimeout(() => {
          // Any calls to load data go here
          event.target.complete();
        }, 2000);
      }
  

  async Exercises(){
    const loading = await this.loadingController.create();
    await loading.present();
    await this.router.navigateByUrl(`exercises`);
    await loading.dismiss();
  }

  async meals(){
    const loading = await this.loadingController.create();
    await loading.present();
    await this.router.navigateByUrl(`meals`);
    await loading.dismiss();
  }

  async profile(){
    const loading = await this.loadingController.create();
    await loading.present();
    await this.router.navigateByUrl(`profile`);
    await loading.dismiss();
  }

  Open_1 (){
    this.is_open_1 = true;
  }

  Open_2 (){
    this.is_open_2 = true;
  }

  close_1 (){
    this.is_open_1 = false;
  }

  close_2 (){
    this.is_open_2 = false;
  }

  Open_1_1 (){
    this.is_open_1_1 = true;
  }

  close_1_1 (){
    this.is_open_1_1 = false;
  }
}
