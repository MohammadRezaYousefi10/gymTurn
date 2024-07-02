import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit {
  task:any;
  is_VIP : any;

  isOpen_1 = false;
  isOpen_2 = false;

  items: Array<{ label: string, img:string, description: string }> = [
    { label: 'پاستا رژیمی با مرغ و سس پستو',  img:'../../assets/image/Best-healthy-7b3f165.jpg', description: '350 کالری - 13 گرم چربی -  35 گرم پروتئین' },
    { label: 'برگر رژیمی',  img:'../../assets/image/burger.jpg', description: '250 کالری - 9 گرم چربی -  20 گرم پروتئین'},
    
    
    
    ];
    
    filteredItems: Array<{ label: string,  img:string, description: string }>;






  constructor(private router:Router , private loadingController : LoadingController) { 
    this.filteredItems = [...this.items]; 
  }

  ngOnInit() {
  }

  async openModal(free :any) {
      
      
    if (free == 'پاستا رژیمی با مرغ و سس پستو')
      this.isOpen_1 = true;
    if (free == 'برگر رژیمی')
      this.isOpen_2 = true; 
    
    
    } 

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  close_1(){
    this.isOpen_1 = false;
  }

  async Exercises(){
    await this.router.navigateByUrl(`exercises`);
  }

  async meals(){
    await this.router.navigateByUrl(`meals`);
  }

  async profile(){
    await this.router.navigateByUrl(`profile`);
  }
}
