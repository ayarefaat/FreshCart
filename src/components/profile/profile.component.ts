import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { SharedService } from '../../core/services/shared.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private _sharedService:SharedService){}
  data!:any
  userData!:any
  ngOnInit(){
   this.data=this._sharedService.getUserData()
   this.userData=JSON.parse(this._sharedService.getUserData()!)
   console.log(this.userData)
  }
}
