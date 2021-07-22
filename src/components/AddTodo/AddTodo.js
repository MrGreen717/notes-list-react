import React, { useRef, useState } from 'react'
import TextArea from './../TextArea/TextArea'

import './AddTodo.scss'

const AddTodo = ({ addTodo }) => {
	const [inputTextValue, setInputTextValue] = useState('')
	const [inputTitleValue, setInputTitleValue] = useState('')
	const [activeInput, setActiveInput] = useState(false)
	const inputText = useRef(null)
	const inputTitle = useRef(null)

	const openInput = () => {
		setActiveInput(!activeInput)
		setTimeout(() => {
			inputText.current.focus()
		}, 0)
	}

	const clearInput = () => {
		setInputTextValue('')
		setInputTitleValue('')
		setActiveInput(!activeInput)
	}

	const createTodo = (title, text) => {
		if (!inputTextValue.trim() && !inputTitleValue.trim()) {
			clearInput()
			setActiveInput(!activeInput)
			return
		}

		const todo = {
			id: Math.random(),
			title,
			text
		}

		addTodo(todo)
		clearInput()
	}

	return (
		<div className="add-todo">
			{!activeInput && (
				<div className="add-todo__close-input" onClick={openInput}>
					<TextArea
						className="add-todo__close-input-textarea"
						contentEditable="false"
						placeholder="Note text"
					/>
				</div>
			)}

			{activeInput && (
				<div className="add-todo__open-input">
					<div className="content-container">
						<TextArea
							className="add-todo__open-input-titlearea"
							contentEditable="true"
							placeholder="Enter title"
							input={inputTitle}
							setValue={setInputTitleValue}
						/>
						<TextArea
							className="add-todo__open-input-textarea"
							contentEditable="true"
							placeholder="Note text"
							input={inputText}
							setValue={setInputTextValue}
						/>
					</div>
					<div className="add-todo__open-input-button-panel">
						<button
							className="button-add"
							onClick={() => {
								createTodo(inputTitleValue, inputTextValue)
							}}
						>
							Add note
						</button>
						<button className="button-close" onClick={clearInput}>
							Close
						</button>
					</div>
				</div>
			)}
			{activeInput && <div className="layout" onClick={clearInput} />}
		</div>
	)
}

export default AddTodo
