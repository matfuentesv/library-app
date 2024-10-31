import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookService} from '../../core/services/book.service';
import {Book} from '../../core/models/book.model';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {BookListComponent} from '../../features/book/components/book-list/book-list.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {
  BookDetailDialogComponent
} from '../../features/book/components/book-detail-dialog/book-detail-dialog.component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    BookListComponent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatIcon,
    MatCardActions,
    MatCard,
    MatCardImage,
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{



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
