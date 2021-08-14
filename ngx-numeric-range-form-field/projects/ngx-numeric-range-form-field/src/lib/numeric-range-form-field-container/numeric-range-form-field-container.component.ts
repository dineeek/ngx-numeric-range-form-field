import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { INumericRange } from '../numeric-range-form-field-control/model/numeric-range-field.model';

@Component({
  selector: 'ngx-numeric-range-form-field-container',
  templateUrl: './numeric-range-form-field-container.component.html',
  styleUrls: ['./numeric-range-form-field-container.component.scss'],
})
export class NumericRangeFormFieldContainerComponent
  implements OnInit, ControlValueAccessor {
  @Input() label: string | undefined;
  @Input() minPlaceholder = 'From';
  @Input() maxPlaceholder = 'To';
  @Input() readonly = false;
  @Input() resettable = true;

  @Output() blurred = new EventEmitter<void>();
  @Output() enterPressed = new EventEmitter<void>();
  @Output() numericRangeChanged = new EventEmitter<INumericRange>();

  constructor(@Self() public controlDirective: NgControl) {
    controlDirective.valueAccessor = this;
  }

  ngOnInit(): void {}

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
