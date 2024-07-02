import { Component, OnInit } from '@angular/core';
import * as jalaali from 'jalaali-js';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent  implements OnInit {
  shamsiDate: string = '';

  constructor() { }
  
  ngOnInit() {
  this.shamsiDate = this.getShamsiDate();
  }
  
  getShamsiDate() {
  const now = new Date();
  const jdate = jalaali.toJalaali(now);
  
  // نام روز هفته به فارسی
  const weekdays = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
  const dayOfWeek = weekdays[now.getDay()];
  
  return `${dayOfWeek} ${jdate.jd} ${jdate.jm} ${jdate.jy}`;
  }
  }