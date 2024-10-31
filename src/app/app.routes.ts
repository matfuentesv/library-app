import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NgModule} from '@angular/core';
import {BookListComponent} from './features/book/components/book-list/book-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book-list', component: BookListComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
