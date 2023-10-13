import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-rea-forms',
  templateUrl: './rea-forms.component.html',
  styleUrls: ['./rea-forms.component.css']
})
export class ReaFormsComponent {

  form: FormGroup;
  output: string = '';
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      destination: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const fromDateControl = this.form.get('fromDate');
    const toDateControl = this.form.get('toDate');
    const destinationControl = this.form.get('destination');
  
    if (fromDateControl && toDateControl && fromDateControl.valid && toDateControl.valid && destinationControl?.valid) {
      const fromDate = fromDateControl.value;
      const toDate = toDateControl.value;
  
      if (fromDate > toDate) {
        fromDateControl.setErrors({ dateRangeError: true });
      } else {
        // Perform your desired action with the form values
        console.log('From Date:', fromDate);
        console.log('To Date:', toDate);
        console.log('Destination:', destinationControl.value);
      }
    }

    if (this.form.valid) {
      const fromDate = this.form.get('fromDate')?.value;
      const toDate = this.form.get('toDate')?.value;

      // Format dates to 'MM/DD/YYYY'
      const formattedFromDate = formatDate(fromDate, 'MM/dd/yyyy', 'en-US');
      const formattedToDate = formatDate(toDate, 'MM/dd/yyyy', 'en-US');
  
      this.output = `From Date: ${formattedFromDate}, To Date: ${formattedToDate}, Destination: ${destinationControl?.value}`;
      
      // Log formatted dates in the console
      console.log('From Date (formatted):', formattedFromDate);
      console.log('To Date (formatted):', formattedToDate);
    }
  }
}
