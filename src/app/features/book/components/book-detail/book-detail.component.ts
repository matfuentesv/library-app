import {Component, OnInit} from '@angular/core';
import {Book} from '../../../../core/models/book.model';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../../../core/services/book.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  book?: Book;

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(id).subscribe((data) => {
      this.book = data;
    });
  }
}
