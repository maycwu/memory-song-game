import { useState } from 'react';
import SingleCard from './SingleCard';
const audio = document.createElement('audio');

function Cards({ tracks, setTracks }) {

  // tracks = tracks ? tracks.sort(() => Math.random() - 0.5) : []

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] =useState(null)


  const handleChoice = (track) => {
    //console.log(track)
    choiceOne ? setChoiceTwo(track) : setChoiceOne(track)
  }

  return (
    <div className='container'>
      {tracks ? tracks.map((track, index) => (
        <SingleCard
          tracks={tracks}
          key={index}
          track={track}
          handleChoice={handleChoice}
        />
      )): ''}
    </div>
  );
}

export default Cards;
