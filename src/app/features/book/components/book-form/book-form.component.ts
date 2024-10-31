import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Book} from '../../../../core/models/book.model';
import {BookService} from '../../../../core/services/book.service';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton
  ],
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Input() book: Book | null = null; // Si existe, es edición; si no, es nuevo
  @Output() formSubmit = new EventEmitter<Book>();
  bookForm: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) {
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
    if (this.book) {
      this.bookForm.patchValue(this.book); // Cargar datos en caso de edición
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData: Book = { ...this.book, ...this.bookForm.value };
      this.formSubmit.emit(bookData); // Emitir los datos del libro
      this.bookForm.reset();
    }
  }
}
