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
		if (form instanceof FormGroup && !control.parent) {
			return form.dirty && form.invalid;
		}

		return control.dirty && control.invalid;
	}
}
