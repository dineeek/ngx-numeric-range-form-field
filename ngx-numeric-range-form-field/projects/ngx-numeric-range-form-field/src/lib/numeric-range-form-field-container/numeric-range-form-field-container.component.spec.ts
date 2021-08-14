import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericRangeFormFieldContainerComponent } from './numeric-range-form-field-container.component';

describe('NumericRangeFormFieldContainerComponent', () => {
  let component: NumericRangeFormFieldContainerComponent;
  let fixture: ComponentFixture<NumericRangeFormFieldContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumericRangeFormFieldContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericRangeFormFieldContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
