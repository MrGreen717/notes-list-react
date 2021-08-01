import React, { useRef, useState } from 'react'
import TextArea from '../TextArea/TextArea'
import './TodoItem.scss'
import ColorList from './../ColorList/ColorList'
import ButtonPanel from './../ButtonPanel/ButtonPanel'
import ContentContainer from './../ContentContainer/ContentContainer'

const TodoItem = ({ title, text, id, updateTodo, deleteTodo, color }) => {
	const [activeColor, setActiveColor] = useState(color)
	const [visibleColorList, setVisibleColorList] = useState(false)
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

	const updateTodoHandler = (title, text, color) => {
		const todo = {
			id,
			title,
			text,
			color
		}
		updateTodo(todo)
	}

	const confirmUpdate = () => {
		setEditTodo(!editTodo)
		setVisibleColorList(false)
		updateTodoHandler(
			inputTitleValue.trim(),
			inputTextValue.trim(),
			activeColor
		)
	}

	return (
		<>
			{!editTodo && (
				<li
					className={'todo-close todo-' + activeColor}
					onClick={openInput}
					draggable="true"
					ref={card}
				>
					{text === '' && title === '' && (
						<TextArea
							className="todo-close__empty-todo"
							contentEditable="false"
							text={title}
							placeholder="Empty note"
						/>
					)}
					{title === '' && text !== '' && (
						<TextArea className="input" contentEditable="false" text={text} />
					)}
					{text === '' && title !== '' && (
						<TextArea
							className="input input-title"
							contentEditable="false"
							text={title}
						/>
					)}
					{text !== '' && title !== '' && (
						<>
							<TextArea
								className="input input-title"
								contentEditable="false"
								text={title}
							/>

							<TextArea className="input" contentEditable="false" text={text} />
						</>
					)}
				</li>
			)}
			{editTodo && (
				<div className={'todo-open todo-' + activeColor}>
					<ContentContainer>
						<TextArea
							input={inputTitle}
							className="input input-title"
							contentEditable="true"
							text={title}
							setValue={setInputTitleValue}
						/>
						<TextArea
							input={inputText}
							className="input"
							contentEditable="true"
							text={text}
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
								setVisibleColorList(!visibleColorList)
							}}
						>
							Change color
						</button>
						<button className="button" onClick={() => deleteTodo(id)}>
							Delete note
						</button>
					</ButtonPanel>
				</div>
			)}
			{editTodo && <div className="layout" onClick={confirmUpdate} />}
		</>
	)
}

export default TodoItem
