import {Component, EventEmitter, Input, Output, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Book} from '../../../../core/models/book.model';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-form-edit',
  templateUrl: './book-form-edit.component.html',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatLabel,
    MatDialogTitle,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker
  ],
  styleUrls: ['./book-form-edit.component.css']
})
export class BookFormEditComponent {
  @Output() formSubmit = new EventEmitter<any>();

  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BookFormEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.bookForm = this.fb.group({
      id: [data.id],
      title: [data.title, Validators.required],
      author: [data.author, Validators.required],
      gender: [data.gender, Validators.required],
      linkImage: [data.linkImage, Validators.required],
      publishedDate: [this.convertToDate(data.publishedDate), Validators.required],
      description: [data.description, Validators.required],
    });
  }

  private convertToDate(date: any): Date | null {
    return typeof date === 'string' ? new Date(date) : date;
  }

  onSubmit() {
    if (this.bookForm.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas actualizar este libro?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.formSubmit.emit(this.bookForm.value); // Emite el formulario solo si se confirma
          this.dialogRef.close(this.bookForm.value); // Cierra el modal después de confirmar
          Swal.fire(
            '¡Actualizado!',
            'El libro ha sido actualizado correctamente.',
            'success'
          );
        }
      });
    }
  }
}
