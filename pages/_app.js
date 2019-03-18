import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import '../styles/spectre.styl'

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <title>next-demo</title>
          <meta charSet='utf-8' />
          <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0" />
          {/* <link rel="stylesheet" href="/static/vant.css" /> */}
        </Head>

        <Component {...pageProps} />

      </Container>
    )
  }
}
