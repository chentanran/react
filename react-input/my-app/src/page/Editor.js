import React, { useEffect, useState } from "react";
import LEditor from '../component/LEditor'

const Editor = () => {
	const [content, setContent] = useState('12345662332442232')

	useEffect(() => {
		setTimeout(() => {
			setContent('哇哈哈真好喝')
		}, 1000)
	}, [])

	return (
		<>
			<LEditor
				editorContent={content}
				getContent={() => {}}
			></LEditor>
			<LEditor
				editorContent={content}
				getContent={() => {}}
			></LEditor>
		</>
	)
}

export default Editor