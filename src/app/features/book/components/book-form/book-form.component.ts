import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Book} from '../../../../core/models/book.model';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import Swal from 'sweetalert2';
import {MatDialogTitle} from '@angular/material/dialog';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatLabel,
    MatDatepickerToggle,
    MatDatepicker,
    MatInput,
    MatDatepickerInput,
    MatDialogTitle
  ],
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  @Output() formSubmit = new EventEmitter<any>();

  bookForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      gender: ['', Validators.required],
      linkImage: ['', Validators.required],
      publishedDate: [null, Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      Swal.fire({
        title: '¿Agregar nuevo libro?',
        text: "¿Deseas agregar este libro a la colección?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, agregar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.formSubmit.emit(this.bookForm.value);
          Swal.fire('¡Agregado!', 'El libro ha sido agregado exitosamente.', 'success');
        }
      });
    }
  }
}
