import React from 'react';
import Hello from './component/Helloword'
import Button, { ButtonSize, ButtonType } from './component/Button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
