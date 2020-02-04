import Header from './header'
import Footer from './footer'

class Layout extends React.Component {
  render() {
    const { Component, ...pageProps } = this.props
    console.log(this.props, '--------')
    return (
      <div>
        <Header></Header>
        <Component {...pageProps}></Component>
        <Footer></Footer>
      </div>
    )
  }
}

export default Layout