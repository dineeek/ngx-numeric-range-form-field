# ngx-numeric-range-form-field

An Angular Material UI numeric range input form field. It is based on custom form field control and control value accessor which allows inserting range numbers, minimum and maximum.

![Numeric range form field](https://github.com/dineeek/ngx-numeric-range-form-field/blob/main/ngx-numeric-range-form-field/Numeric%20Range%20Form%20Field.png)

<p align="start">
    <a href="https://www.npmjs.com/package/ngx-numeric-range-form-field"><img alt="weekly downloads from npm" src="https://img.shields.io/npm/dw/ngx-numeric-range-form-field.svg?style=flat-square"></a>
    <a href="https://www.npmjs.com/package/ngx-numeric-range-form-field"><img alt="npm version" src="https://img.shields.io/npm/v/ngx-numeric-range-form-field.svg?style=flat-square"></a>
</p>

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdineeek%2Fngx-numeric-range-form-field.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdineeek%2Fngx-numeric-range-form-field?ref=badge_shield)

# Feature

- Two inputs as one field.
- Auto range validation.
- Supports reactive forms.

**[View live demo on StackBlitz.](https://ngx-numeric-range-form-field.stackblitz.io)**

# Install

```shell
npm install ngx-numeric-range-form-field
```

# Usage

In component HTML:

```html
<ngx-numeric-range-form-field
	[formControl]="rangeControl"
	label="Numeric range"
	(blurred)="onBlur()"
	(enterPressed)="onEnter()"
	(numericRangeChanged)="onValueChange($event)"
></ngx-numeric-range-form-field>
```

In component.ts:

```typescript
form: FormGroup;

	constructor() {
		this.form = new FormGroup({
			range: new FormControl({
					minimum: 10,
					maximum: 100,
				}, [
				Validators.required, //optional
				Validators.min(10), //optional
				Validators.max(100), //optional
			]),
		});
	}

	get rangeControl(): FormControl {
		return this.form.get('range') as FormControl;
	}

	onBlur(): void {
		console.log('Value', this.rangeControl.value);
	}

	onEnter(): void {
		console.log('Enter pressed!');
	}

	onValueChange(value: INumericRange): void {
		console.log('Changed value: ', value);
	}
```

Customizable input and output decorators:

```typescript
@Input() label: string; // Label of the control
@Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'outline';
@Input() floatLabel: 'always' | 'never' | 'auto' = 'always';
@Input() minPlaceholder = 'From'; // Placeholder of the minimum value control
@Input() maxPlaceholder = 'To'; // Placeholder of the maximum value control
@Input() readonly = false; // Flag for readonly both controls
@Input() minReadonly = false; // Flag for readonly minimum control
@Input() maxReadonly = false; // Flag for readonly maximum control
@Input() resettable = true; // Flag for resetting controls value
@Input() requiredErrorMessage = 'Field is required!'; // Customizable error message when field is required
@Input() minimumErrorMessage = 'Minimum has been reached!'; // Customizable error message when field has min validation
@Input() maximumErrorMessage = 'Maximum has exceeded!'; // Customizable error message when field has max validation
@Input() invalidRangeErrorMessage = 'Inserted range is not valid!'; // Customizable error message when field has invalid numeric range
@Input() dynamicSyncValidators: ValidatorFn | ValidatorFn[]; // Dynamic change of sync validators

@Output() blurred = new EventEmitter<void>(); // Event which emits where user leaves control (focus out)
@Output() enterPressed = new EventEmitter<void>(); // Event which emits when enter is pressed
@Output() numericRangeChanged = new EventEmitter<INumericRange>(); // Event which emits when one of range value is changed
```

It is based on following interface:

```typescript
export interface INumericRange {
	minimum: number;
	maximum: number;
}
```

# License

Apache License

Copyright (c) 2022 Dino Klicek
