import React, { useState, useEffect } from 'react'
import './index.less'

function User() {
    const [username, usrUsername] = useState('pengzehua')
    useEffect (() => {

    })

    
  return (
    <div className="user">
        <div className="header-logo fl">
        <section> <span>辉翼平台系统</span></section>
      </div>
      <ul className="header-content fr clearfix">
        <li className="header-logout fr">退出系统</li>
        <li className="header-user fr">
          {/* <img src="../publics/common/img/ico3.png" alt="" /> */}
          <span>{username}</span>
        </li>
      </ul>
    </div>
  )
}

export default User
