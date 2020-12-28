/* eslint-disable react-hooks/exhaustive-deps */
import './Song.css'
import React from 'react'
import Songs from './Data/Songs'
import imgPrev from '../Assets/svg/Prev.svg'
import imgPlay from '../Assets/svg/Play.svg'
import imgNext from '../Assets/svg/Next.svg'
import imgPause from '../Assets/svg/Pause.svg'
import imgAleatorio from '../Assets/svg/ordenar.svg'
import imgordenado from '../Assets/svg/aleatorio.svg'
import imgLinear from '../Assets/svg/linear.svg'
import imgRepeticao from '../Assets/svg/repetição.svg'

function Song({data}) {
  const [play, setPlay] = React.useState(false)
  const [input, setInput] = React.useState(0)
  const [aleatorio, setAleatorio] = React.useState(false)
  const [repeticao, setRepeticao] = React.useState(false)
  let [indice, setIndice] = React.useState(0)
  let audio = React.useRef()

  console.log(data)

  function playMusic(){
    if(audio.current !== undefined){
      if(!play){
        audio.current.play()
        setPlay(true)
      }else{
        audio.current.pause()
        setPlay(false)
      }
    }
  }

  function changeRange({target}){
    setInput(target.value)
    audio.current.currentTime = target.value
  }

  function moveToPrev(){
    if(aleatorio){
      let numberRandom = Math.round(Math.random() * (data.length - 1));
      do{
        numberRandom = Math.round(Math.random() * (data.length - 1))
      }while(numberRandom === indice)
      setIndice(numberRandom)
    }else{
      setIndice(indice === 0 ? indice = data.length - 1 : indice - 1)
    }
  }
  
  function moveToNext(){
    if(aleatorio){
      let numberRandom = Math.round(Math.random() * (data.length - 1));
      do{
        numberRandom = Math.round(Math.random() * (data.length - 1))
      }while(numberRandom === indice)
      setIndice(numberRandom)
    }else{
      setIndice(indice < data.length - 1 ? indice + 1 : indice = 0)
    }
  }

  function moveRange(){
    let musica = audio.current;
    setTimeout((event) => {
      setInput(Math.floor(musica.currentTime));
      musica.onended = function (){
        clearTimeout(event)
        if(repeticao){
          musica.currentTime = 0;
          setInput(Math.floor(musica.currentTime));
          musica.play();
        }else{
          setIndice(indice < data.length - 1 ? indice + 1 : indice = 0)
        }
      }
    },1000)
  }

  const clickPause = React.useCallback((event) => {
    switch(event.key){
      case "MediaPlayPause":
          setPlay((d) => !d)
        break;
      case "MediaTrackPrevious":
          if(aleatorio){
            setIndice((i) => i < data.length - 1 ? i = Math.round(Math.random(data.length - 1)) : i = 0)
          }else{
            setIndice((i) => i === 0 ? i : i - 1)
          }
          break;
      case "MediaTrackNext":
          if(aleatorio){
            setIndice((i) => i < data.length - 1 ? i = Math.round(Math.random(data.length - 1)) : i = 0)
          }else{
            setIndice((i) => i < data.length - 1 ? i + 1 : i = 0)
          }
        break;  
      default: 
        break;
    }
  },[])
  document.addEventListener('keydown', clickPause)

  React.useEffect(() => {
    if(play){
      audio.current.play()
    }
    /* Despausar quando vai pro proximo
    audio.current.play()
    if(!audio.current.paused){
      setPlay(true)
    }*/
  },[play,indice])

  if(audio.current !== undefined && audio.current.currentTime !== null){
    moveRange()
  }
  
  return (
    <div className="backgroundMusic">
      <img className="imgFundo" src={data[indice].img} alt=""/>
      <div className="songIndi">
        <audio ref={audio} className="audioSong" src={data[indice].song}></audio>
        <div>
          <img src={data[indice].img} alt=""/>
        </div>
        <div className="nameAuthor">
          <h2>{data[indice].title}</h2>
          <span>{data[indice].author}</span>
        </div>
        <div className="durationMusic">
          <input type="range" value={input} onChange={changeRange} min="0" max={audio.current && !!+audio.current.duration && typeof audio.current.duration !== 'boolean' && audio.current.duration}/>
        </div>
        <div className="btnsSong">
          <img onClick={() => setAleatorio((d) => !d)} src={aleatorio ? imgAleatorio : imgordenado} className="ordem" alt=""/>
           <button onClick={moveToPrev}><img src={imgPrev} alt="Prev"/></button>

          <button onClick={playMusic}>{play ? <img src={imgPause} alt="Prev"/> : <img src={imgPlay} alt="Play"/>}</button>

          <button onClick={moveToNext}><img src={imgNext} alt="Next"/></button>
          <img onClick={() => setRepeticao((d) => !d)} src={repeticao ? imgRepeticao : imgLinear} className="ordem" alt=""/>
        </div>
      </div>
    </div>
  );
}

export default Song;
