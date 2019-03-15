/*
 * Modal
 */
import React, { useState, useEffect } from 'react'

function Modal (props) {

  const [active, setActive] = useState(false)

  useEffect(_ => {
    setActive(true)
  }, [props])

  function closeModal () {
    setActive(false)
  }

  return pug /*syntax:pug*/`
    section.dn(className=active ? 'block' : 'hidden')

      //- dialog
      .dialog(style={zIndex: 2037})
        //- title
        .dialog__header ${props.title}
        //- content
        .dialog__content
          .dialog__message.dialog__message--has-title
            //- 有赞是一家零售科技公司，致力于成为商家服务领域里最被信任的引领者
          form#add-plan-form.form-horizontal
            .cell.field
              .cell__title.field__label
                span 计划名称
              .cell__value
                .field__body
                  input.field__control(type='text', name='plan-name', placeholder='请输入计划名称')
            .cell.field
              .cell__title.field__label
                span 开始时间
              .cell__value
                .field__body
                  input.field__control(type='time', name='plan-stime', placeholder='请输入开始时间')
            .cell.field
              .cell__title.field__label
                span 结束时间
              .cell__value
                .field__body
                  input.field__control(type='time', name='plan-etime', placeholder='请输入结束时间')
        //- bottom
        .hairline--top.dialog__footer.dialog__footer--buttons
          button.button.button--default.button--large.dialog__cancel(onClick=closeModal)
            span.button__text 取消
          button.button.button--default.button--large.dialog__confirm.hairline--left(onClick=closeModal)
            span.button__text 确认

      //- mask
      .overlay(onClick=closeModal, style={zIndex: 2036})

    `
}

export default Modal
