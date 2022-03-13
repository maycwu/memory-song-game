import { useState, useEffect } from 'react';
import SingleCard from './SingleCard';

function Cards({ tracks, setTracks }) {
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCards = () => {
    tracks = tracks ? tracks.sort(() => Math.random() - 0.5) : [];
    setChoiceOne(null);
    setChoiceTwo(null);
    setTracks(tracks);
    setTurns(0);
  };

  const handleChoice = (track) => {
    choiceOne ? setChoiceTwo(track) : setChoiceOne(track);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.id === choiceTwo.id) {
        console.log('cards match');
        setTracks((prevTracks) => {
          return prevTracks.map((track) => {
            if (track.id === choiceOne.id) {
              return { ...track, type: true };
            } else {
              return track;
            }
          });
        });
        resetTurn();
      } else {
        console.log('cards do not match');
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className='container'>
      {tracks
        ? tracks.map((track, index) => (
            <SingleCard
              tracks={tracks}
              key={index}
              index={index}
              track={track}
              handleChoice={handleChoice}
              flipped={
                track === choiceOne ||
                track === choiceTwo ||
                track.type === true
              }
              choiceOne={choiceOne}
              choiceTwo={choiceTwo}
            />
          ))
        : ''}
    </div>
  );
}

export default Cards;
