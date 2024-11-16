import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { environment } from '../environments/environment';

type User = { id?: number; name: string };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly http = inject(HttpClient);

  addButtonClicked$ = new BehaviorSubject<string | null>(null);

  addUser$ = this.addButtonClicked$.pipe(
    filter((name) => !!name),
    map((name) => name as string),
    switchMap((name) => this.http.post(environment.apiUrl + 'user', { name }))
  );

  users$ = combineLatest({ addUser: this.addUser$ }).pipe(
    startWith({ addUser: null }),
    switchMap(() => {
      return this.http.get<User[]>(environment.apiUrl + 'user');
    })
  );

  users = toSignal(this.users$);

  onAddUser(name: HTMLInputElement) {
    this.addButtonClicked$.next(name.value);
    name.value = '';
    name.focus();
  }
}
