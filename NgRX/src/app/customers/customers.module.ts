import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


import { Routes, RouterModule } from '@angular/router';
import { CustomersPageComponent } from './components/customers-page/customers-page.component';

import { StoreModule } from '@ngrx/store';
import { customerReducer } from './state/customer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffect } from './state/customer.effects';

import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

const Routes = [
  { path: '', component: CustomersPageComponent }
]

@NgModule({
  declarations: [CustomerComponent, CustomerAddComponent, CustomerEditComponent, CustomerListComponent, CustomersPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    StoreModule.forFeature("customers", customerReducer),
    EffectsModule.forFeature([CustomerEffect]),
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule
  ]
})
export class CustomersModule { }
