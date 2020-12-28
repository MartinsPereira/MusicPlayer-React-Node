import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import imgHome from '../Assets/svg/home.svg'
import imgPlusWhite from '../Assets/svg/pluswhite.svg'
import imgPlus from '../Assets/svg/plus.svg'
import { GlobalContext} from './GlobalContext'
 
const Header = () => {
  const {menu, setMenu} = React.useContext(GlobalContext)
  const menus = React.useRef()
  const header = React.useRef()

  React.useEffect(() => {
    if(header.current){
      if(!menu){
        setMenu(false)
        header.current.classList.remove('show')
        menus.current.style.opacity = '0'
        setTimeout(() => {
          menus.current.classList.remove('show')
        }, 250);
      }else{
        setMenu(true)
        header.current.classList.add('show')
        menus.current.classList.add('show')
        setTimeout(() => {
          menus.current.style.opacity = '1'
        }, 250);
      }
    }
  },[menu])

  return (
    <header ref={header} className="header">
      <div className="container">
        <nav>
          <ul>
            <li onClick={() => setMenu((d) => !d)}><img src={imgPlusWhite} alt=""/></li>
          </ul>
          <ul ref={menus} className="menu">
            <li><Link to="/"><img src={imgHome} alt=""/></Link></li>
            <li><Link to="/cadastrar"><img src={imgPlus} alt=""/></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
