/* eslint-disable react-hooks/exhaustive-deps */
import './Song.css'
import React from 'react'
import Songs from './Data/Songs'
import imgPrev from '../Assets/svg/Prev.svg'
import imgPlay from '../Assets/svg/Play.svg'
import imgNext from '../Assets/svg/Next.svg'
import imgPause from '../Assets/svg/Pause.svg'

function Song() {
  const [play, setPlay] = React.useState(false)
  let [indice, setIndice] = React.useState(0)
  let audio = React.useRef()

  function playMusic(){
    if(!play){
      audio.current.play()
      setPlay(true)
    }else{
      audio.current.pause()
      setPlay(false)
    }
  }

  React.useEffect(() => {
    if(play){
      audio.current.play()
    }
    /* Despausar quando vai pro proximo
    audio.current.play()
    if(!audio.current.paused){
      setPlay(true)
    }*/
  },[indice])

  return (
    <div className="backgroundMusic">
      <img className="imgFundo" src={Songs[indice].img} alt=""/>
      <div className="songIndi">
        <audio ref={audio} className="audioSong" src={Songs[indice].song}></audio>
        <div>
          <img src={Songs[indice].img} alt=""/>
        </div>
        <div className="nameAuthor">
          <h2>{Songs[indice].title}</h2>
          <span>{Songs[indice].author}</span>
        </div>
        <div className="btnsSong">
          <button onClick={() => setIndice(indice === 0 ? indice : indice - 1)}><img src={imgPrev} alt="Prev"/></button>
          <button onClick={playMusic}>{play ? <img src={imgPause} alt="Prev"/> : <img src={imgPlay} alt="Prev"/>}</button>
          <button onClick={() => setIndice(indice < Songs.length - 1 ? indice + 1 : indice)}><img src={imgNext} alt="Prev"/></button>
        </div>
      </div>
    </div>
  );
}

export default Song;
