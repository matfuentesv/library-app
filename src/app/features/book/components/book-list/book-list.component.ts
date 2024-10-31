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
export class BookListComponent  {

}
