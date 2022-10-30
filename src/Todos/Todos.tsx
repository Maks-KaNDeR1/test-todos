import React, { ChangeEvent, KeyboardEvent, useState, useCallback } from 'react';
import { FilterValueType } from '../types/types';
import TodosMap from './TodosMap/TodosMap';
import style from './Todos.module.scss'
import { TodosType } from '../types/types';


type PropsType = {
    todos: TodosType[]
    changeFilter: (value: FilterValueType) => void
    addTodos: (newTaskTitle: string) => void
    onChangeCheckboxStatus: (id: number, value: boolean) => void
    filter: FilterValueType
    сlearComplited: () => void
}

export const Todolist: React.FC<PropsType> = React.memo((
    {
        todos,
        changeFilter,
        addTodos,
        onChangeCheckboxStatus,
        filter,
        сlearComplited
    }
) => {

    const [newTodos, setNewTodos] = useState('')
    const [error, setError] = useState(false)
    const [state, setState] = useState(true)

    const onChangeCheckbox = useCallback((tID: number, value: boolean) => {
        onChangeCheckboxStatus(tID, value)
        setState(true)
    }, [onChangeCheckboxStatus])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTodos(e.currentTarget.value)
        setState(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newTodos.trim() !== '') {
                addTodos(newTodos.trim())
                setNewTodos('')
                setState(true)
            } else {
                setError(true)
            }
        }
    }

    const itemsLeft = todos.filter(t => t.isDone === false).length

    const onFilterClickHandler = (value: FilterValueType) => {
        changeFilter(value)
        setState(true)
    }

    const onFocusHandler = () => {
        setState(false)
    }

    return (
        <div className={style.todos}>
            <div className={style.title} >todos</div>

            <div className={style.todosBlock}>
                <div className={error ? `${style.error} ${style.inputBlock}` : style.inputBlock}>
                    <input
                        placeholder='What needs to be done?'
                        onFocus={onFocusHandler}
                        value={newTodos}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                    />
                    {
                        state &&
                        <span className={style.inputTitle}>
                            <i className="fa fa-angle-down" aria-hidden="true" />
                        </span>
                    }
                    {error && <div className={style.errorMessage}>Текст обязателен!</div>}
                </div>
                <div>
                    <TodosMap todos={todos}
                        onChangeCheckbox={onChangeCheckbox}
                    />
                </div>
                <div className={style.footer} >
                    <button className={style.button}>{itemsLeft} items left</button>
                    <div style={{ marginTop: '5px' }} >
                        <button
                            className={filter === 'all' ? style.activeFilter : style.button}
                            onClick={() => onFilterClickHandler('all')}>
                            All
                        </button>
                        <button
                            className={filter === 'active' ? style.activeFilter : style.button}
                            onClick={() => onFilterClickHandler('active')}>
                            Active
                        </button>
                        <button
                            className={filter === 'completed' ? style.activeFilter : style.button}
                            onClick={() => onFilterClickHandler('completed')}>
                            Completed
                        </button>
                    </div>
                    <button onClick={() => сlearComplited()} className={style.button}>
                        Clear Complited
                    </button>
                    <div className={style.before}></div>
                </div>
            </div>
        </div>
    )
})
