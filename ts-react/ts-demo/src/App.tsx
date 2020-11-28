import React, { useEffect, useRef } from 'react';
import { Select, Cascader } from 'antd';
import 'antd/dist/antd.css'
import './index.css'

const { Option } = Select;


function App() {
  const selectRef = useRef<any>()

  useEffect(() => {
    console.log(selectRef, 'selectRef')
  })

  const options = [
    {
      value: 'zhejiangqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
      label: 'Zhejiangwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      children: [
        {
          value: 'hangzhoueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          label: 'Hangzhourrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
          children: [
            {
              value: 'xihuttttttttttttttttttttttttttttttttttttttttttttttt',
              label: 'West Lakeyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsuaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      label: 'Jiangsusssssssssssssssssssssssssssssssssssssssssssssssssss',
      children: [
        {
          value: 'nanjingdddddddddddddddddddddddddddddddddddddddddddddddddd',
          label: 'Nanjingfffffffffffffffffffffffffffffffffffffffffffffffffffff',
          children: [
            {
              value: 'zhonghuamenxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
              label: 'Zhong Hua Mencccccccccccccccccccccccccccccccccccccccccccccc',
            },
          ],
        },
      ],
    },
  ];
  
  function onChange(value: any) {
    console.log(value);
  }

  return (
    <div className="App" >
      <Select ref={selectRef} defaultValue="lucy" style={{ width: 300 }}>
        <Option value="jack" style={{ width: 300 }} >Jack11111111111111111111111111111111111111111111111111111111111111111111111111</Option>
        <Option value="lucy" style={{ width: 300 }} >Lucy</Option>
        <Option value="disabled" disabled style={{ width: 300 }} >
          Disabled
        </Option>
        <Option value="Yiminghe" style={{ width: 300 }} >yiminghe</Option>
      </Select>
      <div>----------------------------------</div>
      <Cascader 
        options={options} 
        onChange={onChange} 
        placeholder="Please select"
        style={{
          maxWidth: 230
        }} 
      />,
    </div>
  );
}

export default App;
