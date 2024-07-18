import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  token: any;
  newPassword: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastController: ToastController) {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log(this.token);
    
  }

  resetPassword() {
    this.http.post(`http://localhost:3500/auth/reset-password/${this.token}`, { newPassword: this.newPassword })
      .subscribe(
        async () => {
          const toast = await this.toastController.create({
            message: 'Password has been reset',
            duration: 2000,
          });
          toast.present();
        },
        async (error) => {
          const toast = await this.toastController.create({
            message: 'Failed to reset password',
            duration: 2000,
          });
          toast.present();
        }
      );
  }


  ngOnInit() {
  }

}
