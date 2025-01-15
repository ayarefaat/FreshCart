import { IBrands } from './../../core/interfaces/ibrands';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-specific-brand',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './specific-brand.component.html',
  styleUrl: './specific-brand.component.css'
})
export class SpecificBrandComponent {
  brandID!:any;
  brandData!:IBrands;
  constructor(private _activatedRoute:ActivatedRoute,private _brandsService:BrandsService){}
  ngOnInit(){
    this._activatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.brandID=params.get('id');
        console.log(this.brandID)
      }
    });
    this._brandsService.getSpecificBrand(this.brandID).subscribe({
      next:(res)=>{
        console.log(res);
        this.brandData=res.data;
      }
    })
  }
}
