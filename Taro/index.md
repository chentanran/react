1. 全局安装 taro
```javascript
  yarn global add @tarojs/cli
```
2. 创建 脚手架
```javascript
  taro init 文件名
```
3. 打开程序
```javascript
  yarn dev:h5
```
4. Taro 导航 api
```javascript
  navigateTo: 最基本的跳转方式，可以返回上级页面。三端都支持的，小程序、H5、React Native。
  redirectTo：不记录上集页面，直接跳转。三端都支持的，小程序、H5、React Native。
  switchTab： Tab之间进行切换，这个要配合Taro的导航栏一起使用，三端都支持的，小程序、H5、React Native。
  navigateBack: 返回上一级页面，这个在小程序中常使用，三端都支持的，小程序、H5、React Native。
  relaunch：关闭所有额面，打开到应用内某个页面。三端都支持的，小程序、H5、React Native。
  getCurrentPages:获取当前页面信息所用，这个H5是不支持的。（注意
```

报错信息
```javascript
  1. Node Sass could not find a binding for your current environment: Windows 64-bit with Node.js 12.x
  解决方法: cnpm i node-sass
```