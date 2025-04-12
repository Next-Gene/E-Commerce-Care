import { Component } from '@angular/core';
import { CategoriesService } from '../../../core/service/categories.service';
import { Category } from '../../../core/interfaces/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
   Categories: Category[] = [];
  constructor(private _CategoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getallCategories();
  }
  getallCategories() {
    this._CategoriesService.getAllCategories().subscribe(data => {
      this.Categories = data;
    });

  }
}
