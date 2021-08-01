import React, { useState } from 'react'
import TodoList from './components/TodoList/TodoList'
import AddTodo from './components/AddTodo/AddTodo'

function App() {
	const getData = JSON.parse(localStorage.getItem('todos'))
	const [todos, setTodos] = useState(getData || [])

	const addTodo = (obj) => {
		const newTodosArr = [...todos, obj]
		setTodos(newTodosArr)
		localStorage.setItem('todos', JSON.stringify(newTodosArr))
	}

	const updateTodo = (obj) => {
		const findTodo = todos.find((todo) => todo.id === obj.id)
		findTodo.title = obj.title
		findTodo.text = obj.text
		findTodo.color = obj.color
		setTodos([...todos])
		localStorage.setItem('todos', JSON.stringify([...todos]))
	}

	const deleteTodo = (id) => {
		const newArr = todos.filter((el) => el.id !== id)
		setTodos(newArr)
		localStorage.setItem('todos', JSON.stringify(newArr))
	}

	return (
		<div>
			<div>
				<AddTodo addTodo={addTodo} />
			</div>
			<div>
				<div className="list-title">
					<h2>Your notes: </h2>
				</div>
				{todos.length === 0 && (
					<div className="list-title-empty">
						<h2>Add some note...</h2>
					</div>
				)}
				<TodoList
					todos={todos}
					updateTodo={updateTodo}
					deleteTodo={deleteTodo}
				/>
			</div>
		</div>
	)
}

export default App
