import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import imgHome from '../Assets/svg/home.svg'
import imgAlbum from '../Assets/svg/music-album.svg'
import imgMusic from '../Assets/svg/AddMusic.svg'
import imgLogout from '../Assets/svg/logout.svg'
import imgPlaylist from '../Assets/svg/Playlist.svg'
import { GlobalContext} from './GlobalContext'
import CadastrarPlaylist from './Cadastrar/CadastrarPlaylist'
import ListaPlayList from './Listagem/ListaPlayList'
 
const Header = () => {
  const {login, logout} = React.useContext(GlobalContext)
  const menus = React.useRef()
  const header = React.useRef()
  const [showModal, setShowModal] = React.useState(false)

  function showModalCadastrar(){
    document.querySelector('.showCadastrarPlayList').classList.add('show')
    document.querySelector('.cadastrarPlayList').addEventListener('click',cliqueForaModal)
    setShowModal(true)
  }
  
  function cliqueForaModal(event){
    if(event.target === this){
      document.querySelector('.showCadastrarPlayList').classList.remove('show')
      setShowModal(false)
    }
  }

  if(login)
  return (
    <>
    <header ref={header} className="header">
      <div>
        <div className="header-content">
          <nav>
            <ul ref={menus} className="menu">
              <li><Link to="/"><img src={imgHome} alt="Home"/> <span className="nameMenu">Home</span></Link></li>
              <li><Link to="/lista/album"><img src={imgAlbum} alt="Album"/> <span className="nameMenu">Álbuns</span></Link></li>
            </ul>
            <ul className="playList">
              <li>
                <img src={imgPlaylist} alt="PlayList"/>
                <span>PlayLists</span>
              </li>
              <ListaPlayList />
              <li className="criarPlayList"><button onClick={showModalCadastrar}>Criar Playlist</button></li>
            </ul>
            <ul className="sair">
              <li><span><img src={imgLogout} onClick={logout} alt="Sair"/></span></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <div className="showCadastrarPlayList">
      <CadastrarPlaylist ShowModal={showModal} />
    </div>
    </>
  )
  else return null
}

export default Header
