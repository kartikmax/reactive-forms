import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-rea-forms',
  templateUrl: './rea-forms.component.html',
  styleUrls: ['./rea-forms.component.css'],
})
export class ReaFormsComponent {
  form: FormGroup;
  output: string = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      destination: ['', [Validators.required, this.noWhitespaceValidator]],
    });
  }

  onSubmit() {
    // Clear previous error messages
    this.form.get('fromDate')?.setErrors(null);
    this.form.get('toDate')?.setErrors(null);
    this.form.get('destination')?.setErrors(null);
  
    // Check for empty fields and set errors accordingly
    if (this.form.get('fromDate')?.value === '') {
      this.form.get('fromDate')?.setErrors({ required: true });
    }
    if (this.form.get('toDate')?.value === '') {
      this.form.get('toDate')?.setErrors({ required: true });
    }
    if (this.form.get('destination')?.value === '') {
      this.form.get('destination')?.setErrors({ required: true });
    }
  
    if (this.form.valid) {
      const fromDate = this.form.get('fromDate')?.value;
      const toDate = this.form.get('toDate')?.value;
  
      if (fromDate > toDate) {
        this.form.get('toDate')?.setErrors({ dateRangeError: true });
      } else {
        // Format dates to 'MM/DD/YYYY'
        const formattedFromDate = formatDate(fromDate, 'MM/dd/yyyy', 'en-US');
        const formattedToDate = formatDate(toDate, 'MM/dd/yyyy', 'en-US');
  
        this.output = `From Date: ${formattedFromDate}, To Date: ${formattedToDate}, Destination: ${
          this.form.get('destination')?.value
        }`;
  
        // Log formatted dates in the console
        console.log('From Date (formatted):', formattedFromDate);
        console.log('To Date (formatted):', formattedToDate);
      }
    }
  }
  

  noWhitespaceValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }
}
