import React from "react";
import LEditor from '../component/LEditor'

const Editor = () => {
	return (
		<>
			<LEditor
				editorContent={'12345662332442232'}
				getContent={() => {}}
			></LEditor>
			<LEditor
				editorContent={'asadsffgdfdfsdsdasa'}
				getContent={() => {}}
			></LEditor>
		</>
	)
}

export default Editor