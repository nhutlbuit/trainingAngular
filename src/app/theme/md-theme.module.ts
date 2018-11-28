import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const NG_MAT_MODULES = [
  MatCardModule,
  MatExpansionModule,
  MatListModule,
  MatToolbarModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatGridListModule
];

/**
 * This module is for modularization of
 * Material modules in CRM application
 */
@NgModule({
  imports: [
    ...NG_MAT_MODULES
  ],
  exports: [
    ...NG_MAT_MODULES
  ]
})

export class MdThemeModule { }
