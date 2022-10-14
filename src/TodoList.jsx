import { useState } from 'react'
import Swal from 'sweetalert2'

const TodoList = () => {
  const initialState = [
    {
      task: 'タスク1',
      isCompleted: false,
    },
    {
      task: 'タスク2',
      isCompleted: false,
    },
    {
      task: 'タスク3',
      isCompleted: false,
    },
  ]

  const [todos, setTodos] = useState(initialState)
  const [task, setTask] = useState('')
  const handleNewTask = (event) => {
    setTask(event.target.value)
  }

  // タスクに追加
  const handleSubmit = (event) => {
    event.preventDefault() //リロードしない
    if (task === '')
      return Swal.fire({
        title: 'エラー',
        text: 'タスクを入力してやり直してください。',
        icon: 'warning',
        confirmButtonText: '了解！',
        timer: '3000', //3秒後に閉じる
      }) //文字列が入っていない場合アラート
    setTodos((todos) => [...todos, { task, isCompleted: false }])
    setTask('')
  }

  return (
    <>
      <h1>ToDo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={task}
          placeholder="タスクを追加して下さい"
          onChange={handleNewTask}
        />
        <button type="submit">追加</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.task}</li>
        ))}
      </ul>
    </>
  )
}

export default TodoList
