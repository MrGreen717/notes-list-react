import React, { useRef, useState } from 'react'
import TextArea from './../TextArea/TextArea'

import './AddTodo.scss'
import ColorList from './../ColorList/ColorList'
import ButtonPanel from './../ButtonPanel/ButtonPanel'
import ContentContainer from './../ContentContainer/ContentContainer'

const AddTodo = ({ addTodo }) => {
	const [inputTextValue, setInputTextValue] = useState('')
	const [inputTitleValue, setInputTitleValue] = useState('')
	const [activeColor, setActiveColor] = useState('white')
	const [visibleColorList, setVisibleColorList] = useState(false)
	const [activeInput, setActiveInput] = useState(false)
	const inputText = useRef(null)
	const inputTitle = useRef(null)
	const notePanel = useRef(null)

	const openInput = () => {
		setActiveInput(!activeInput)
		setTimeout(() => {
			inputText.current.focus()
		}, 0)
	}

	const clearInput = () => {
		setInputTextValue('')
		setInputTitleValue('')
		setActiveColor('white')
		setVisibleColorList(false)
		setActiveInput(!activeInput)
	}

	const createTodo = (title, text) => {
		if (!inputTextValue.trim() && !inputTitleValue.trim()) {
			clearInput()
			setActiveInput(!activeInput)
			return
		}

		const color = activeColor

		const todo = {
			id: Math.random().toString(36).substr(2, 15),
			title,
			text,
			color
		}

		addTodo(todo)
		clearInput()
	}

	return (
		<div className="add-todo">
			{!activeInput && (
				<div className="add-todo__close" onClick={openInput}>
					<TextArea
						className="input"
						contentEditable="false"
						placeholder="Note text"
					/>
				</div>
			)}

			{activeInput && (
				<div
					className={'add-todo__open background-' + activeColor}
					ref={notePanel}
				>
					<ContentContainer>
						<TextArea
							className="input input-titlearea"
							contentEditable="true"
							placeholder="Enter title"
							input={inputTitle}
							setValue={setInputTitleValue}
						/>
						<TextArea
							className="input input-textarea"
							contentEditable="true"
							placeholder="Note text"
							input={inputText}
							setValue={setInputTextValue}
						/>
					</ContentContainer>

					{visibleColorList && (
						<ColorList
							setActiveColor={setActiveColor}
							activeColor={activeColor}
						/>
					)}

					<ButtonPanel>
						<button
							className="button"
							onClick={() => {
								createTodo(inputTitleValue, inputTextValue)
							}}
						>
							Add note
						</button>
						<button
							className="button"
							onClick={() => {
								setVisibleColorList(!visibleColorList)
							}}
						>
							Select color
						</button>
						<button className="button" onClick={clearInput}>
							Close
						</button>
					</ButtonPanel>
				</div>
			)}
			{activeInput && <div className="layout" onClick={clearInput} />}
		</div>
	)
}

export default AddTodo
