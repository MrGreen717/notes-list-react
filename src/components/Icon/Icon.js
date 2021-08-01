import React from 'react'
import './Icon.scss'

const Icon = ({ color, onClick, className }) => {
	return (
		<i
			onClick={onClick}
			className={'color background-' + color + ' ' + className}
		></i>
	)
}

export default Icon
