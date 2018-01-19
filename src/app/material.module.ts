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
  MatGridListModule
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
    MatSidenavModule,
    MatGridListModule
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
    MatSidenavModule,
    MatGridListModule
  ]
})
export class MaterialModule { }
