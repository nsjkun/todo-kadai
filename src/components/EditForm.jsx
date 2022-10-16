import React from 'react'

const EditForm = (props) => {
  const {
    currentTodo,
    handleEditFormSubmit,
    handleEditInputChange,
    handleEditSetumeiChange,
  } = props

  return (
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
  )
}

export default EditForm
