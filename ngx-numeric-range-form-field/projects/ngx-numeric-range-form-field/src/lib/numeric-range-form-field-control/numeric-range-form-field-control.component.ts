import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NumericRangeFormService } from './form/numeric-range-form.service';

@Component({
  selector: 'ngx-numeric-range-form-field-control',
  templateUrl: './numeric-range-form-field-control.component.html',
  styleUrls: ['./numeric-range-form-field-control.component.scss'],
  providers: [NumericRangeFormService],
})
export class NumericRangeFormFieldControlComponent implements OnInit {
  @Input() minPlaceholder!: string;
  @Input() maxPlaceholder!: string;
  @Input() readonly = false;

  constructor(public formService: NumericRangeFormService) {}

  ngOnInit(): void {}

  get minimumControl(): FormControl {
    return this.formService.minimumControl;
  }

  get maximumControl(): FormControl {
    return this.formService.maximumControl;
  }
}
