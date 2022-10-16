import React from 'react'

const NinmuList = (props) => {
  const { todos, todoStartBtton, handleEditClick, onClickDelete } = props
  return (
    <>
      <div className="todo_title">任務一覧</div>
      <ul className="ui cards">
        {todos.map((todo, index) => (
          <div id={todo.uuid} className="card" key={index}>
            <li id="todo_card" className="content">
              <div className="card_top_area">
                <div id="todo_data" className=" text-gray-400">
                  <i className="fa-regular fa-clock"></i>
                  {todo.data}
                </div>
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
    </>
  )
}

export default NinmuList
