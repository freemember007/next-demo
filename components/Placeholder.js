/*
 * Placeholder
 */
import React from 'react'


function Placeholder (props) {

  return pug/*syntax:pug*/`

    .ph-item.fade-enter-active(className=props.css)
      .ph-col-12
        .ph-picture
      .ph-col-2
        .ph-avatar
      div
        .ph-row
          .ph-col-4
          .ph-col-8.empty
          .ph-col-6
          .ph-col-6.empty
          .ph-col-2
          .ph-col-10.empty
      .ph-col-12
        .ph-row
          .ph-col-10.big
          .ph-col-2.empty.big
          .ph-col-4
          .ph-col-8.empty
          .ph-col-6
          .ph-col-6.empty
          .ph-col-12
  `
}

export default Placeholder
