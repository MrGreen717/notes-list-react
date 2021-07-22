import React from 'react'
import TodoItem from './../TodoItem/TodoItem'
import Masonry from 'react-masonry-component'

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
	return (
		<ul>
			<Masonry className="todo-grid">
				{todos.map((todo) => (
					<TodoItem
						todo={todo}
						key={todo.id}
						id={todo.id}
						title={todo.title}
						text={todo.text}
						updateTodo={updateTodo}
						deleteTodo={deleteTodo}
					/>
				))}
			</Masonry>
		</ul>
	)
}

export default TodoList
