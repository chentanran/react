import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import Button, { ButtonSize, ButtonType } from './component/Button/button'
import Menu from './component/Menu/Menu'
import MenuItem from './component/Menu/MenuItem'
import SubMenu from './component/Menu/SubMenu'
import Icon from './component/Icon/icon'
import Input from './component/Input/input'
import AutoComplete, { DataSourceType } from './component/AutoComplete/autoComplete'

library.add(faCoffee, faCheckSquare)

interface RenderOption {
  value: string;
  number: number;
}

function App() {

  const lakers = [
    { value: 'qqq', number: 1 },
    { value: 'www', number: 2 },
    { value: 'eee', number: 3 },
    { value: 'rrr', number: 4 },
    { value: 'ttt', number: 5 },
    { value: 'yyy', number: 6 },
  ]

  // const lakers = ['111', '222', '333', '444', '555', '666', '777']

  // const handleFetch = (query: string) => {
  //   return lakers.filter(player => player.value.includes(query))
  // }

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items)
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }

  const renderOption = (item: DataSourceType) => {
    const itemOption = item as DataSourceType<RenderOption>
    return (
      <h2>{itemOption.value}</h2>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <Menu>
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
      <div>
      </div>
      <Input 
        size='lg'
        disabled={false}
        prepand={'wahaha'}
        append={'ssss'}
      />
      <div>--------------------------</div>
      <div>
        <AutoComplete
          fetchSuggestions={handleFetch}
          renderOption={renderOption}
        />
      </div>
    </div>
  );
}

export default App;
