import React from 'react'
import { Table } from 'antd'

const TableCom = () => {
	const columns = [
		{
			title: 'index',
			dataIndex: 'normId'
		},
		{
			title: 'num',
			dataIndex: 'num'
		},
		{
			title: 'name',
			dataIndex: 'name',
			onCell: (_, index) => {
				// return { rowSpan: '2' }
			}
		},
		{
			title: 'content',
			dataIndex: 'content',
		},
		{
			title: 'rule',
			dataIndex: 'rule'
		}
	]

	const data = [
		{
			key: '1',
			normId: '97',
			num: 1,
			name: '考勤制度',
			content: '个人出勤',
			rule: '刺刀'
		},
		{
			key: '2',
			normId: '97',
			num: 1,
			name: '考勤制度',
			content: '百分比',
			rule: '刺刀'
		},
		{
			key: '3',
			normId: '97',
			num: 1,
			name: '考勤制度',
			content: '个人出勤',
			rule: '刺刀',
		},
		{
			key: '4',
			normId: '97',
			num: 1,
			name: '考勤制度',
			content: '文档质量',
			rule: '刺刀'
		},
		{
			key: '5',
			normId: '97',
			num: 1,
			name: '考勤制度',
			content: '个人出勤',
			rule: '刺刀'
		},
		{
			key: '6',
			normId: '97',
			num: 1,
			name: '考勤制度',
			content: '其他指标',
			rule: '刺刀'
		},
		{
			key: '7',
			normId: '97',
			num: 1,
			name: '考勤制度',
			content: '个人出勤',
			rule: '刺刀'
		},
		{
			key: '8',
			normId: '97',
			num: 1,
			name: '考勤制度',
			content: '个人出勤',
			rule: '刺刀'
		},
		{
			key: '9',
			normId: '97',
			num: 1,
			name: '考勤制度',
			content: '都删掉',
			rule: '刺刀'
		},
		{
			key: '10',
			normId: '97',
			num: 1,
			name: '考勤制度',
			content: '个人出勤',
			rule: '刺刀'
		},
	]

	const get = () => {
		let list = ['name', 'content']
		let arr = []
		list.map(field => {
			let count = 0
			let indexCount = 1
			while(indexCount < data.length) {
				let item = data.slice(count, count + 1)[0]
				if (!item[`${field}rowSpan`]) {
					item[`${field}rowSpan`] = 1
				}
				if (item[field] === data[indexCount][field]){
					item[`${field}rowSpan`]++
					data[indexCount][`${field}rowSpan`] = 0
				} else {
					count = indexCount
				}
				indexCount++
			}
			arr = data
		})
		console.log(arr)
	}

	get()

	return (
		<Table 
			columns={columns}
			dataSource={data}
		/>
	)
}

export default TableCom