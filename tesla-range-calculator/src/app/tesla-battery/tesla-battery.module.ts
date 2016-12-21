import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeslaBatteryComponent } from './containers/tesla-battery.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [TeslaBatteryComponent],
  exports: [TeslaBatteryComponent]
})
export class TeslaBatteryModule { }
