import { useState } from 'react';
import 'boxicons';

const audio = document.createElement('audio');

function Card({track, tracks, index, handleClick, setTracks, chooseSong, prevIndex, setPrevIndex}) {

  const [audioStatus, setAudioStatus] = useState(false);

 async function audioClick(status, audioSource) {
    audio.src = await audioSource;
    if (status) {
      audio.load();
      audio.play();
    } else {
      audio.pause();
    
    }
    console.log(audioStatus)
  }

  const itemClass = track.type ? ' active ' + track.type : '';
  return (
    <div className={'card' + itemClass}>
      {track ? (
        <div className="song_card" value={track.id} onClick={(e) => {
           setAudioStatus(!audioStatus);
           audioClick(audioStatus, track.preview_url);
           chooseSong(index)
            console.log('current index', index)
            console.log('prev index', prevIndex)
         
          }}> 
        {audioStatus?  <box-icon onClick={audio.pause()} name='play-circle'></box-icon>  : <box-icon name='pause-circle'></box-icon>}
        
          {/* <p> track id {track.id.slice(0,3)}</p>
          <p> index {index}</p>
          <p> prev index {prevIndex}</p>  */}
      
          
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Card;
