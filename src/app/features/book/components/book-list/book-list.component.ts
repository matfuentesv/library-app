import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {RouterLink} from '@angular/router';
import {Book} from '../../../../core/models/book.model';
import {BookService} from '../../../../core/services/book.service';
import {MatAnchor, MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {BookDetailDialogComponent} from '../book-detail-dialog/book-detail-dialog.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    RouterLink,
    MatCardImage,
    MatAnchor,
    NgForOf,
    MatIcon,
    MatDialogModule,
    MatButton
  ],
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  visibleBooks: Book[] = [];
  currentIndex = 0;
  private intervalId: any;

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;
      this.updateVisibleBooks();
      this.startCarousel();
    });
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // Cambia cada 3 segundos
  }

  stopCarousel(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateVisibleBooks(): void {
    this.visibleBooks = this.books.slice(this.currentIndex, this.currentIndex + 4);
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.books.length;
    if (this.currentIndex + 4 > this.books.length) {
      this.currentIndex = 0;
    }
    this.updateVisibleBooks();
  }

  openDetailDialog(book: Book): void {
    this.dialog.open(BookDetailDialogComponent, {
      width: '400px',
      data: book
    });
  }
}
