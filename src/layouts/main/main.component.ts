import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { NavMainComponent } from "../../components/nav-main/nav-main.component";
import { CategoriesComponent } from "../../components/categories/categories.component";
import { ProductsComponent } from "../../components/products/products.component";
import { BrandsComponent } from "../../components/brands/brands.component";
import { HomeComponent } from "../../components/home/home.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet,NavMainComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
