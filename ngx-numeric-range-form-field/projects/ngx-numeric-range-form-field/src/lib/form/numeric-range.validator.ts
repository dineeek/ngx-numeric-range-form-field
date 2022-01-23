import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const numericRangeValues: ValidatorFn = (
	group: AbstractControl
): ValidationErrors | null => {
	const max = group.get('maximum').value
		? Number(group.get('maximum').value)
		: null;
	const min = group.get('minimum').value
		? Number(group.get('minimum').value)
		: null;

	if (max !== null && min !== null) {
		if (max < min) {
			return { notValidRange: true };
		}
	}
	return null;
};
