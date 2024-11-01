import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Book} from '../../../../core/models/book.model';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatLabel
  ],
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  @Output() formSubmit = new EventEmitter<Book>();
  bookForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      gender: ['', Validators.required],
      linkImage: [''],
      publishedDate: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData: Book = this.bookForm.value;
      this.formSubmit.emit(bookData);
      this.bookForm.reset();
    }
  }
}
