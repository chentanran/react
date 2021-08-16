import React, { useEffect, useRef } from 'react';
import { Select, Cascader, Input } from 'antd';
import 'antd/dist/antd.css'
import './index.css'
import TableUnit from './component/Table/index'
import TreeDemo from './component/Tree/index'

const { Option } = Select;


function App() {

  useEffect(() => {
  })


  return (
    <div className="App" >
      {/* <TableUnit></TableUnit> */}
      <TreeDemo />
    </div>
  );
}

export default App;
