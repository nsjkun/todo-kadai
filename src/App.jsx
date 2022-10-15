import React, { useState } from 'react'

const App = () => {
  const initialState = [
    {
      task: 'コーラ飲む',
    },
    {
      task: 'トイレ行く',
    },
    {
      task: 'LINE確認する',
    },
  ]
  const [todos, setTodos] = useState(initialState)

  // 遂行中のタスクリスト
  const starttodosState = [
    {
      task: 'インスタ見る',
    },
    {
      task: 'ご飯食べる',
    },
  ]
  const [starttodos, setStarTodos] = useState(starttodosState)

  // タスク追加フォーム
  const [task, setTask] = useState('')
  const todoNew = (event) => {
    setTask(event.target.value)
  }
  // タスクを追加フォーム
  const todoSubmit = (event) => {
    event.preventDefault() //リロードしない
    if (task === '')
      return Swal.fire({
        title: 'エラー',
        text: '任務内容を入力してください。',
        icon: 'warning',
        confirmButtonText: 'OK',
        timer: '2000',
      }) //文字列が入っていない場合アラート
    setTodos((todos) => [...todos, { task }])
    setTask('')
  }

  // 完了ボタン(削除)
  const todoDeleteBtton = (index) => {
    Swal.fire({
      title: 'この任務を完了しますか？',
      text: '完了するとタスクが削除されます',
      showCancelButton: true,
      confirmButtonText: '完了する',
      cancelButtonText: 'キャンセル',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: '任務完了',
          text: '次のタスクを倒そう！',
          icon: 'success',
          timer: '2000',
          confirmButtonText: '閉じる',
        })
        const newTodos = [...starttodos]
        newTodos.splice(index, 1)
        setStarTodos(newTodos)
      }
    })
  }

  // はじめるボタン（進行中に移動)
  const todoStartBtton = (index) => {
    // 任務一覧から削除
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
    // 遂行中に移動
    const newStartTodos = [...starttodos, todos[index]]
    setStarTodos(newStartTodos)
  }

  return (
    <>
      {/* 追加フォーム */}
      <form className="task_add_form" onSubmit={todoSubmit}>
        <input
          className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
          value={task}
          placeholder="任務を追加して下さい"
          onChange={todoNew}
        />
        <button
          className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          type="submit"
        >
          追加する
        </button>
      </form>
      {/* 追加フォーム end */}

      {/* 進行中パーツ */}
      <div className="todo_title">遂行中</div>
      <ul className="ui cards">
        {starttodos.map((todo, index) => (
          <div class="card">
            <li id="todo_card" className="content" key={index}>
              <div id="task_title" className="text-xl font-bold text-gray-900">
                {todo.task}
              </div>
              <div class="ui two buttons">
                <button
                  className="ui teal basic button"
                  onClick={() => todoDeleteBtton(index)}
                >
                  任務完了
                </button>
              </div>
            </li>
          </div>
        ))}
      </ul>

      {/* 進行中パーツ end*/}

      {/* 任務一覧パーツ */}
      <div className="todo_title">任務一覧</div>
      <ul className="ui cards">
        {todos.map((todo, index) => (
          <div class="card">
            <li id="todo_card" className="content" key={index}>
              <div id="task_title" className="text-xl font-bold text-gray-900">
                {todo.task}
              </div>
              <div class="ui two buttons">
                <button
                  className="ui teal basic button"
                  onClick={() => todoStartBtton(index)}
                >
                  はじめる
                </button>
              </div>
            </li>
          </div>
        ))}
      </ul>
      {/* 任務一覧パーツ end*/}
    </>
  )
}

export default App
