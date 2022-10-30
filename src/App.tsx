import React, { useCallback } from 'react';
import './App.scss';
import { Todolist } from './Todos/Todos';
import { FilterValueType, TodosType } from './types/types';


export const сlearComplitedTodoForTests = (todos: TodosType[]) => {
    return todos.filter(t => t.isDone !== true)
}

export const onChangeCheckboxStatusForTests = (todos: TodosType[], id: number, value: boolean) => {
    return todos.map(t => t.id === id ? { ...t, isDone: value } : t)
}

export const addTodosForTests = (todos: TodosType[], title: string) => {
    const newTodos = {
        id: +new Date(),
        title: title,
        isDone: false
    }
    return [...todos, newTodos]
}


const App = () => {

    const [todos, setTodos] = React.useState<TodosType[]>([
        { id: 1, title: "Тестовое задание", isDone: true },
        { id: 2, title: "Прекрасный код", isDone: true },
        { id: 3, title: "Покрытие тестами", isDone: false },
        { id: 4, title: "Отдохнуть", isDone: false },
        { id: 5, title: "Выучить английский", isDone: true },
        { id: 6, title: "Сходить в магазин", isDone: false }
    ])

    const [filter, setFilter] = React.useState<FilterValueType>('all')

    const сlearComplitedTodos = useCallback(() => {
        setTodos(сlearComplitedTodoForTests(todos))
    }, [todos])

    const onChangeCheckboxStatus = useCallback((id: number, value: boolean) => {
        setTodos(onChangeCheckboxStatusForTests(todos, id, value))
    }, [todos])

    const addTodos = useCallback((title: string) => {
        setTodos(addTodosForTests(todos, title))
    }, [todos])

    const changeFilter = useCallback((value: FilterValueType) => {
        setFilter(value)
    }, [])

    let todosForTodolist = todos
    if (filter === 'active') {
        todosForTodolist = todos.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        todosForTodolist = todos.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <Todolist todos={todosForTodolist}
                сlearComplited={сlearComplitedTodos}
                changeFilter={changeFilter}
                onChangeCheckboxStatus={onChangeCheckboxStatus}
                addTodos={addTodos}
                filter={filter}
            />
        </div>
    );
}

export default App;
