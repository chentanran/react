import React, { useEffect, useRef } from "react";
import LEditor from 'wangeditor'


const Editor = (props) => {
	const { getContent, editorContent, disabled } = props
	const editor = useRef()

	const isCursor = disabled ? 'not-allowed' : 'unset'
	const isPointer = disabled ? 'none' : 'unset'
	const menuRef = useRef()
	const bodyRef = useRef()

	useEffect(() => {
		const elemMenu = menuRef.current
		const elemBody = bodyRef.current
		editor.current = new LEditor(elemMenu, elemBody)
		editor.current.config.onchange = () => {
			const textValue = editor.current.txt.html()

			getContent(textValue)
		}

		editor.current.config.menus = [
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
		editor.current.config.uploadImgShowBase64 = true
		editor.current.config.focus = !disabled
		editor.current.create()
	}, [])

	useEffect(() => {
		if (editor.current && editorContent) {
			if (editorContent !== editor.current.txt.html()) {
				editor.current.txt.html(editorContent)
			}
		} else {
			editor.current.txt.html('')
		}
	}, [editor.current && editorContent])

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