import React from 'react'

const AddForm = (props) => {
  const { task, setumei, todoSubmit, todoNewTask, todoNewSetumei } = props

  return (
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
  )
}

export default AddForm
