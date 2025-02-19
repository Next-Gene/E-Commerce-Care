import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { features } from 'process';
import { HomeComponent } from './features/pages/home/home.component';
import path from 'path';
import { NotFoundError } from 'rxjs';
import { AboutComponent } from './features/pages/about/about.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';

export const routes: Routes = [
    {path:'' , redirectTo:'home', pathMatch:'full'},

    {path:'home' , component:HomeComponent},
    {path:'about',component:AboutComponent},
    {path:'categories', component:CategoriesComponent},
        ];

    

