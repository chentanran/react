import React, { useRef } from 'react'
import { Tree } from 'antd'
// import { Tree as AntdTree } from 'kotomi-ui'

const SelectTree = () => {

  // const treeRef = useRef()

  return (
    <>
      <Tree
        loadData={async (data) => {
            if (data === undefined) {
                return [{
                    title: '节点-1',
                    key: '1',
                    dataRef: 1,
                    children: []
                }]
            }
            const newData = JSON.parse(JSON.stringify(data))
            // newData.key = data.dataRef + 1
            // newData.dataRef = data.dataRef + 1
            // newData.title = `节点-${data.dataRef + 1}`
            // if (data.dataRef === 10) {
            //     return []
            // }
            return [newData]
        }}
      />
    </>
  )
}
export default SelectTree