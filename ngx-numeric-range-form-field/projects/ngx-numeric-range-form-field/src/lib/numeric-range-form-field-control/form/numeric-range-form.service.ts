import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { INumericRange } from '../model/numeric-range-field.model';

@Injectable()
export class NumericRangeFormService {
  private formGroup!: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      minimum: new FormControl(null),
      maximum: new FormControl(null),
    });
  }

  public get minimumControl(): FormControl {
    return this.formGroup.get('minimum') as FormControl;
  }

  public get maximumControl(): FormControl {
    return this.formGroup.get('maximum') as FormControl;
  }

  public setValue(value: INumericRange, emitEvent?: boolean): void {
    this.formGroup.setValue(value, {
      emitEvent,
    });
  }

  public reset(): void {
    this.formGroup.reset();
  }
}
