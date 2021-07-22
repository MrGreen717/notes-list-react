import React from 'react'

const TextArea = ({
	className,
	contentEditable,
	placeholder,
	text,
	input,
	setValue
}) => {
	const getClearText = (e) => {
		e.preventDefault()
		let text = e.clipboardData.getData('text/plain')
		document.execCommand('insertText', false, text)
	}

	return (
		<div
			ref={input}
			className={className}
			contentEditable={contentEditable}
			placeholder={placeholder}
			suppressContentEditableWarning={true}
			spellCheck="false"
			role="textbox"
			aria-multiline="true"
			onPaste={(e) => getClearText(e)}
			onInput={() => setValue(input.current.outerText)}
		>
			{text}
		</div>
	)
}

export default TextArea
