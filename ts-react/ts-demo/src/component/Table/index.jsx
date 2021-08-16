import React from 'react'
import { Table, Button } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [];
for (let i = 1; i < 3; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

data.push({
    key: 11,
    name: `Edward King`,
    age: 32,
    address: `London, Park Lane no.`,
})
data.push({
    key: 12,
    name: `Edward King`,
    age: 32,
    address: `London, Park Lane no.`,
})
data.push({
    key: 13,
    name: `Edward King`,
    age: 32,
    address: `London, Park Lane no.`,
})

class TableUnit extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    keys: []
  };

  componentDidMount() {
    let keys = this.getKey(data)
    this.setState({
        keys,
        selectedRowKeys: keys
    })
  }

  getKey = (data) => {
    return data.map(item => {
        return item.key
    })
  }

  formateArrData = (initialArr, name, newArr) => {
    // newArr是承接分类的新数组，整个initialArr处理完成之后，会根据不同的name生成一个二维数组
    // 判定传参是否符合规则
    if (!(initialArr instanceof Array) || !(newArr instanceof Array)) {
      return '请传入正确格式的数组'
    }
    if (!name) {
      return '请传入对象属性'
    }
    // 每一个类型的单独数组，注意此处不能return出每个alikeArr，
    // 因为递归的返回值只返回最后一次的值
    let alikeArr = []
    let propertyName = ''
    if (initialArr.length > 0) {
      propertyName = initialArr[0][`${name}`]
      let tempArr = []
      // 将拥有共同propertyName属性的对象放到此次遍历的alikeArr中，
      // 将其他的对象放入到tempArr中，等待下次遍历
      initialArr.forEach((val, key) => {
        if (val[`${name}`] === propertyName) {
          alikeArr.push(val)
        } else {
          tempArr.push(val)
        }
      })
      newArr.push(alikeArr)
      initialArr = tempArr
      return this.formateArrData(initialArr, name, newArr)
    } else {
      return newArr
    }
  }

  getData = (selectedRowKeys, selectedRowKeysAll) => {
    const selectedRowKey = selectedRowKeys.filter(item => {
        if (!selectedRowKeysAll.includes(item)){
            return item
        }
    })[0]
    const selectedRow = data.find(item => item.key === selectedRowKey)

    console.log(selectedRowKey, selectedRow, 'selectedRow')
    const arr = []
    for(let i = 0; i < data.length; i++) {
        if (data[i].name === selectedRow.name) {
            arr.push(data[i].key)
        }
    }
    return arr
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys, this.state.selectedRowKeys);
    if (selectedRowKeys.length <= 0) {
        this.setState({ selectedRowKeys: selectedRowKeys });
    }

    if (this.state.selectedRowKeys.length < selectedRowKeys.length) {
        const arr = this.getData(selectedRowKeys, this.state.selectedRowKeys)

        const isSelectedRowKeys = [...new Set([...selectedRowKeys, ...arr])]
        console.log(isSelectedRowKeys, 'key1')
        this.setState({ selectedRowKeys: isSelectedRowKeys });
    } else {
        const arr = this.getData(this.state.selectedRowKeys, selectedRowKeys)

        const isSelectedRowKeys = selectedRowKeys.filter(item => {
            if (!arr.includes(item)){
                return item
            }
        })
        console.log(isSelectedRowKeys, 'key2')
        this.setState({ selectedRowKeys: isSelectedRowKeys });
    }
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowKey={'key'} rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default TableUnit