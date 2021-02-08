import React from 'react'
import { Link } from 'react-router-dom'
import api from '../../Services/Api'
import { GlobalContext } from '../GlobalContext'

const ListaPlayList = () => {
  const {library, searchLibrary} = React.useContext(GlobalContext)

  React.useEffect(() => {
    searchLibrary()
  },[])

  if(library)
  return (
    <ul className="playListUl">
      {library.playLists.map(item => (
        <li key={item._id}>
          <Link to={"/playlist/" + item._id}>{item.title}</Link>
        </li>
      ))}
      
    </ul>
  )
  else return null
}

export default ListaPlayList
