import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { NumericRangeFormFieldContainerComponent } from './container/numeric-range-form-field-container.component';
import { NumericRangeFormFieldControlComponent } from './control/numeric-range-form-field-control.component';

@NgModule({
	declarations: [
		NumericRangeFormFieldContainerComponent,
		NumericRangeFormFieldControlComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule
	],
	exports: [NumericRangeFormFieldContainerComponent]
})
export class NgxNumericRangeFormFieldModule {}
