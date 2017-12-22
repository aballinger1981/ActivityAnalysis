import { NgModule } from '@angular/core';

import {
  MatTableModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatPaginatorModule,
  MatInputModule,
  MatSortModule,
  MatSidenavModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatSidenavModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatSidenavModule
  ]
})
export class MaterialModule { }
