import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INumericRange } from 'projects/ngx-numeric-range-form-field/src/lib/form/model/numeric-range-field.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	form: FormGroup;

	constructor() {
		this.form = new FormGroup({
			range: new FormControl(10, [
				Validators.required,
				Validators.min(10),
				Validators.max(100),
			]),
		});
	}

	get rangeControl(): FormControl {
		return this.form.get('range') as FormControl;
	}

	onBlur(): void {
		console.log('Value', this.rangeControl.value);
	}

	onEnter(): void {
		console.log('Enter pressed!');
		this.rangeControl.disable();
	}

	onValueChange(value: INumericRange): void {
		console.log(
			'Changed value: ',
			value,
			this.rangeControl.hasError('notValidRange')
		);

		//this.rangeControl.updateValueAndValidity();
		console.log('RANGE CONTROL', this.rangeControl);
	}
}
