/*
 * Modal
 */
import React from 'react'

function Modal (props) {

  return pug /*syntax:pug*/`
    section.z2(className=props.show ? 'block fade-enter-active' : 'hidden fade-leave-active ')

      //- mask
      .overlay.z3(onClick=props.onCancel)

      //- dialog
      .dialog.z4

        //- title
        .dialog__header #{props.title}

        //- content
        .dialog__content
          .dialog__message.dialog__message--has-title
          ${props.children}

        //- bottom
        .hairline--top.dialog__footer.dialog__footer--buttons
          button.button.button--default.button--large.dialog__cancel(onClick=props.onCancel)
            span.button__text 取消
          button.button.button--default.button--large.dialog__confirm.hairline--left(onClick=props.onOk)
            span.button__text 确认


    `
}

export default Modal
