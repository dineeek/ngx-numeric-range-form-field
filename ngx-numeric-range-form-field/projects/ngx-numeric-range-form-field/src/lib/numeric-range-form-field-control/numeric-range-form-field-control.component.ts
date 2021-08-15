import {
	Component,
	EventEmitter,
	HostBinding,
	Inject,
	Input,
	OnDestroy,
	OnInit,
	Optional,
	Output,
	Self
} from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	FormControl,
	FormGroup,
	NgControl,
	NG_VALIDATORS,
	Validator
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
	MatFormFieldAppearance,
	MatFormFieldControl
} from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { NumericRangeFormService } from './form/numeric-range-form.service';
import { NumericRangeStateMatcher } from './form/numeric-range-state-matcher';
import { INumericRange } from './model/numeric-range-field.model';

@Component({
	selector: 'ngx-numeric-range-form-field-control',
	templateUrl: './numeric-range-form-field-control.component.html',
	styleUrls: ['./numeric-range-form-field-control.component.scss'],
	providers: [
		{
			provide: MatFormFieldControl,
			useExisting: NumericRangeFormFieldControlComponent
		},
		{
			provide: ErrorStateMatcher,
			useClass: NumericRangeStateMatcher
		}
	]
})
export class NumericRangeFormFieldControlComponent
	implements
		OnInit,
		OnDestroy,
		MatFormFieldControl<INumericRange>,
		ControlValueAccessor,
		Validator {
	@Input() form: FormGroup;
	@Input() minPlaceholder: string;
	@Input() maxPlaceholder: string;
	@Input() readonly = false;

	@Output() blurred = new EventEmitter<void>();
	@Output() enterPressed = new EventEmitter<void>();
	@Output() numericRangeChanged = new EventEmitter<INumericRange>();

	@Input()
	set value(val: INumericRange) {
		this.form.patchValue(val);
		this.stateChanges.next();
	}
	@Input() set placeholder(value: string) {
		this._placeholder = value;
		this.stateChanges.next();
	}
	@Input() set appearance(value: MatFormFieldAppearance) {
		this._appearance = value;
		this.stateChanges.next();
	}
	@Input() required: boolean;
	@Input() disabled: boolean;
	@Input() errorStateMatcher: ErrorStateMatcher;
	@Input() autofilled?: boolean;

	@HostBinding('attr.aria-describedby')
	userAriaDescribedBy = '';

	@HostBinding('class.floated')
	get shouldLabelFloat(): boolean {
		return true;
	}

	@HostBinding()
	id = `numeric-range-form-control-id-${NumericRangeFormFieldControlComponent.nextId++}`;

	get value() {
		return this.form.value;
	}

	get placeholder(): string {
		return this._placeholder;
	}

	get appearance(): MatFormFieldAppearance {
		return this._appearance;
	}

	get empty(): boolean {
		return !this.value.minimum && !this.value.maximum;
	}

	get errorState() {
		const matcher = this.errorStateMatcher || this.defaultErrorMatcher;
		return matcher.isErrorState(this.ngControl.control as FormControl, null);
	}

	get minimumControl(): FormControl {
		return this.formService.minimumControl;
	}

	get maximumControl(): FormControl {
		return this.formService.maximumControl;
	}

	stateChanges = new Subject<void>();

	focused = false;

	controlType = 'custom-vehicle-code-control';

	static nextId = 0;

	private unsubscribe$ = new Subject<void>();

	private _placeholder: string;

	private _appearance: MatFormFieldAppearance = 'standard';

	onChange: (value: INumericRange) => void;
	onTouch: () => void;

	constructor(
		public formService: NumericRangeFormService,
		@Optional() @Self() public ngControl: NgControl,
		private defaultErrorMatcher: ErrorStateMatcher,
		@Optional() @Self() @Inject(NG_VALIDATORS) validators: any[]
	) {
		if (ngControl !== null) {
			this.ngControl.valueAccessor = this;
		}
	}

	ngOnInit(): void {
		const validator = this.ngControl.control.validator;
		this.minimumControl.setValidators(validator);
		this.maximumControl.setValidators(validator);
		this.form.updateValueAndValidity();
		this.ngControl.control.setValidators(this.validate.bind(this));
	}

	writeValue(value: INumericRange): void {
		value === null
			? this.form.reset()
			: this.form.patchValue(value, {
					emitEvent: false
			  });
	}

	registerOnChange(fn: any): void {
		this.form.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(fn);
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
		if (isDisabled) {
			this.form.disable();
		} else {
			this.form.enable();
		}
		this.stateChanges.next();
	}

	setDescribedByIds(ids: string[]): void {
		this.userAriaDescribedBy = ids.join(' ');
	}

	onContainerClick(event: MouseEvent): void {}

	validate(control: AbstractControl) {
		if (this.form.valid) {
			return null;
		}

		let errors: any = {};
		errors = this.addControlErrors(errors, 'minimum');
		errors = this.addControlErrors(errors, 'maximum');

		return errors;
	}

	addControlErrors(allErrors: any, controlName: string) {
		const errors = { ...allErrors };
		const controlErrors = this.form.controls[controlName].errors;
		if (controlErrors) {
			errors[controlName] = controlErrors;
		}
		return errors;
	}

	onEnterPressed(): void {
		if (
			!this.form.errors &&
			!this.minimumControl.errors &&
			!this.maximumControl.errors
		) {
			this.enterPressed.emit();
		}
	}

	onBlur(): void {
		this.blurred.emit();
	}

	onRangeValuesChanged(): void {
		this.form.errors || this.minimumControl.errors || this.maximumControl.errors
			? this.numericRangeChanged.emit(null)
			: this.numericRangeChanged.emit(this.form.value);
	}

	onReset(): void {
		this.formService.reset();
	}

	ngOnDestroy(): void {
		this.stateChanges.complete();
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
