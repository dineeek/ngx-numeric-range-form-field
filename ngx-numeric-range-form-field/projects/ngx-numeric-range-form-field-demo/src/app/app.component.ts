import { Component, OnInit } from '@angular/core';
import {
	UntypedFormControl,
	UntypedFormGroup,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import {
	FloatLabelType,
	MatFormFieldAppearance,
} from '@angular/material/form-field';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { INumericRange } from 'projects/ngx-numeric-range-form-field/src/lib/form/model/numeric-range-field.model';
import { combineLatest, merge, Subject, zip } from 'rxjs';
import { startWith, withLatestFrom } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	form: UntypedFormGroup;

	dynamicSyncValidators = new Subject<ValidatorFn | ValidatorFn[]>();

	readonly = false;
	minReadonly = false;
	maxReadonly = false;
	disabled = false;
	resettable = false;

	constructor() {
		this.form = new UntypedFormGroup({
			range: new UntypedFormControl(
				{
					minimum: 10,
					maximum: 100,
				} as INumericRange,
				[Validators.min(10), Validators.max(100)]
			),
			minimumOption: new UntypedFormControl(10, { updateOn: 'blur' }),
			maximumOption: new UntypedFormControl(100, { updateOn: 'blur' }),
		});
	}

	get rangeControl(): UntypedFormControl {
		return this.form.get('range') as UntypedFormControl;
	}

	get minimumOptionControl(): UntypedFormControl {
		return this.form.get('minimumOption') as UntypedFormControl;
	}

	get maximumOptionControl(): UntypedFormControl {
		return this.form.get('maximumOption') as UntypedFormControl;
	}

	ngOnInit(): void {
		this.listenValidationOptionsChange();
	}

	onBlur(): void {
		console.log('Value', this.rangeControl.value);
	}

	onEnter(): void {
		console.log('Enter pressed!');
	}

	onValueChange(value: INumericRange): void {
		console.log(
			'Changed value: ',
			value,
			this.rangeControl.hasError('notValidRange')
		);
		console.log('RANGE CONTROL', this.rangeControl);
	}

	onRequiredChange(e: MatSlideToggleChange): void {
		if (e.checked) {
			this.dynamicSyncValidators.next([
				Validators.required,
				Validators.min(this.minimumOptionControl.value),
				Validators.max(this.maximumOptionControl.value),
			]);
		} else {
			this.dynamicSyncValidators.next([
				Validators.min(this.minimumOptionControl.value),
				Validators.max(this.maximumOptionControl.value),
			]);
		}

		this.form.updateValueAndValidity();
	}

	onDisabled(e: MatSlideToggleChange): void {
		e.checked ? this.rangeControl.disable() : this.rangeControl.enable();
	}

	private listenValidationOptionsChange(): void {
		merge(
			this.minimumOptionControl.valueChanges,
			this.maximumOptionControl.valueChanges
		).subscribe(() => {
			this.dynamicSyncValidators.next([
				Validators.min(this.minimumOptionControl.value),
				Validators.max(this.maximumOptionControl.value),
			]);

			this.form.updateValueAndValidity();
		});
	}
}
