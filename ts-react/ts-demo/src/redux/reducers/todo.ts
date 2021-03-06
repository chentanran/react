import { Todo } from '../../models/Todo'
import { ActionTodoConstants } from '../constants/todo'
import { Action } from '../actions/todo'
// 定义 State 的 接口
export interface State {
  todos: Todo[]
}

export const initialState: State = {
  todos: []
}

// 把之前的 Action 给 action 参数申明
export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {

    case ActionTodoConstants.ADD_TODO: {

      const todo = action.payload

      return {
        ...state,
        todos: [...state.todos, todo]
      }
    }

    case ActionTodoConstants.TOGGLE_TODO: {

      const { id } = action.payload
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo)
      }
    }

    default:
      return state
  }
}