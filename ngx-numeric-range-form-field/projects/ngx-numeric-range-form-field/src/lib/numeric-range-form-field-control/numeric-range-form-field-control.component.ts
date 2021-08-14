import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { NumericRangeFormService } from './form/numeric-range-form.service';
import { INumericRange } from './model/numeric-range-field.model';

@Component({
  selector: 'ngx-numeric-range-form-field-control',
  templateUrl: './numeric-range-form-field-control.component.html',
  styleUrls: ['./numeric-range-form-field-control.component.scss'],
  providers: [
    NumericRangeFormService,
    {
      provide: MatFormFieldControl,
      useExisting: NumericRangeFormFieldControlComponent,
    },
  ],
})
export class NumericRangeFormFieldControlComponent
  implements OnInit, MatFormFieldControl<INumericRange> {
  @Input() minPlaceholder: string;
  @Input() maxPlaceholder: string;
  @Input() readonly = false;

  constructor(public formService: NumericRangeFormService) {}
  value: INumericRange;
  stateChanges: Observable<void>;
  id: string;
  placeholder: string;
  ngControl: NgControl;
  focused: boolean;
  empty: boolean;
  shouldLabelFloat: boolean;
  required: boolean;
  disabled: boolean;
  errorState: boolean;
  controlType?: string;
  autofilled?: boolean;
  userAriaDescribedBy?: string;
  setDescribedByIds(ids: string[]): void {
    //throw new Error('Method not implemented.');
  }
  onContainerClick(event: MouseEvent): void {
    //throw new Error('Method not implemented.');
  }

  ngOnInit(): void {}

  get minimumControl(): FormControl {
    return this.formService.minimumControl;
  }

  get maximumControl(): FormControl {
    return this.formService.maximumControl;
  }
}
