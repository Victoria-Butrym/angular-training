import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { Routes, RouterModule } from '@angular/router';

const Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    MatCardModule,
    MatDividerModule,
    MatButtonModule
  ]
})
export class HomeModule { }
