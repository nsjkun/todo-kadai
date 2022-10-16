import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const App = () => {
  // データ
  const initialState = [
    {
      task: 'ご飯食べる',
      setumei:
        'テキストテキストテキストテキストテキストテキストテキストテキスト',
      uuid: uuidv4(),
    },
    {
      task: 'お風呂入る',
      setumei:
        'テキストテキストテキストテキストテキストテキストテキストテキスト',
      uuid: uuidv4(),
    },
    {
      task: '洗濯する',
      setumei:
        'テキストテキストテキストテキストテキストテキストテキストテキスト',
      uuid: uuidv4(),
    },
  ]
  // useState
  const [todos, setTodos] = useState(initialState)
  const [starttodos, setStartTodos] = useState(initialState)

  // ローカルストレージ
  // const [todos, setTodos] = useState(() => {
  //   // ローカルストレージの情報取得
  //   const savedTodos = localStorage.getItem('todos')
  //   // 保存されているTODOがある場合
  //   if (savedTodos) {
  //     // parseされたJSONオブジェクトをjavascriptオブジェクトに戻す
  //     return JSON.parse(savedTodos)
  //   } else {
  //     // 保存されてない場合何もしない
  //     return []
  //   }
  // })
  // 任務一覧ローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // const [starttodos, setStartTodos] = useState(() => {
  //   // ローカルストレージの情報取得
  //   const savedTodos = localStorage.getItem('starttodos')
  //   // 保存されているTODOがある場合
  //   if (savedTodos) {
  //     // parseされたJSONオブジェクトをjavascriptオブジェクトに戻す
  //     return JSON.parse(savedTodos)
  //   } else {
  //     // 保存されてない場合何もしない
  //     return []
  //   }
  // })
  // 遂行中ローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('starttodos', JSON.stringify(starttodos))
  }, [starttodos])

  // タスクタイトル useState
  const [task, setTask] = useState('')
  //タスク詳細 useState
  const [setumei, setSetumei] = useState('')

  // タスクタイトル
  const todoNewTask = (event) => {
    setTask(event.target.value)
  }
  // タスク詳細
  const todoNewSetumei = (event) => {
    setSetumei(event.target.value)
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

    // タスク内容とuuidをセット
    setTodos((todos) => [...todos, { task, setumei, uuid: uuidv4() }])
    // 追加後フォームの文字をリセット
    setTask('')
    setSetumei('')
  }

  // 完了ボタン(削除)
  const todoDeleteBtton = (index, _uuid) => {
    Swal.fire({
      title: 'この任務を完了しますか？',
      text: '完了するとカードが削除されます',
      showCancelButton: true,
      confirmButtonText: '完了する',
      cancelButtonText: 'キャンセル',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: '任務完了',
          text: '偉い！次の任務をこなそう！',
          icon: 'success',
          timer: '2000',
          confirmButtonText: '閉じる',
        })
        const removeItem = [...starttodos]
        removeItem.splice(index, 1)
        setStartTodos(removeItem)
      }
    })
  }

  // 削除ボタン
  const onClickDelete = (index) => {
    Swal.fire({
      title: '削除しますか？',
      showCancelButton: true,
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
    }).then((result) => {
      if (result.value) {
        const removeItem = [...todos]
        removeItem.splice(index, 1)
        setTodos(removeItem)
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
    setStartTodos(newStartTodos)
  }

  //編集
  const [isEditing, setIsEditing] = useState(false)
  const [currentTodo, setCurrentTodo] = useState({})

  // タスクタイトルonChange
  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, task: e.target.value })
    console.log(currentTodo)
  }

  // タスク説明onChange
  const handleEditSetumeiChange = (e) => {
    setCurrentTodo({ ...currentTodo, setumei: e.target.value })
    console.log(currentTodo)
  }

  //フォームが送信された時の処理
  const handleUpdateTodo = (uuid, updatedTodo) => {
    const updatedItem = todos.map((todo) => {
      return todo.uuid === uuid ? updatedTodo : todo
    })
    Swal.fire({
      title: '更新しました',
      icon: 'success',
      confirmButtonText: '閉じる',
      timer: '1500',
    }) //文字列が入っていない場合アラート

    setIsEditing(false)
    setTodos(updatedItem)
  }

  // 編集ボタンクリックしたときの処理
  const handleEditClick = (todo) => {
    setIsEditing(true)
    setCurrentTodo({ ...todo })
  }

  const handleEditFormSubmit = (e) => {
    e.preventDefault()

    handleUpdateTodo(currentTodo.uuid, currentTodo)
  }

  return (
    <>
      {/* 編集フォーム */}
      {isEditing ? (
        <>
          <div className="todo_title">任務編集</div>
          <form onSubmit={handleEditFormSubmit}>
            <input
              name="editTodo"
              type="text"
              id="input"
              placeholder="Edit todo"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              value={currentTodo.task}
              onChange={handleEditInputChange}
            />
            <textarea
              id="setumei_area"
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              value={currentTodo.setumei}
              rows="5"
              placeholder="説明があれば入力してください"
              onChange={handleEditSetumeiChange}
            />
            <button id="edit_button" className="ui teal button" type="submit">
              更新する
            </button>
            <button
              id="edit_button"
              className="ui grey button"
              // onClick={() => setIsEditing(false)}
            >
              キャンセル
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="todo_title">任務追加</div>
          <form className="task_add_form" onSubmit={todoSubmit}>
            <input
              id="input"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              value={task}
              placeholder="任務を入力して下さい"
              onChange={todoNewTask}
            />
            <textarea
              id="setumei_area"
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              value={setumei}
              rows="5"
              placeholder="説明があれば入力してください"
              onChange={todoNewSetumei}
            />
            <button
              id="tuika_button"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
              type="submit"
            >
              追加する
            </button>
          </form>
        </>
      )}
      {/* 編集フォームend */}

      {/* 遂行中 */}
      <div className="todo_title">遂行中</div>

      <ul className="ui cards">
        {starttodos.map((todo, index) => (
          <div id={todo.uuid} className="card" key={index}>
            <li id="todo_card" className="content">
              <span
                id="rainbow_bar"
                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
              ></span>
              <div className="card_top_area">
                <div
                  id="task_title"
                  className="task_title text-xl font-bold text-gray-900"
                >
                  {todo.task}
                </div>
                <div id="setumei" className="text-xs text-gray-500">
                  {todo.setumei}
                </div>
              </div>

              <div className="card_bottom_area">
                <div className="ui two buttons">
                  <button
                    className="ui teal basic button"
                    onClick={() => todoDeleteBtton(index)}
                  >
                    任務完了
                  </button>
                </div>
                <div id="uuid" className="text-xs text-gray-500">
                  CardID：{todo.uuid}
                </div>
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
          <div id={todo.uuid} className="card" key={index}>
            <li id="todo_card" className="content">
              <div className="card_top_area">
                <div
                  id="task_title"
                  className="text-xl font-bold text-gray-900"
                >
                  {todo.task}
                </div>
                <div id="setumei" className="text-xs text-gray-500">
                  {todo.setumei}
                </div>
              </div>

              <div className="card_bottom_area">
                <div className="ui three buttons">
                  <button
                    className="ui teal basic button"
                    onClick={() => todoStartBtton(index)}
                  >
                    開始
                  </button>
                  <button
                    className="ui teal basic button"
                    onClick={() => handleEditClick(todo)}
                  >
                    編集
                  </button>
                  <button
                    className="ui teal basic button"
                    onClick={() => onClickDelete(todo.uuid)}
                  >
                    削除
                  </button>
                </div>
                <div id="uuid" className="text-xs text-gray-500">
                  CardID：{todo.uuid}
                </div>
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
