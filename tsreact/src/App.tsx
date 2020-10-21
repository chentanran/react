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
import Upload, {UploadFile} from './component/Upload/upload'

library.add(faCoffee, faCheckSquare)

interface RenderOption {
  value: string;
  number: number;
}

function App() {
  const defaultFileList: UploadFile[] = [
    { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
    { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
    { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
  ]

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
      <div>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          defaultFileList={defaultFileList}
          name="fileName"
          drag
          data={{'key': 'value'}}
          headers={{'X-Powered-By': 'vikingship'}}
          onProgress={(arr, file) => {
            console.log(arr, file, '--------')
          }}
          onSuccess={(arr, file) => {
            console.log(arr, file, '..........')
          }}
          onError={(err, file) => {
            console.log(err, file, ';;;;;;;;;;;;;;;')
          }}
        >
          <p style={{textAlign: 'center'}}>iiii</p>
        </Upload>
      </div>
    </div>
  );
}

export default App;
