import {
	ChangeDetectionStrategy,
	Component,
	DoCheck,
	EventEmitter,
	HostBinding,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	Self,
	SimpleChanges,
	SkipSelf
} from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	FormControl,
	NgControl,
	Validator,
	ValidatorFn
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
	INumericRange,
	NumericRangeFormGroup
} from '../form/model/numeric-range-field.model';
import { NumericRangeFormService } from '../form/numeric-range-form.service';
import { NumericRangeStateMatcher } from '../form/numeric-range-state-matcher';

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
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumericRangeFormFieldControlComponent
	implements
		OnChanges,
		OnInit,
		DoCheck,
		OnDestroy,
		MatFormFieldControl<INumericRange>,
		ControlValueAccessor,
		Validator
{
	static nextId = 0;

	get value() {
		return this.formGroup.getRawValue();
	}

	@Input()
	set value(value: INumericRange) {
		this.formGroup.patchValue(value);
		this.stateChanges.next();
	}

	get placeholder(): string {
		return this._placeholder;
	}

	@Input() set placeholder(value: string) {
		this._placeholder = value;
		this.stateChanges.next();
	}

	@Input() minPlaceholder: string;
	@Input() maxPlaceholder: string;
	@Input() readonly = false;
	@Input() minReadonly = false;
	@Input() maxReadonly = false;
	@Input() required: boolean;
	@Input() disabled: boolean;
	@Input() errorStateMatcher: ErrorStateMatcher;
	@Input() autofilled?: boolean;
	@Input() dynamicSyncValidators: ValidatorFn | ValidatorFn[];

	@Output() blurred = new EventEmitter<void>();
	@Output() enterPressed = new EventEmitter<void>();
	@Output() numericRangeChanged = new EventEmitter<INumericRange>();

	@HostBinding('class.floated')
	get shouldLabelFloat(): boolean {
		return true;
	}

	@HostBinding('attr.aria-describedby')
	userAriaDescribedBy = '';

	@HostBinding()
	id = `numeric-range-form-control-id-${NumericRangeFormFieldControlComponent.nextId++}`;

	get empty(): boolean {
		return !this.value.minimum && !this.value.maximum;
	}

	get errorState() {
		return this.numericRangeErrorMatcher.isErrorState(
			this.ngControl.control as FormControl,
			this.formGroup
		);
	}

	get minimumControl(): FormControl<number> {
		return this.formService.minimumControl;
	}

	get maximumControl(): FormControl<number> {
		return this.formService.maximumControl;
	}

	formGroup: NumericRangeFormGroup = this.formService.formGroup;

	stateChanges = new Subject<void>();

	focused = false;

	controlType = 'numeric-range-form-control';

	numericRangeErrorMatcher = new NumericRangeStateMatcher();

	private unsubscribe$ = new Subject<void>();

	private _placeholder: string;

	onTouched = () => {};

	constructor(
		@Self() public ngControl: NgControl,
		@SkipSelf() private formService: NumericRangeFormService
	) {
		this.ngControl.valueAccessor = this;
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.dynamicSyncValidators) {
			this.formService.setDynamicValidators(this.dynamicSyncValidators);
		}
	}

	ngOnInit(): void {
		this.formService.setSyncValidators(this.ngControl.control.validator);
		this.formService.setAsyncValidators(this.ngControl.control.asyncValidator);

		this.ngControl.control.setValidators([this.validate.bind(this)]);
		this.ngControl.control.updateValueAndValidity({ emitEvent: false });
	}

	ngDoCheck(): void {
		this.formGroup.markAllAsTouched();
	}

	ngOnDestroy(): void {
		this.stateChanges.complete();
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	writeValue(value: INumericRange): void {
		value === null
			? this.formGroup.reset()
			: this.formGroup.setValue(value, { emitEvent: false });
	}

	registerOnChange(fn: any): void {
		this.formGroup.valueChanges
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(fn);
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
		isDisabled ? this.formGroup.disable() : this.formGroup.enable();

		this.stateChanges.next();
	}

	setDescribedByIds(ids: string[]): void {
		this.userAriaDescribedBy = ids.join(' ');
	}

	onContainerClick(event: MouseEvent): void {}

	validate(control: AbstractControl) {
		return control.errors;
	}

	onEnterPressed(): void {
		if (
			!this.formGroup.errors &&
			!this.minimumControl.errors &&
			!this.maximumControl.errors
		) {
			this.enterPressed.emit();
		}
	}

	onBlur(): void {
		this.onTouched();
		this.blurred.emit();
	}

	onRangeValuesChanged(): void {
		this.formGroup.errors ||
		this.minimumControl.errors ||
		this.maximumControl.errors
			? this.numericRangeChanged.emit(null)
			: this.numericRangeChanged.emit(this.formGroup.getRawValue());
	}
}
