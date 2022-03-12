import { useState } from 'react';
import 'boxicons';
const audio = document.createElement('audio');

function SingleCard({ track, handleChoice, index, flipped, choiceOne, choiceTwo }) {
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
    handleChoice(track);
  };

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img
          className='front'
          src={track.album.images[0].url}
          alt='card front'
        />
        <img
          className='back'
          src={track.type === true ? '/img/green.png' : '/img/cover.png'}
          alt='card back'
          onClick={handleClick}
        />

        {/* {track.images[0].url ? console.log(tracks.images[0].url) : ''} */}
        {/* {track.name} */}
        {/* {console.log(track.type, track.name)} */}
        {console.log("track", track, "TRACK TYPEEEE", track.type, 'index', index, 'choiceOne', choiceOne, 'choiceTwo',choiceTwo)}
      </div>
    </div>
  );
}

export default SingleCard;
