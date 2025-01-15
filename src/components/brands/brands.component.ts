import { Component } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { IBrands } from '../../core/interfaces/ibrands';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  constructor(private _brandsService:BrandsService){}
  brandsSub!:Subscription;
  brandsData!:IBrands[]
  ngOnInit(){
    this.brandsSub=this._brandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brandsData=res.data;
        console.log(this.brandsData)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  ngOnDestroy(){
    this.brandsSub.unsubscribe();
  }
}
