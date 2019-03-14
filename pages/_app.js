import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import '../styles/base.styl'

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <title>next-demo</title>
          <meta charSet='utf-8' />
          <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0" />
          <link rel="stylesheet" href="/static/vant.css" /> {/* vant-ui纯css部分, 压缩后size:65kb */}
        </Head>

        <Component {...pageProps} />

      </Container>
    )
  }
}