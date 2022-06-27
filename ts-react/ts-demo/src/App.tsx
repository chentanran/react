import React, { useEffect, useRef } from 'react';
import { Select, Cascader, Input } from 'antd';
import 'antd/dist/antd.css'
import './index.css'
import TableUnit from './component/Table/index'
// import TreeDemo from './component/Tree/index'
import Upload from './component/Upload/index'

const { Option } = Select;


function App() {

  useEffect(() => {
  })


  return (
    <div className="App" >
      {/* <TableUnit></TableUnit> */}
      <Upload />
    </div>
  );
}

export default App;
