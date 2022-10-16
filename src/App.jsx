import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import StartTodo from './components/StartTodo'
import NinmuList from './components/NinmuList'
import AddForm from './components/AddForm'
import EditForm from './components/EditForm'

const App = () => {
  // データ
  const initialState = [
    {
      data: moment().format('YYYY年MM月DD日 HH:mm'),
      task: 'ご飯食べる',
      setumei:
        'テキストテキストテキストテキストテキストテキストテキストテキスト',
      uuid: uuidv4(),
    },
    {
      data: moment().format('YYYY年MM月DD日 HH:mm'),
      task: 'お風呂入る',
      setumei:
        'テキストテキストテキストテキストテキストテキストテキストテキスト',
      uuid: uuidv4(),
    },
    {
      data: moment().format('YYYY年MM月DD日 HH:mm'),
      task: '洗濯する',
      setumei:
        'テキストテキストテキストテキストテキストテキストテキストテキスト',
      uuid: uuidv4(),
    },
  ]
  // useState
  const [todos, setTodos] = useState(initialState)
  const [starttodos, setStartTodos] = useState(initialState)
  const [task, setTask] = useState('')
  const [setumei, setSetumei] = useState('')

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

    // タスクデータをセット
    setTodos((todos) => [
      ...todos,
      {
        task,
        setumei,
        uuid: uuidv4(),
        data: moment().format('YYYY年MM月DD日 HH:mm'),
      },
    ])
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
      Swal.fire({
        title: '更新しました',
        icon: 'success',
        confirmButtonText: '閉じる',
        timer: '1500',
      })
      return todo.uuid === uuid ? updatedTodo : todo
    })

    setIsEditing(false)
    setTodos(updatedItem)
  }

  const handleEditFormSubmit = (e) => {
    e.preventDefault()
    handleUpdateTodo(currentTodo.uuid, currentTodo)
  }

  // 編集ボタンクリックしたときの処理
  const handleEditClick = (todo) => {
    setIsEditing(true)
    setCurrentTodo({ ...todo })
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  const cancelClick = (e) => {
    e.preventDefault()
    setIsEditing(false)
  }

  return (
    <>
      {/* 編集フォーム */}
      {isEditing ? (
        <EditForm
          currentTodo={currentTodo}
          cancelClick={cancelClick}
          handleEditFormSubmit={handleEditFormSubmit}
          handleEditInputChange={handleEditInputChange}
          handleEditSetumeiChange={handleEditSetumeiChange}
        />
      ) : (
        <AddForm
          task={task}
          setumei={setumei}
          isEditing={isEditing}
          todoSubmit={todoSubmit}
          todoNewTask={todoNewTask}
          todoNewSetumei={todoNewSetumei}
        />
      )}

      {/* 編集フォームend */}

      {/* 遂行中 */}
      <StartTodo starttodos={starttodos} todoDeleteBtton={todoDeleteBtton} />

      {/* 任務一覧パーツ */}
      <NinmuList
        todos={todos}
        todoStartBtton={todoStartBtton}
        handleEditClick={handleEditClick}
        onClickDelete={onClickDelete}
      />
    </>
  )
}

export default App
