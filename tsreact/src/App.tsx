import React from 'react';
import Hello from './component/Helloword'
import Button, { ButtonSize, ButtonType } from './component/Button/button'
import Menu from './component/Menu/Menu'
import MenuItem from './component/Menu/MenuItem'
import SubMenu from './component/Menu/SubMenu'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu >
          <SubMenu title="子菜单">
            <MenuItem>娃哈哈</MenuItem>
            <MenuItem>爽歪歪</MenuItem>
          </SubMenu>
          <MenuItem>娃哈哈</MenuItem>
          <MenuItem>爽歪歪</MenuItem>
          <MenuItem>看看看</MenuItem>
          <MenuItem>听听听</MenuItem>
        </Menu>
        <Button
          size={ButtonSize.Large}
          btnType={ButtonType.Link}
          href="http://www.baidu.com"
        >娃哈哈</Button>
        <Button
          disabled
        >
          爽歪歪
        </Button>
      </header>
      
    </div>
  );
}

export default App;
