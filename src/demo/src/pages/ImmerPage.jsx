import { immer } from '../mini-js/immer.js'
import { create } from '../mini-js/react.js'

export const useTodoStore = create(
  immer((set) => ({
    todos: {
      '82471c5f-4207-4b1d-abcb-b98547e01a3e': {
        id: '82471c5f-4207-4b1d-abcb-b98547e01a3e',
        title: 'Learn Zustand',
        done: false,
      },
      '354ee16c-bfdd-44d3-afa9-e93679bda367': {
        id: '354ee16c-bfdd-44d3-afa9-e93679bda367',
        title: 'Learn Jotai',
        done: false,
      },
      '771c85c5-46ea-4a11-8fed-36cc2c7be344': {
        id: '771c85c5-46ea-4a11-8fed-36cc2c7be344',
        title: 'Learn Valtio',
        done: false,
      },
      '363a4bac-083f-47f7-a0a2-aeeee153a99c': {
        id: '363a4bac-083f-47f7-a0a2-aeeee153a99c',
        title: 'Learn Signals',
        done: false,
      },
    },
    toggleTodo: (todoId) =>
      set((state) => {
        state.todos[todoId].done = !state.todos[todoId].done
      }),
  }))
)

export default () => {
  const todo = useTodoStore()
  return (
    <div>
      ImmerPage
      <h1>{JSON.stringify(todo.todos)}</h1>
      <button
        onClick={() => todo.toggleTodo('82471c5f-4207-4b1d-abcb-b98547e01a3e')}>
        toggleTodo
      </button>
    </div>
  )
}
