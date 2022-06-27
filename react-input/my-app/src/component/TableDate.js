import React from 'react'
import { Table } from 'antd'

const TableCom = () => {
	const columns = [
		{
			title: 'index',
			dataIndex: 'normId',
			sorter: (a, b) => {
				console.log(a, b, 'aaaanbbb')
				return a.normId - b.normId
			}
		},
		{
			title: 'num',
			dataIndex: 'num',
			defaultSortOrder: 'descend',
			sorter: (a, b) => (new Date(a.num).getTime()) - (new Date(b.num).getTime())
		},
		{
			title: 'name',
			dataIndex: 'name',
		}
	]

	const data = [
		{
			key: '1',
			normId: 971,
			num: '2022-05-06 09:45:06',
		},
		{
			key: '2',
			normId: 973,
			num: '2022-05-06 09:45:08'
		},
		{
			key: '3',
			normId: 972,
			num: '2022-05-06 09:45:07'
		}
	]

	return (
		<Table 
			columns={columns}
			dataSource={data}
		/>
	)
}

export default TableCom