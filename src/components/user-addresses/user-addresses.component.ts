import { Component } from '@angular/core';
import { AddressService } from '../../core/services/address.service';
import { LoaderComponent } from "../loader/loader.component";
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-addresses',
  standalone: true,
  imports: [LoaderComponent,RouterLink],
  templateUrl: './user-addresses.component.html',
  styleUrl: './user-addresses.component.css'
})
export class UserAddressesComponent {
  constructor(private _addressService:AddressService,private _toaster:ToastrService){}
  userAddresses!:any
  ngOnInit(){
    this._addressService.getUserAddresses().subscribe({
      next:(res)=>{
        this.userAddresses=res.data;
        console.log(this.userAddresses)
      }
    })
  };
  removeAddress(id:string){
    this._addressService.removeAddress(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.userAddresses=res.data
        this._toaster.warning(res.message,'FreshCart',{closeButton:true})
      }
    })
  }
}
