import {createStore, combineReducers} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// 导入 localstorage操作对象
import storage from 'redux-persist/lib/storage'

import testReducer from './reducer/testReducer'

// localstorage存储配置
const config = {
  key: 'xuexiRedux',
  storage
}

const rootReducer = combineReducers({
  testReducer
})

const pReducer = persistReducer(config, rootReducer)
const store = createStore(pReducer)
const persistor = persistStore(store)
// 构建初始化Store的函数，交给 next-redux-wrapper的withRedux 使用
const initStore = (initlState, options) => {
  return store
}

export default initStore

export {
  persistor
}