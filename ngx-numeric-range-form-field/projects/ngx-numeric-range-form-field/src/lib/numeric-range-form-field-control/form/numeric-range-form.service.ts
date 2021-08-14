import { Injectable } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	FormControl,
	ValidatorFn
} from '@angular/forms';
import { INumericRange } from '../model/numeric-range-field.model';
import { numericRangeValues } from './numeric-range.validator';

@Injectable()
export class NumericRangeFormService {
	private formGroup!: FormGroup;

	constructor() {
		this.formGroup = new FormGroup(
			{
				minimum: new FormControl(null),
				maximum: new FormControl(null)
			},
			{ validators: numericRangeValues }
		);
	}

	get minimumControl(): FormControl {
		return this.formGroup.get('minimum') as FormControl;
	}

	get maximumControl(): FormControl {
		return this.formGroup.get('maximum') as FormControl;
	}

	get fieldFormGroup(): FormGroup {
		return this.formGroup;
	}

	public setValue(value: INumericRange, emitEvent?: boolean): void {
		this.formGroup.setValue(value, {
			emitEvent
		});
	}

	public reset(): void {
		this.formGroup.reset();
	}
}
