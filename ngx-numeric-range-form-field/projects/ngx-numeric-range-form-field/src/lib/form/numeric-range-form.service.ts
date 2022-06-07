import { Injectable } from '@angular/core';
import {
	AsyncValidatorFn,
	FormControl,
	FormGroup,
	ValidatorFn
} from '@angular/forms';
import { numericRangeValues } from './numeric-range.validator';

@Injectable()
export class NumericRangeFormService {
	private form: FormGroup;

	constructor() {
		this.form = new FormGroup(
			{
				minimum: new FormControl(null, { updateOn: 'blur' }),
				maximum: new FormControl(null, { updateOn: 'blur' })
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

	setSyncValidators(validator: ValidatorFn): void {
		if (!validator) {
			return;
		}

		this.minimumControl.addValidators(validator); // sets the validators on child control
		this.maximumControl.addValidators(validator); // sets the validators on child control
		this.formGroup.updateValueAndValidity();
	}

	setAsyncValidators(asyncValidator: AsyncValidatorFn): void {
		if (!asyncValidator) {
			return;
		}

		this.minimumControl.addAsyncValidators(asyncValidator);
		this.maximumControl.addAsyncValidators(asyncValidator);
		this.formGroup.updateValueAndValidity();
	}
}
