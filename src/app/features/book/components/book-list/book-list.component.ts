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
import Swal from 'sweetalert2';
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
      disableClose: true,
      panelClass: 'custom-modal'
    });

    dialogRef.componentInstance.formSubmit.subscribe((newBook: Book) => {
      this.createBook(newBook);
      dialogRef.close();
    });
  }

  openEditForm(book: any): void {
    const dialogRef = this.dialog.open(BookFormEditComponent, {
      width: '600px',
      data: book,
    });


    dialogRef.componentInstance.formSubmit.subscribe((updatedBook: any) => {
      // Llama al método updateBook y no createBook
      this.bookService.updateBook(updatedBook).subscribe(() => {
        this.getBooks();
      });
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.bookService.deleteBook(id).subscribe(() => {
          this.getBooks();
          this.loading = false;
          Swal.fire(
            '¡Eliminado!',
            'El libro ha sido eliminado correctamente.',
            'success'
          );
        });
      }
    });
  }

  filterBooks(): void {
    this.filteredBooks = this.books.filter((book) =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
