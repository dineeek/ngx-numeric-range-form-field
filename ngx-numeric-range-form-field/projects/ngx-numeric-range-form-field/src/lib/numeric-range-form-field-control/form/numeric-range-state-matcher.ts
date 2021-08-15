import {
	FormControl,
	FormGroup,
	FormGroupDirective,
	NgForm
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class NumericRangeStateMatcher implements ErrorStateMatcher {
	isErrorState(
		control: FormControl | null,
		form: FormGroup | FormGroupDirective | NgForm | null
	): boolean {
		if (!control.parent && form instanceof FormGroup) {
			return (
				form.touched &&
				form.get('minimum').dirty &&
				form.get('maximum').dirty &&
				form.invalid
			);
		}

		return control.touched && control.dirty && control.invalid;
	}
}
