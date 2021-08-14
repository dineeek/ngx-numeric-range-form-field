import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class NumericRangeStateMatcher implements ErrorStateMatcher {
	isErrorState(
		control: FormControl | null,
		form: FormGroupDirective | NgForm | null
	): boolean {
		console.log(
			'ERROR STATE',
			form,
			control.dirty && control.touched && control.invalid
		);
		return control.dirty && control.invalid; //TODO
	}
}
