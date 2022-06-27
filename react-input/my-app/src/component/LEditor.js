import React, { useEffect, useRef } from "react";
import LEditor from 'wangeditor'

let editor = ''
const Editor = (props) => {
	const { getContent, editorContent, disabled } = props

	const isCursor = disabled ? 'not-allowed' : 'unset'
	const isPointer = disabled ? 'none' : 'unset'
	const menuRef = useRef()
	const bodyRef = useRef()

	useEffect(() => {
		const elemMenu = menuRef.current
		const elemBody = bodyRef.current
		editor = new LEditor(elemMenu, elemBody)
		editor.config.onchange = () => {
			const textValue = editor.txt.html()

			getContent(textValue)
		}

		editor.config.menus = [
			"head",
			"bold",
			"fontSize",
			"fontName",
			"italic",
			"underline",
			"strikeThrough",
			"foreColor",
			"backColor",
			"link",
			"list",
			"justify",
			"quote",
			"emoticon",
			"undo",
			"redo"
		]
		editor.config.uploadImgShowBase64 = true
		editor.config.focus = !disabled
		editor.create()
	}, [])

	useEffect(() => {
		if (editor && editorContent) {
			if (editorContent !== editor.txt.html()) {
				editor.txt.html(editorContent)
			}
		} else {
			editor.txt.html('')
		}
	}, [editor && editorContent])

	return (
		<div className="contentArea" style={{ cursor: isCursor }}>
			<div 
				id="ContentElementMenu"
				style={{
					height: 100,
					backgroundColor: '#fff',
					border: '1px solid #edf1fa',
					PointerEvents: isPointer
				}}
				ref={menuRef}
			></div>
			<div 
				id="ContentElementBody"
				style={{
					height: 132,
					borderTop: "none",
					border: '1px solid #edf1fa',
					PointerEvents: isPointer
				}}
				ref={bodyRef}
			></div>
		</div>
	)
}

export default Editor