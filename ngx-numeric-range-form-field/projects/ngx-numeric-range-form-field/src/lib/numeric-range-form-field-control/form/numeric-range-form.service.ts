import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { INumericRange } from '../model/numeric-range-field.model';
import { numericRangeValues } from './numeric-range.validator';

@Injectable()
export class NumericRangeFormService {
	private form: FormGroup;

	constructor() {
		this.form = new FormGroup(
			{
				minimum: new FormControl(null),
				maximum: new FormControl(null)
			},
			{ validators: numericRangeValues }
		);
	}

	get minimumControl(): FormControl {
		return this.form.get('minimum') as FormControl;
	}

	get maximumControl(): FormControl {
		return this.form.get('maximum') as FormControl;
	}

	get formGroup(): FormGroup {
		return this.form;
	}

	public setValue(value: INumericRange, emitEvent?: boolean): void {
		this.form.setValue(value, {
			emitEvent
		});
	}

	public reset(): void {
		this.form.reset();
	}
}
