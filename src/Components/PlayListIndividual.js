import React from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import './PlayListIndividual.css'
import api from '../Services/Api'
import heart from '../Assets/svg/Heart.svg'
import heartfull from '../Assets/svg/HeartFull.svg'
import playCirculo from '../Assets/svg/PlayComCirculo.svg'
import pauseCirculo from '../Assets/svg/PauseComCirculo.svg'
import tresPontinhos from '../Assets/svg/TrêsPontinhos.svg'
import {GlobalContext} from './GlobalContext'

const PlayListIndividual = () => {
  const [data, setData] = React.useState()
  const {play, user, setPlay,indice, setIndice, setSong, song, searchAllPlayList, dataPlayList, library} = React.useContext(GlobalContext)
  const {id} = useParams();
  const navigate = useNavigate();
  let lastMusic = {location: '', indice: 0, songs: [], sound: 0.8};

  function handlePlay(mcID,idx){
    data.songs.map((item) => {
      lastMusic.indice = idx;
      lastMusic.location = data._id;
      return lastMusic.songs.push(item)
    })
    setSong({location: data._id ,songs:data.songs})
    window.localStorage.setItem('lastMusic', JSON.stringify(lastMusic))
    if(data._id === song.location){
      song.songs.filter((i,index) => {
        if(i._id === mcID){
            setIndice(index)
            if(indice !== index){
              setPlay(true)
            } else{
              play ? setPlay(false) : setPlay(true);
            }
          } 
        })
    }else{
      data.songs.filter((i,index) => {
        if(i._id === mcID){
          setIndice(index);
          if(song.songs[indice]._id === mcID){
            play ? setPlay(false) : setPlay(true)
          }else{
            setPlay(true)
          }
        } 
      })
    }
  }

  function handleMenu({target}){
    if(target.classList.contains('menuAlbumPonto')){
      target.children[1].classList.contains('showMenuAlbum') ?  target.children[1].classList.remove('showMenuAlbum') : target.children[1].classList.add('showMenuAlbum')
    }else if(target.alt === 'Menu'){
      target.nextElementSibling.classList.contains('showMenuAlbum') ?  target.nextElementSibling.classList.remove('showMenuAlbum') : target.nextElementSibling.classList.add('showMenuAlbum')
    }
    searchAllPlayList()
  }

  async function handleAddPlaylist(playListId, MusicId){
    const formData = new FormData();
    formData.append('playlistId', playListId);
    formData.append('musicId', MusicId);
    await api.post('/adicionar/playlist/musica', formData, {headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token'),}});
    document.querySelectorAll('.showMenuAlbum').forEach(i => {
      i.classList.remove('showMenuAlbum')
    })
  }

  async function handleDeleteMusic(musicId, playListId){
    await api.delete('/remover/playlists/musica',{
      headers: {
        Authorization:  'Bearer ' + window.localStorage.getItem('token')
      },
      data: { source: {musicId,playListId}}
    });
    searchOnePlay()
  }

  async function handleApagarPlaylist(){
    await api.delete('/remover/playlist/'+ id,{
      headers: {
        Authorization:  'Bearer ' + window.localStorage.getItem('token')
      }
    });
    navigate('/')
    searchAllPlayList();
  }

  async function handleApagarAlbum(){
    await api.delete('/remover/Album/'+ id,{
      headers: {
        Authorization:  'Bearer ' + window.localStorage.getItem('token')
      }
    });
    navigate('/');
  }

  async function searchOnePlay(){
    const response = await api.get(`/playlist/${id}`,{headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token'),}})
    setData(response.data)
    if(response.data === ""){
      const response = await api.get(`/album/${id}`,{headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token'),}})
      setData(response.data)
    }
  }

  React.useEffect(() => {
    searchOnePlay()
  },[id])
  

  if(data)
  return (
    <section className="playlistIndividual">
      <div className="container">
        <div className="dadosPlaylist">
          <div>
            <img src={data.img} alt=""/>
          </div>
          <div>
            <span>{data.type}</span>
            <h2>{data.title}</h2>
            <p>Criado por: <span>{data.author.name}</span></p>
            <div>
              <button>Play</button>
              {dataPlayList.filter(e => e._id === id ).length === 0 && <button><img src={library.playLists.filter(i => { if(i._id === id) return true}).length !== 0 ?heartfull : heart} alt=""/></button>} 
              <button onClick={handleMenu} className="menuPrincipalPlaylist menuAlbumPonto">
                <img src={tresPontinhos} alt="Menu"/>
                <ul className="menuOptions">
                  {data.type === 'Album' ?
                    data.author._id === user._id && <li onClick={handleApagarAlbum}>Apagar Album</li>
                  :
                  dataPlayList.map(i => (
                    i._id === id && <li onClick={handleApagarPlaylist}>Apagar a Playlist</li>
                  ))
                  }
                </ul>
              </button>
            </div>
          </div>
        </div>
        {data.type === 'Album' ? 
            <div className="listaMusicasPlay">
              <ul>
                <li></li>
                <li></li>
                <li>Título</li>
              </ul>
              {data.songs.map((item, index) => (
                <ul key={item._id}>
                  <li><img src={song.songs[indice] === undefined ? playCirculo : song.songs[indice]._id === item._id && play ? pauseCirculo : playCirculo} onClick={(event) => handlePlay(item._id, index)} alt=""/> </li>
                  <li><img src={heart} alt=""/> </li>
                  <li>{item.title}</li>
                  <li onClick={handleMenu} className="menuAlbumPonto">
                    <img src={tresPontinhos} alt="Menu"/>
                    <ul className="menuOptions">
                      <li>Adicionar à playlist <span>&gt;</span>
                        <ul className="menuPlaylists">
                          {dataPlayList && dataPlayList.map(i => (
                            <li key={i._id} onClick={() => handleAddPlaylist(i._id, item._id)} >{i.title}</li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              ))}
            </div>:
            <div className="listaMusicasPlay">
            <ul>
              <li></li>
              <li></li>
              <li>Título</li>
              <li>Artista</li>
              <li>Álbum</li>
            </ul>
            {data.songs.map((item, index) => (
              <ul key={item._id}>
                <li><img src={song.songs[indice] === undefined ? playCirculo : song.songs[indice]._id === item._id && play ? pauseCirculo : playCirculo}  onClick={(event) => handlePlay(item._id, index)}  alt=""/> </li>
                <li><img src={heart} alt=""/> </li>
                <li>{item.title}</li>
                <li>{item.author.name}</li>
                <li><Link to={"/album/" + item.album._id}>{item.album.title}</Link> </li>
                <li onClick={handleMenu} className="menuAlbumPonto">
                  <img src={tresPontinhos} alt="Menu"/>
                  <ul className="menuOptions">
                    {dataPlayList.map(i => i._id === id ? <li onClick={() => handleDeleteMusic(item._id, id)}>Remover da Playlist </li> : '')}
                    <li>Adicionar à playlist <span>&gt;</span>
                      <ul className="menuPlaylists">
                        {dataPlayList.filter(i => {
                          if(i._id !== id) return true;
                        }).map(e => <li key={e._id} onClick={() => handleAddPlaylist(e._id, item._id)} >{e.title}</li>)}
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            ))}
          </div>
        }
      </div>
    </section>
  )
  else return null
}

export default PlayListIndividual
