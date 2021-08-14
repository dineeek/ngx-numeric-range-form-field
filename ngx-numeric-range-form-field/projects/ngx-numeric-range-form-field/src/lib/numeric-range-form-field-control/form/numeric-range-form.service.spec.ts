import { TestBed } from '@angular/core/testing';

import { NumericRangeFormService } from './numeric-range-form.service';

describe('NumericRangeFormService', () => {
	let service: NumericRangeFormService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(NumericRangeFormService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
