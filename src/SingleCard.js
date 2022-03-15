import { useState } from 'react';
import 'boxicons';
const audio = document.createElement('audio');

function SingleCard({ track, handleChoice, flipped, disabled }) {
  const [audioStatus, setAudioStatus] = useState(true);

  async function audioClick(status, audioSource) {
    audio.src = await audioSource;
    if (status) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  const handleClick = () => {
    if (!disabled || !audioStatus) {
      handleChoice(track);
    } else {
      setAudioStatus(true);
    }
  };

  return (
    <div className='card'>
      <div
        className={flipped ? 'flipped' : ''}
        onClick={() => {
          setAudioStatus(!audioStatus);
          audioClick(audioStatus, track.preview_url);
        }}
      >
        {audioStatus ? (
          <div className='play-icon'>
            <box-icon onClick={audio.pause()} name='play-circle'></box-icon>
          </div>
        ) : (
          <div className='play-icon'>
            <box-icon name='pause-circle'></box-icon>
          </div>
        )}
        <img
          className='back'
          src={track.type === true ? '/img/green.png' : '/img/cover.png'}
          alt='card back'
          onClick={() => {
            handleClick();
          }}
        />
      </div>
    </div>
  );
}

export default SingleCard;
