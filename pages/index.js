/*
 * Index
 */
import React, { useState, useEffect } from 'react'
import { store as createStore, view } from 'react-easy-state'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import PlaceHolder from '../components/PlaceHolder'
import { useFormState } from 'react-use-form-state'
import useTimeout from 'react-use/lib/useTimeout'


// store
const store = createStore({
  count: 0, //计数器
  place: '定位中...', //当前地点

  // 计数器增加
  increment() {
    store.count++
  },

  // 获取位置
  async getPlace() {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
    store.place = 'hangzhou'
  }

})


// getInitialProps
async function getInitialProps ({ req }) {
  console.log('req.url', req.url)
  const users = (await axios.get('http://api2.diandianyy.com/cli/rest/user')).data
  console.log(users[0].name)
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { users, userAgent }
}


// useHook
function Count1(props) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return pug/*syntax:pug*/`

      if props.showGreeting
        p.greeting.red Hello #{props.name}!
      button(
        onClick=()=>setCount(count+1)
      ) #{count} Click Me
  `
}


// AddPlanModal
function AddPlanModal () {
  const [show, setShow] = useState(false)
  const [formState, { text, time }] = useFormState({
    title: '7点吃饭',
    stime: '07:30',
    etime: '10:30',
  })

  const submit = () => {
    console.log(formState.values)
    setShow(false)
  }

  return pug /*syntax:pug*/ `
    button.f4.fixed.bb.vh3(onClick=()=>setShow(true)) 显示Modal
    Modal(title='提示', show=show, onCancel=()=>setShow(false), onOk=submit)
      form#add-plan-form.form-horizontal
        .cell.field
          .cell__title.field__label
            span 计划名称
          .cell__value
            .field__body
              input.field__control(...text('title') placeholder='请输入计划名称' autoFocus)
        .cell.field
          .cell__title.field__label
            span 开始时间
          .cell__value
            .field__body
              input.field__control(...time('stime') placeholder='请输入开始时间')
        .cell.field
          .cell__title.field__label
            span 结束时间
          .cell__value
            .field__body
              input.field__control(...time('etime') placeholder='请输入结束时间')

  `
}
AddPlanModal = view(AddPlanModal)


// useStore
function Count2(props){
  useEffect(() => {
    store.getPlace()
  })

  return pug/*syntax:pug*/`

      //- 计数器
      div.p2.m2
        div.m2.f3.b.bg-primary.br3 #{store.count}
        button.f4.fixed.bb.vh3(onClick=store.increment) +

      //- place
      div.p2.m2.j-between
        div.m2.c3 #{store.place}
  `
}
Count2 = view(Count2)


// main
function Main(props) {
  const loaded = useTimeout(1000)

  return pug/*syntax:pug*/`

    .fade-enter-active
      Navbar(title='首页', hasBackBtn=false)
      if !loaded
        PlaceHolder(css='m2 pt2')
      else
        div.p4
          Count1(showGreeting, name='xjp')
          Count2
          p #{props.userAgent}
          p #{props.users[0].name}
        AddPlanModal
  `
}
Main.getInitialProps = getInitialProps


export default Main
