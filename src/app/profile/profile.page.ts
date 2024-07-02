import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as jalaali from "jalaali-js";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  shamsiDate : string = '';
  constructor(private router:Router , private loadingController : LoadingController) { }

  ngOnInit() {
    this.shamsiDate = this.getShamsiDate();
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

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
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
