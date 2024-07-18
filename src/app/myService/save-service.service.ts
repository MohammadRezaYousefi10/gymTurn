import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveServiceService {
  private fullname_1 : string = '';

  constructor() { }

  // setter and getter for fullname
  setFullName (Fname:string){  
    this.fullname_1 = Fname;
  }
  getFullName (){
    return this.fullname_1;
  }

  
}
