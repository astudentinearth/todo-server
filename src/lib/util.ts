import { Todo } from "./types";

/**
 * Sorts todos by extracting the date portion of todo IDs
 * @returns Todo[]
 */
export function sortTodos(todos: Todo[]) {
  todos.sort((a, b) => {
    const _b = /(\d+)\$/.exec(b.id)
    const _a = /(\d+)\$/.exec(a.id)
    if (!_b || !_a) return 0
    if (_b[1] == null || _a[1] == null) return 0
    return Number(_b[1]) - Number(_a[1])
  })
}
