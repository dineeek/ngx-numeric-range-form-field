import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericRangeFormFieldControlComponent } from './numeric-range-form-field-control.component';

describe('NumericRangeFormFieldControlComponent', () => {
	let component: NumericRangeFormFieldControlComponent;
	let fixture: ComponentFixture<NumericRangeFormFieldControlComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NumericRangeFormFieldControlComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NumericRangeFormFieldControlComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
