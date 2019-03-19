/*
 * Index
 */
import React, { useState, useEffect } from 'react'
import { store as createStore, view } from 'react-easy-state'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import Placeholder from '../components/Placeholder'
import { useFormState } from 'react-use-form-state'
import useTimeout from 'react-use/lib/useTimeout'
import Button from 'vant/lib/button'
import Dialog from 'vant/lib/dialog'
import NavBar from 'vant/lib/nav-bar'
import { VueWrapper } from 'vuera'

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
  const { data } = (await axios.get('http://api2.diandianyy.com/cli/rest/user'))
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { users: data, userAgent }
}


// useHook
function Count1(props) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return pug /*syntax:pug*/ `
    VueWrapper(component=Button,type="primary") I'm Vant!
    if props.showGreeting
      p.greeting.red Hello #{props.name}!
    button.btn(
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

  return pug /*syntax:pug*/ `
    //- button.btn.btn-primary(onClick=()=>setShow(true)) 显示Modal
    -
      const handleClick = () =>  {
        Dialog.alert({
          title: '标题',
          message: '弹窗内容',
          closeOnClickOverlay: true
        }).then(() => {
        })
      }
    button.btn.btn-primary(onClick=handleClick) 显示Modal

    -
      const submit = () => {
        console.log(formState.values)
        setShow(false)
      }
    //- Modal(title='提示' show=show onCancel=()=>setShow(false) onOk=submit)

    form#add-plan-form.form-horizontal
      .form-group
        .form-label 计划名称
        input.form-input(...text('title') placeholder='请输入计划名称' autoFocus)
      .form-group
        .form-label 开始时间
        input.form-input(...time('stime') placeholder='请输入开始时间')
      .form-group
        .form-label 结束时间
        input.form-input(...time('etime') placeholder='请输入结束时间')
      .form-group
        label.form-switch
          input(type="checkbox")
          i.form-icon
          | Send me emails with news and tips
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
      div
        div.my2.p2.f3.b.bg-primary.br3 #{store.count}
        button.f4.fixed.bb.vh3(onClick=store.increment) +

      //- place
      div.my2.j-between
        div.c3 #{store.place}
  `
}
Count2 = view(Count2)


// main
function Main(props) {
  const loaded = useTimeout(1000)

  return pug/*syntax:pug*/`

    VueWrapper(component=NavBar title='首页' left-text='返回' left-arrow='' @click-left='onClickLeft' @click-right='onClickRight')
    .fade-enter-active.container
      //- Navbar(title='首页', hasBackBtn=false)

      if !loaded
        Placeholder(css='m2 pt2')
      else
        div.pt2
          Count1(showGreeting, name='xjp')
          Count2
          p #{props.userAgent}
          p #{props.users[0].name}
        AddPlanModal
  `
}
Main.getInitialProps = getInitialProps


export default Main
