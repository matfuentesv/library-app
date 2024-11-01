import {Component, EventEmitter, Input, Output, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Book} from '../../../../core/models/book.model';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';


@Component({
  selector: 'app-book-form-edit',
  templateUrl: './book-form-edit.component.html',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatLabel,
    MatDialogTitle
  ],
  styleUrls: ['./book-form-edit.component.css']
})
export class BookFormEditComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<Book>();
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookFormEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book // Recibe los datos pasados al modal
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      gender: ['', Validators.required],
      linkImage: [''],
      publishedDate: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.bookForm.patchValue(this.data); // Precarga los datos en el formulario
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const updatedBook: Book = { ...this.data, ...this.bookForm.value };
      this.formSubmit.emit(updatedBook);
      this.dialogRef.close();
    }
  }
}
