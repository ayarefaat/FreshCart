import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { LoaderComponent } from "../loader/loader.component";
import { ISubCategories } from '../../core/interfaces/isub-categories';

@Component({
  selector: 'app-sub-categories',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.css'
})
export class SubCategoriesComponent {
  subCategoriesID!:any;
  categoryName!:any;
  subCategoriesData!:ISubCategories[]
  constructor(private _activatedRoute:ActivatedRoute,private _categoriesService:CategoriesService){}
  ngOnInit(){
    this._activatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.subCategoriesID=params.get("id");
        this.categoryName=params.get('name');
        console.log(params.get('name'));
      }
    });

    this._categoriesService.getSubCategoriesOnCategory(this.subCategoriesID).subscribe({
      next:(res)=>{
        this.subCategoriesData=res.data
        console.log(this.subCategoriesData);
      },error:(err)=>{
        console.log(err)
      }
    })
  }
}
