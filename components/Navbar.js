/*
 * Navbar
 */
import React from 'react'


function Navbar (props) {

  function back () {
    history.go(-1)
  }

  return pug /*syntax:pug*/`

    section.nav-bar.hairline--bottom(style={zIndex:1})

      if props.hasBackBtn
        div.nav-bar__left(onclick=back)
          i.icon.icon-arrow-left.nav-bar__arrow
          span.nav-bar__text 返回

      div.nav-bar__title.ellipsis
        | ${props.title}

      div.nav-bar__right
        | ${props.rightBtn}

  `
}

export default Navbar