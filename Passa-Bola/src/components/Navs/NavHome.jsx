import React from 'react'
import Button1 from '../buttons/Button1'
import Button2 from '../buttons/Button2'

const NavHome = () => {
  return (
    <nav className='w-full'>
        <p>Passa Bola</p>
        <ul>
            <li>Sobre Nós</li>
            <li>Contato</li>
        </ul>
        <Button1 text = "botão" />
        <Button2/>
        <Button2 color="2"/>
    </nav>
  )
}

export default NavHome