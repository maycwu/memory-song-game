import { useState } from 'react';
import 'boxicons';
const audio = document.createElement('audio');

function SingleCard({track, tracks, index, handleChoice}) {

//   const [audioStatus, setAudioStatus] = useState(false);

//  async function audioClick(status, audioSource) {
//     audio.src = await audioSource;
//     if (status) {
//       audio.load();
//       audio.play();
//     } else {
//       audio.pause();
    
//     }
//     console.log(audioStatus)
//   }

const handleClick = () => {
  handleChoice(track)
}

  return (
    <div className='card'>
      {track ? (
        <div className="song_card"> 

          <img className="front" src={track.album.images[0].url} alt="card front" />
          <img className="back" src="/img/cover.png" alt="card back" onClick={handleClick} />

          {/* {track.images[0].url ? console.log(tracks.images[0].url) : ''} */}
          {/* {track.name} */}
          
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default SingleCard;
