import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  username: string = '';
  constructor(
    private http: HttpClient ,
    private toastController: ToastController ,
    private router : Router,
    private loadingController : LoadingController
    ) { }

  ngOnInit() {
  }

  async sendResetLink() {
    this.http.post('http://localhost:3500/auth/forgot-password', { username: this.username })
      .subscribe(
        async () => {
          const toast = await this.toastController.create({
            message: 'Password reset link sent',
            duration: 2000,
          });
          toast.present();
          const loading = await this.loadingController.create();
          await loading.present();
          this.router.navigateByUrl(`reset-password`);
          await loading.dismiss();
        },
        async (error) => {
          const toast = await this.toastController.create({
            message: 'Failed to send password reset link',
            duration: 2000,
          });
          toast.present();
        }
      );
  }

}
