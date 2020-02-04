import App from 'next/app'
import React from 'react'
import Layout from '../components/layout/layout'
import withRedux from 'next-redux-wrapper'
import initStore, {persistor} from '../store'
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux'

require('es6-promise').polyfill()
import 'isomorphic-fetch'

class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render () {
    const {Component, store, ...pageProps} = this.props
    // console.log(pageProps)
    return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Layout Component={Component} {...pageProps}></Layout>
          </PersistGate>
        </Provider>
    )
  }
}

export default withRedux(initStore)(MyApp)