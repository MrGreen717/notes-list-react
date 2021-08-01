import React from 'react'
import Icon from './../Icon/Icon'

import './ColorList.scss'

const ColorList = ({ setActiveColor, activeColor }) => {
	const colors = [
		{
			id: 1,
			name: 'white'
		},
		{
			id: 2,
			name: 'grey'
		},
		{
			id: 3,
			name: 'green'
		},
		{
			id: 4,
			name: 'lime'
		},
		{
			id: 5,
			name: 'yellow'
		},
		{
			id: 6,
			name: 'blue'
		},
		{
			id: 7,
			name: 'red'
		},
		{
			id: 8,
			name: 'purple'
		},
		{
			id: 9,
			name: 'pink'
		}
	]

	return (
		<div className="color-list">
			{colors.map((color) => (
				<Icon
					onClick={() => {
						setActiveColor(color.name)
					}}
					key={color.id}
					color={color.name}
					active={activeColor}
					className={activeColor === color.name && 'active'}
				/>
			))}
		</div>
	)
}

export default ColorList
