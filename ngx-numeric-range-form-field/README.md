# ngx-numeric-range-form-field

An Angular Material UI numeric range input form field. Implementation is based on custom form field and control value accessor which allows inserting range numbers - minimum and maximum.

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
- Reactive form field.
- Auto range validation & custom validation.

**[View live demo on StackBlitz.](https://ngx-numeric-range-form-field.stackblitz.io)**

# Install

```shell
npm install ngx-numeric-range-form-field
```

# Usage

Template:

```html
<form [formGroup]="form">
	<ngx-numeric-range-form-field
		formControlName="range"
		label="Numeric range"
		(blurred)="onBlur()"
		(enterPressed)="onEnter()"
		(numericRangeChanged)="onNumericRangeChanged($event)"
	></ngx-numeric-range-form-field>
</form>
```

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

	onBlur(): void {
		console.log('Value', this.rangeControl.value);
	}

	onEnter(): void {
		console.log('Enter pressed!');
	}

	onNumericRangeChanged(value: INumericRange): void {
		console.log('Changed value: ', value);
	}
```

It is based on following type:

```typescript
type INumericRange = {
	minimum: number;
	maximum: number;
};
```

### Input property decorators:

- #### label

  Set label of the field.

- #### appearance

  Set MatFormFieldAppearance.

- #### floatLabel

  Set FloatLabelType.

- #### minPlaceholder & maxPlaceholder

  Set placeholder of the minimum value control. Defaulted to 'From'.
  Set placeholder of the maximum value control. Defaulted to 'To'.

- #### readonly

  Set field value as readonly.

- #### minReadonly & maxReadonly

  Set flag for separated readonly value.

- #### resettable

  Set showing icon for resetting value in field.

- #### requiredErrorMessage

  Set error message on required validation.

- #### minimumErrorMessage & maximumErrorMessage

  Set error message on min & max value validation.

- #### maximumErrorMessage

  Set error message on min value validation.

- #### invalidRangeErrorMessage

  Set error message on invalid numeric range.

- #### dynamicSyncValidators

  Set sync validators on runtime.

### Output property decorators:

- #### blurred

  Emit on blur out.

- #### enterPressed

  Emit on enter press.

- #### numericRangeChanged

  Emit on value change.

# Contributing

Contributions are more than welcome!

# License

MIT License

Copyright (c) 2022 Dino Klicek
