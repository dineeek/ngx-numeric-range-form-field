import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NumericRangeFormFieldContainerComponent } from './numeric-range-form-field-container/numeric-range-form-field-container.component';
import { NumericRangeFormFieldControlComponent } from './numeric-range-form-field-control/numeric-range-form-field-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NumericRangeFormFieldContainerComponent,
    NumericRangeFormFieldControlComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [
    NumericRangeFormFieldContainerComponent,
    NumericRangeFormFieldControlComponent,
  ],
})
export class NgxNumericRangeFormFieldModule {}
