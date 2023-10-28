import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { NgxNumericRangeFormFieldModule } from 'projects/ngx-numeric-range-form-field/src/lib/ngx-numeric-range-form-field.module';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';

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
		MatSlideToggleModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
