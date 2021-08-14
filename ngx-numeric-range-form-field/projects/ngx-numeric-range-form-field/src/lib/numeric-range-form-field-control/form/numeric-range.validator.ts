import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const numericRangeValues: ValidatorFn = (
	group: AbstractControl
): ValidationErrors | null => {
	const max = Number(group.get('maximum').value);
	const min = Number(group.get('minimum').value);
	if (max && min) {
		if (max < min) {
			return { notValidRange: true };
		}
	}
	return null;
};
