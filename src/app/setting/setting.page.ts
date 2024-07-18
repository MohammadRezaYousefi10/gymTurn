import { Component, OnInit } from '@angular/core';
import { ServisesService } from '../myService/servises.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  user : any;
  currentUser : any = null;

  // Error handling
  ErrorForUser : string = '';
  ErrorForPwd : string = '';
  ErrorForAge : string = '';
  ErrorForHeight : string = '';
  ErrorForWeight : string = '';
  ErrorForSport : string = '';
  ErrorForMobile : string = '';
  ErrorForEmail : string = '';
  
  constructor(private myService: ServisesService) { }

  ngOnInit() {
    this.currentUser = this.myService.getCurrentUser();
    console.log(this.currentUser);
    this.getUserInfo();
  }

  getUserInfo(){
    this.myService.getData().subscribe( data => {
      this.user = data;
      console.log(this.user)
    })

  }

  saveChanges(){
    this.myService.updateUser(this.currentUser).subscribe(response => {
      console.log('User updated successfully');
    })
  }
}
