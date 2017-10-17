import { NgModule } from '@angular/core';

import {
  MatTableModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ]
})
export class MaterialModule { }
