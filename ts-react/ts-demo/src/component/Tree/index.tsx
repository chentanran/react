import React, { useState, useRef } from 'react';
import { Tree, Dropdown, Menu, Input  } from 'antd';
import { CarryOutOutlined, EditOutlined } from '@ant-design/icons';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [],
  },
  {
    title: 'parent 2',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined /> },
          { title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined /> },
        ],
      },
    ],
  },
];

const TreeDemo: React.FC<{}> = () => {
  const inputRef = useRef<any>()
  const currentData = useRef()

  const [visible, setVisible] = useState(false)
  const [nodes, setNode] = useState<null | { key: string }>(null)
  const [treeDatas, setTreeDatas] = useState(treeData)
  const [key, setKey] = useState<number>(new Date().getTime())
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['0-0', '0-1', '0-1-0'])
  const [inputValue, setInputValue] = useState<string>('')

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    // console.log('selected', selectedKeys, info);
  };
  
  const onRightClick = (event: any, node: any) => {
    setVisible(true)
    setNode(node)
  }

  const editTreeData = (isTreeDatas: any, key: string, type: 'edit' | 'detail', value: string) => {
    for(let i = 0; i < isTreeDatas.length; i++) {
      if (isTreeDatas[i].key === key) {
        if (type === 'edit') {
          isTreeDatas[i].title = (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input defaultValue={value} ref={inputRef} />
              <EditOutlined onClick={() => {editTreeData(treeDatas, key, 'detail', inputRef.current.state.value)}} />
            </div>
          )
        } else {
          isTreeDatas[i].title = (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>{value}</div>
              <EditOutlined onClick={() => {editTreeData(treeDatas, key, 'edit', value)}} />
            </div>
          )
        }
        setKey(new Date().getTime())
      } else if (isTreeDatas[i].children) {
        editTreeData(isTreeDatas[i].children, key, type, value)
      }
    }
  }

  const deepLoop = (isTreeDatas: any, key: string) => {
    for(let i = 0; i < isTreeDatas.length; i++) {
      if (isTreeDatas[i].key === key && isTreeDatas[i].children) {
        const time = new Date().getTime().toString()
        isTreeDatas[i].children.push({
          title: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input placeholder="Basic usage" ref={inputRef} />
              <EditOutlined onClick={() => {
                editTreeData(treeDatas, time, 'detail', inputRef.current.state.value)
              }} 
              />
            </div>
          ),
          key: time,
          icon: <CarryOutOutlined />,
          children: [],
        })
        setExpandedKeys([...expandedKeys, time])
      } else if (isTreeDatas[i].children) {
        deepLoop(isTreeDatas[i].children, key)
      }
    }
  }

  const addTreeNode = () => {
    if (nodes) {
      const key = nodes && nodes.key as string
      deepLoop(treeDatas, key)
     
      setKey(new Date().getTime())
    }
    
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={() => { 
          setVisible(false) 
          addTreeNode()
        }}>
          新增节点
        </div>
      </Menu.Item>
      <Menu.Item key="1">
        <div onClick={() => { setVisible(false) }}>
          删除节点
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div onClick={() => { setVisible(false) }}>
      <Tree
        key={key}
        showLine={true}
        expandedKeys={expandedKeys}
        onSelect={onSelect}
        treeData={treeDatas}
        onRightClick={({ event, node }) => onRightClick(event, node)}
      />
      <Dropdown overlay={menu} trigger={['click']} visible={visible}>
        <div style={{ width: 200 }}>
        </div>
      </Dropdown>
    </div>
  );
}

export default TreeDemo