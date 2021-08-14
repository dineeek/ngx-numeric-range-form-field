import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { INumericRange } from '../numeric-range-form-field-control/model/numeric-range-field.model';

@Component({
  selector: 'ngx-numeric-range-form-field-container',
  templateUrl: './numeric-range-form-field-container.component.html',
  styleUrls: ['./numeric-range-form-field-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumericRangeFormFieldContainerComponent
  implements OnInit, DoCheck, OnDestroy, ControlValueAccessor, Validator {
  @Input() label: string | undefined;
  @Input() minPlaceholder = 'From';
  @Input() maxPlaceholder = 'To';
  @Input() readonly = false;
  @Input() resettable = true;

  @Output() blurred = new EventEmitter<void>();
  @Output() enterPressed = new EventEmitter<void>();
  @Output() numericRangeChanged = new EventEmitter<INumericRange>();

  control: FormControl;
  disabled: boolean;

  private unsubscribe$ = new Subject();

  onChange = () => {};
  onTouched = () => {};

  constructor(
    @Self() public controlDirective: NgControl,
    @Optional() @Self() @Inject(NG_VALIDATORS) validators: any[]
  ) {
    this.controlDirective.valueAccessor = this;
    this.control = new FormControl();
  }

  ngOnInit(): void {
    const validator = this.controlDirective.control.validator;
    this.control.setValidators(validator);
    this.control.updateValueAndValidity();
    this.controlDirective.control.setValidators(this.validate.bind(this));
  }

  ngDoCheck(): void {
    if (this.controlDirective.touched) {
      this.control.markAsTouched();
    }
  }

  writeValue(value: any): void {
    value === null
      ? this.control.reset()
      : this.control.patchValue(value, {
          emitEvent: false,
        });
  }

  registerOnChange(fn: any): void {
    this.control.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;

    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  validate(control: AbstractControl) {
    if (this.control.valid) {
      return null;
    }
    return this.control.touched && this.control.dirty && this.control.errors;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
