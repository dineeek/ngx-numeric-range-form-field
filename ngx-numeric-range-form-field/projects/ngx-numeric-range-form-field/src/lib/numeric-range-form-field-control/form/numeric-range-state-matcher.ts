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
		form: FormGroupDirective | NgForm | null
	): boolean {
		if (!control.parent) {
			return control.dirty && control.invalid;
		}

		return control.dirty && control.invalid;
	}
}
