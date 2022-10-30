import React, { ChangeEvent } from 'react'
import { TodosType } from '../../types/types'
import style from './TodosMap.module.scss'


type PropsType = {
    todos: TodosType[]
    onChangeCheckbox: (tID: number, value: boolean) => void
}

export const TodosMap: React.FC<PropsType> = React.memo(({ todos, onChangeCheckbox }) => {

    const onChangeCheckboxHandler = (id: number, e: ChangeEvent<HTMLInputElement>) => {
        onChangeCheckbox(id, e.currentTarget.checked)
    }

    return (
        <div>
            {
                todos.map(t => {
                    return (
                        <div key={t.id} className={t.isDone ? `${style.itemBlock}  ${style.isDone}` : style.itemBlock}>
                            <input
                                type="checkbox"
                                className={style.customCheckbox}
                                id={t.id.toString()}
                                checked={t.isDone}
                                onChange={(e) => onChangeCheckboxHandler(t.id, e)}
                            />
                            <label htmlFor={t.id.toString()}>{t.title}</label>
                        </div>
                    )
                })
            }
        </div>
    )
})

export default TodosMap
