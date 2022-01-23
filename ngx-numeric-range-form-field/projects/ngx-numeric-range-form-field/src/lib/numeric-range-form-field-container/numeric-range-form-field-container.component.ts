import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Host,
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
import {
	FloatLabelType,
	MatFormFieldAppearance
} from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NumericRangeFormService } from '../numeric-range-form-field-control/form/numeric-range-form.service';
import { INumericRange } from '../numeric-range-form-field-control/model/numeric-range-field.model';

@Component({
	selector: 'ngx-numeric-range-form-field-container',
	templateUrl: './numeric-range-form-field-container.component.html',
	styleUrls: ['./numeric-range-form-field-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [NumericRangeFormService]
})
export class NumericRangeFormFieldContainerComponent
	implements OnInit, OnDestroy, ControlValueAccessor, Validator {
	@Input() label: string;
	@Input() appearance: MatFormFieldAppearance = 'outline';
	@Input() floatLabel: FloatLabelType = 'always';
	@Input() minPlaceholder = 'From';
	@Input() maxPlaceholder = 'To';
	@Input() readonly = false;
	@Input() resettable = true;
	@Input() required: boolean;
	@Input() requiredErrorMessage = 'Field is required!';
	@Input() minimumErrorMessage = 'Minimum has been reached!';
	@Input() maximumErrorMessage = 'Maximum has exceeded!';
	@Input() invalidRangeErrorMessage = 'Inserted range is not valid!';

	@Output() blurred = new EventEmitter<void>();
	@Output() enterPressed = new EventEmitter<void>();
	@Output() numericRangeChanged = new EventEmitter<INumericRange>();

	formGroup: FormGroup = this.formService.formGroup;
	control = new FormControl();

	private unsubscribe$ = new Subject();

	onTouched = () => {};

	get minimumControl(): FormControl {
		return this.formService.minimumControl;
	}

	get maximumControl(): FormControl {
		return this.formService.maximumControl;
	}

	constructor(
		@Self() public controlDirective: NgControl,
		@Host() private formService: NumericRangeFormService,
		private readonly changeDetectorRef: ChangeDetectorRef
	) {
		this.controlDirective.valueAccessor = this;
	}

	ngOnInit(): void {
		const validator = this.controlDirective.control.validator;
		this.control.setValidators(validator);
		this.control.updateValueAndValidity();
		this.controlDirective.control.setValidators(this.validate.bind(this));
		this.changeDetectorRef.detectChanges();
	}

	writeValue(value: INumericRange): void {
		value === null
			? this.control.reset()
			: this.control.patchValue(value, {
					emitEvent: false
			  });
	}

	registerOnChange(fn: any): void {
		this.control.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(fn);
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.control.disable() : this.control.enable();
	}

	validate(control: AbstractControl) {
		if (this.control.valid) {
			return null;
		}

		return this.control.touched && this.control.dirty && this.control.errors;
	}

	onEnterPressed(): void {
		this.enterPressed.emit();
	}

	onBlur(): void {
		this.onTouched();
		this.blurred.emit();
	}

	onRangeValuesChanged(value: INumericRange): void {
		this.numericRangeChanged.emit(value);
	}

	onReset(): void {
		this.formService.reset();
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
