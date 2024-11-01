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
import {BookFormEditComponent} from '../book-form-edit/book-form-edit.component';

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
  loading: boolean = false;

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.loading = true;
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;
      this.filteredBooks = data;
      this.loading = false;
    });
  }

  openCreateForm(): void {
    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '500px',
      disableClose: true, // Evita el cierre accidental del modal
      panelClass: 'custom-modal' // Clase personalizada para estilos del modal
    });

    dialogRef.componentInstance.formSubmit.subscribe((newBook: Book) => {
      this.createBook(newBook);
      dialogRef.close();
    });
  }

  openEditForm(book: Book): void {
    const dialogRef = this.dialog.open(BookFormEditComponent, {
      width: '500px',
      data: book,
      disableClose: false,
      panelClass: 'custom-modal'
    });

    dialogRef.componentInstance.formSubmit.subscribe((updatedBook: Book) => {
      this.updateBook(updatedBook);
      dialogRef.close();
    });
  }


  createBook(book: Book): void {
    this.loading = true;
    this.bookService.createBook(book).subscribe(() => {
      this.getBooks();
      this.loading = false;
    });
  }

  updateBook(book: Book): void {
    this.loading = true;
    this.bookService.updateBook(book).subscribe(() => {
      this.getBooks();
      this.loading = false;
    });
  }

  deleteBook(id: any): void {
    this.loading = true;
    this.bookService.deleteBook(id).subscribe(() => {
      this.getBooks();
      this.loading = false;
    });
  }

  filterBooks(): void {
    this.filteredBooks = this.books.filter((book) =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
