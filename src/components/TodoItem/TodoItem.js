import React, { useRef, useState } from 'react'
import TextArea from '../TextArea/TextArea'
import './TodoItem.scss'

const TodoItem = ({ title, text, id, updateTodo, deleteTodo }) => {
	const [editTodo, setEditTodo] = useState(false)
	const [inputTitleValue, setInputTitleValue] = useState(title)
	const [inputTextValue, setInputTextValue] = useState(text)
	const inputText = useRef(null)
	const inputTitle = useRef(null)
	const card = useRef(null)

	const openInput = () => {
		setEditTodo(!editTodo)
		setTimeout(() => {
			const range = document.createRange()
			const selection = window.getSelection()
			range.selectNodeContents(inputText.current)
			range.collapse()
			selection.removeAllRanges()
			selection.addRange(range)
		}, 0)
	}

	const updateTodoHandler = (title, text) => {
		const todo = {
			id,
			title,
			text
		}
		updateTodo(todo)
	}

	const confirmUpdate = () => {
		setEditTodo(!editTodo)
		updateTodoHandler(inputTitleValue.trim(), inputTextValue.trim())
	}

	return (
		<>
			{!editTodo && (
				<li
					className="close-todo"
					onClick={openInput}
					draggable="true"
					ref={card}
				>
					{text === '' && title === '' && (
						<TextArea
							className="close-todo__empty-todo"
							contentEditable="false"
							text={title}
							placeholder="Empty note"
						/>
					)}
					{title === '' && text !== '' && (
						<TextArea
							className="close-todo__input-text"
							contentEditable="false"
							text={text}
						/>
					)}
					{text === '' && title !== '' && (
						<TextArea
							className="close-todo__input-title"
							contentEditable="false"
							text={title}
						/>
					)}
					{text !== '' && title !== '' && (
						<>
							<TextArea
								className="close-todo__input-title"
								contentEditable="false"
								text={title}
							/>

							<TextArea
								className="close-todo__input-text"
								contentEditable="false"
								text={text}
							/>
						</>
					)}
				</li>
			)}
			{editTodo && (
				<div className="open-todo">
					<div className="content-container">
						<TextArea
							input={inputTitle}
							className="open-todo__input-title"
							contentEditable="true"
							text={title}
							setValue={setInputTitleValue}
						/>
						<TextArea
							input={inputText}
							className="open-todo__input-text"
							contentEditable="true"
							text={text}
							setValue={setInputTextValue}
						/>
					</div>
					<button className="button-delete" onClick={() => deleteTodo(id)}>
						Delete note
					</button>
				</div>
			)}
			{editTodo && <div className="layout" onClick={confirmUpdate} />}
		</>
	)
}

export default TodoItem
