import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BookDetailDialogComponent } from '../book-detail-dialog/book-detail-dialog.component';
import {Book} from '../../../../core/models/book.model';
import {BookService} from '../../../../core/services/book.service';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  standalone: true,
  imports: [
    MatCardActions,
    MatButton,
    MatCardContent,
    MatIcon,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCard,
    FormsModule,
    NgForOf,
    MatCardImage
  ],
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;
      this.filteredBooks = data;
    });
  }

  filterBooks(): void {
    this.filteredBooks = this.books.filter((book) =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openDetailDialog(book: Book): void {
    this.dialog.open(BookDetailDialogComponent, {
      width: '400px',
      data: book
    });
  }
}
