import {Component, OnInit} from '@angular/core';
import {BookService} from '../../core/services/book.service';
import {Book} from '../../core/models/book.model';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {BookListComponent} from '../../features/book/components/book-list/book-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    BookListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{



  constructor() {}

  ngOnInit(): void {

  }



}
