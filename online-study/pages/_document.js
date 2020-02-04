import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/css/base.css"></link>
          <link rel="stylesheet" href="/css/antd.css"></link>
        </Head>
        <body className="custom_class w">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}