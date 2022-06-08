import React from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { LinkStyled, NavList } from './Nav.styled'

const LINKS=[
  {to:'/',text:'Home'},
  {to:'/starred', text:'Starred'}
]

  function Navs() {
    const Location=useLocation()
    return (
      <div>
        <NavList>
          {
            LINKS.map(item=>(<li key={item.to}><LinkStyled to={item.to} className={item.to===Location.pathname?'active': ''}>{item.text}</LinkStyled></li>))
          }
        </NavList>
      </div>
    )
  }

export default Navs
