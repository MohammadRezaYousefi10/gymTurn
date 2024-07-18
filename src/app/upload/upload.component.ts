import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IonInput , IonButton } from '@ionic/angular/standalone';

@Component({
  standalone : true,
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  imports: [IonInput , IonButton]
})
export class UploadComponent  implements OnInit {
  selectedFile: File | null = null;
  constructor(private http: HttpClient) { }

  onFileSelected(event : any){
    this.selectedFile = event?.target.files[0];
  }
  onUpload(){
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        const base64String = reader.result as string;
        
        this.http.post('localhost:3500/upload' , { image : base64String }).subscribe(response => {
          console.log('Image uploaded successfully' , response)
        });
      }
    }
  }

  ngOnInit() {}

}
