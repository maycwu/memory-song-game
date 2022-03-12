import { useState } from 'react';
import 'boxicons';

const audio = document.createElement('audio');

function Card({track, tracks, index, handleClick, setTracks, chooseSong, prevIndex, setPrevIndex}) {

  const [audioStatus, setAudioStatus] = useState(false);

  function audioClick(status, audioSource) {
    audio.src = audioSource;
    if (status) {
    //   audio.load();
      audio.play();
    } else {
      audio.pause();
    }
    console.log(status);
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
        {audioStatus?  <box-icon name='play-circle'></box-icon>  : <box-icon name='pause-circle'></box-icon>}
        
          <p> track id {track.id.slice(0,3)}</p>
          <p> index {index}</p>
          <p> prev index {prevIndex}</p>
          {/* {console.log(prevIndex)} */}
          
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Card;
