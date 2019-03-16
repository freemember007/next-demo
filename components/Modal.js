/*
 * Modal
 */
import React, { useState, useEffect } from 'react'

function Modal (props) {

  return pug /*syntax:pug*/`
    section.z1(className=props.show ? 'block fade-enter-active' : 'hidden fade-leave-active ')

      //- dialog
      .dialog.z4
        //- title
        .dialog__header ${props.title}
        //- content
        .dialog__content
          .dialog__message.dialog__message--has-title

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
          button.button.button--default.button--large.dialog__cancel(onClick=props.onHide)
            span.button__text 取消
          button.button.button--default.button--large.dialog__confirm.hairline--left(onClick=props.onHide)
            span.button__text 确认

      //- mask
      .overlay.z3(onClick=props.onHide)

    `
}

export default Modal
