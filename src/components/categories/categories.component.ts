import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';
import { LoaderComponent } from '../loader/loader.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [LoaderComponent,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  constructor(private _categoriesService:CategoriesService){}
  catSub!:Subscription;
  categoryData!:ICategory[];
  ngOnInit(){
    this.catSub=this._categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryData=res.data;
        console.log(this.categoryData)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  ngOnDestroy(){
    this.catSub.unsubscribe();
  }
}
