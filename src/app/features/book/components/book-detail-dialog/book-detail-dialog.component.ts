import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import {Book} from '../../../../core/models/book.model';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-book-detail-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle
  ],
  templateUrl: './book-detail-dialog.component.html',
  styleUrl: './book-detail-dialog.component.css'
})
export class BookDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BookDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public book: Book
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
