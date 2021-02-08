import './Home.css'
import React from 'react'
import '../Components/Song.css'
import imgs from '../Assets/Img/marshmello.jpg'
import { Link } from 'react-router-dom'
import api from '../Services/Api'

function Home() {
  const [songsAlbuns, setSongsAlbuns] = React.useState();
  const [songsPlaylists, setSongsPlaylist] = React.useState();

  React.useEffect(() => {
    async function searchAllAlbuns(){
      const token = window.localStorage.getItem('token')
      const {data} =  await api.get('/procurar/albuns/todos',{headers: {Authorization: 'Bearer ' + token}})
      setSongsAlbuns(data)
    }
    searchAllAlbuns();
    async function searchAllPlaylists(){
      const token = window.localStorage.getItem('token')
      const {data} =  await api.get('/procurar/playlists/todos',{headers: {Authorization: 'Bearer ' + token}})
      setSongsPlaylist(data)
    }
    searchAllPlaylists();
    
  },[])

  if(!songsAlbuns) return 'Carregando...'
  if(!songsPlaylists) return 'Carregando...'
  return (
    <section className="listagem">
      <div className="container">
        <div className="listagemHome">
          <h2>Albuns</h2>
          <ul>
            {songsAlbuns.map(i => (
              <li>
                <Link to={'/album/' + i._id}>
                  <div className="imgAlbum">
                    <input type="hidden" />
                    <img src={i.img} alt=""/>
                  </div>
                  <Link to={'/album/' + i._id} >{i.title}</Link>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="listagemHome">
          <h2>Playlists</h2>
          <ul>
            {songsPlaylists.map(i => (
              <li>
                <Link to={'/playlist/' + i._id}>
                  <div className="imgAlbum">
                    <input type="hidden" />
                    <img src={i.img} alt=""/>
                  </div>
                  <Link to={"/playlist/" + i._id}>{i.title}</Link>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Home;
