import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Logo } from './component/Logo'
import { TodoInput } from './component/Todo/TodoInput'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo logo={logo} className="App-logo" alt="logo"></Logo>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <TodoInput handleSubmit={() => '123'}></TodoInput> */}
      </header>
    </div>
  );
}

export default App;
