
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateTodoInput {
    id?: Nullable<string>;
    title?: Nullable<string>;
    description?: Nullable<string>;
}

export interface UpdateTodoInput {
    id?: Nullable<string>;
    title?: Nullable<string>;
    description?: Nullable<string>;
}

export interface Todo {
    id?: Nullable<string>;
    title?: Nullable<string>;
    description?: Nullable<string>;
}

export interface IQuery {
    listTodo(): Nullable<Todo>[] | Promise<Nullable<Todo>[]>;
    todo(id: string): Nullable<Todo> | Promise<Nullable<Todo>>;
}

export interface IMutation {
    createTodo(title?: Nullable<string>, description?: Nullable<string>): Todo | Promise<Todo>;
    updateTodo(updateTodoInput: UpdateTodoInput): Todo | Promise<Todo>;
    removeTodo(id: string): Nullable<Todo> | Promise<Nullable<Todo>>;
}

type Nullable<T> = T | null;
