import { addTodosForTests, onChangeCheckboxStatusForTests, сlearComplitedTodoForTests } from "../App"
import { TodosType } from "../types/types"

let initialState: TodosType[]

beforeEach(() => {
    initialState = [
        { id: 1, title: "Тестовое задание", isDone: true },
        { id: 2, title: "Прекрасный код", isDone: true },
        { id: 3, title: "Покрытие тестами", isDone: false },
        { id: 4, title: "Отдохнуть", isDone: false },
        { id: 5, title: "Выучить английский", isDone: true },
        { id: 6, title: "Сходить в магазин", isDone: false }
    ]
})

test('correct todo should be deleted from correct array', () => {
    let endState = сlearComplitedTodoForTests(initialState)
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('Покрытие тестами')
    expect(endState[2].isDone).toBeFalsy()
})

test('status of specified todo should be changed', () => {
    let endState = onChangeCheckboxStatusForTests(initialState, 3, true)
    expect(endState[3].isDone).toBeTruthy();
})

test.only('correct todo should be added to correct array', () => {
    let endState = addTodosForTests(initialState, 'поесть')
    expect(endState.length).toBe(7)
    expect(endState[6].title).toBe('поесть')
    expect(endState[6].isDone).toBeFalsy()
})




