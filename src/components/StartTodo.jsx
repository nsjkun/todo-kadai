import React from 'react'

const StartTodo = (props) => {
  const { starttodos, todoDeleteBtton } = props

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
