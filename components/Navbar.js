/*
 * Navbar
 */
import React from 'react'


function Navbar (props) {

  function back () {
    history.go(-1)
  }

  return pug/*syntax:pug*/`

    .nav-bar.hairline--bottom.z1

      if(props.hasBackBtn)
        .nav-bar__left(onclick=back)
          i.icon.icon-arrow-left.nav-bar__arrow
          span.nav-bar__text 返回

      .nav-bar__title.ellipsis
        | ${props.title}

      .nav-bar__right
        | ${props.rightBtn}
  `
}

export default Navbar
