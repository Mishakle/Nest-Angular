import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Emitters } from '../emitters/emitters';
import { TodosService } from './todos.service';
import { AuthService } from '../core/auth/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  url = environment.apiUrl;
  message = '';
  form: FormGroup = this._formBuilder.group({
    content: '',
    priority: 1,
  });
  todos = [];
  private subscription = new Subscription();

  constructor(
    private _todosService: TodosService,
    private _http: HttpClient,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadTodos();
    this.subscription.add(
      this._http.get(`${this.url}auth/user`, { withCredentials: true }).subscribe(
        (res: any) => {
          this.message = `Hi ${res.username}!`;
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          console.log(err);
          Emitters.authEmitter.emit(false);
        },
      ),
    );
  }

  loadTodos() {
    this.subscription.add(
      this._todosService.getAllTodos().subscribe((todos) => {
        this.todos = todos;
      }),
    );
  }

  submit(): void {
    this.subscription.add(
      this._todosService
        .createTodo(this.form.value.content)
        .pipe(
          tap(() => {
            this.loadTodos();
          }),
        )
        .subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
