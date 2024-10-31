import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BookDetailDialogComponent } from '../book-detail-dialog/book-detail-dialog.component';
import {Book} from '../../../../core/models/book.model';
import {BookService} from '../../../../core/services/book.service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {FormsModule} from '@angular/forms';
import {BookFormComponent} from '../book-form/book-form.component';
import {NgForOf, NgIf} from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  standalone: true,
  imports: [
    MatProgressSpinner,
    FormsModule,
    BookFormComponent,
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardImage,
    NgForOf,
    MatCardContent,
    MatIcon,
    MatCardActions,
    MatButton,
    MatCardTitle,
    MatCardSubtitle
  ],
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';
  showForm: boolean = false;
  selectedBook: Book | null = null;
  loading: boolean = false;

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBooks();
  }

  // Obtiene la lista de libros con un delay para ver el spinner
  getBooks(): void {
    this.loading = true;
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;
      this.filteredBooks = data;
      setTimeout(() => {
        this.loading = false; // Desactiva el spinner después de un delay
      }, 500); // Delay de 500ms
    });
  }

  openDetailDialog(book: Book): void {
    this.dialog.open(BookDetailDialogComponent, {
      width: '400px',
      data: book
    });
  }

  filterBooks(): void {
    this.filteredBooks = this.books.filter((book) =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openForm(): void {
    this.selectedBook = null;
    this.showForm = true;
  }

  editBook(book: Book): void {
    this.selectedBook = book;
    this.showForm = true;
  }

  onFormSubmit(book: Book): void {
    this.loading = true;
    if (book.id) {
      this.bookService.updateBook(book).subscribe(() => {
        this.getBooks();
        this.showForm = false;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    } else {
      this.bookService.createBook(book).subscribe(() => {
        this.getBooks();
        this.showForm = false;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    }
  }

  deleteBook(id: any): void {
    this.loading = true;
    this.bookService.deleteBook(id).subscribe(() => {
      this.getBooks();
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });
  }
}
