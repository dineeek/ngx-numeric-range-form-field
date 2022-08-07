import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxNumericRangeFormFieldModule } from 'projects/ngx-numeric-range-form-field/src/lib/ngx-numeric-range-form-field.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		NgxNumericRangeFormFieldModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
