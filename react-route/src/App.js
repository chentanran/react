import logo from './logo.svg';
import './App.css';
import { createBrowserHistory, createHashHistory, createMemoryHistory } from 'history'

function App() {
  // const history = createBrowserHistory({
  //   basename: "/foo/bar",
  //   getUserConfirmation: ("123", () => { console.log(123333) })
  // })

  // const href = history.createHref({
  //   pathname: '/path',
  //   search: '?the=query',
  //   hash: '#the-hash'
  // })

  // history.listen((location, action) => {
  //   console.log(location, action, 'action')
  // })

  // console.log(history.location.pathname, href, 'pathname')

  // history.push('/foo#name')
  // console.log(window.location.pathname, window.location.hash)
  // console.log(history.location.key)
  // history.block("确认是否跳转/foo？")
  // history.push('/ppp')

  // const history = createHashHistory()
  // const unlisten = history.listen(({location, action}) => {
  //   console.log(location, action, 'action')
  // })
  // history.push('/baz')
  // console.log(window.location.href)

  // history.push('/bar?name=1')
  // console.log(window.location.href)

  // unlisten()

  const history = createMemoryHistory()
  console.log(history.entries)
  console.log(history.index)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      </header>
    </div>
  );
}

export default App;
