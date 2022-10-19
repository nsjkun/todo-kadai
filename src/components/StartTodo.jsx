import React from 'react'

const StartTodo = (props) => {
  const { starttodos, setStartTodos } = props

  // 完了ボタン(任務完了)
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
          timer: '1500',
          confirmButtonText: '閉じる',
        })
        const removeItem = [...starttodos]
        removeItem.splice(index, 1)
        setStartTodos(removeItem)
      }
    })
  }

  return (
    <>
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
                <div id="todo_data" className=" text-gray-400">
                  <i className="fa-regular fa-clock"></i>
                  {todo.data}
                </div>
                <div id="task_title" className="font-bold text-gray-900">
                  {todo.task}
                </div>
                <div id="setumei" className=" text-gray-500">
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
    </>
  )
}

export default StartTodo
