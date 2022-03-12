import { useState ,useEffect } from 'react';
import SingleCard from './SingleCard';
const audio = document.createElement('audio');

function Cards({ tracks, setTracks }) {

  // tracks = tracks ? tracks.sort(() => Math.random() - 0.5) : []

  // const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] =useState(null)

  const shuffleCards = () => {
     tracks = tracks ? tracks.sort(() => Math.random() - 0.5) : []


    setChoiceOne(null)
    setChoiceTwo(null)
    setTracks(tracks)
    setTurns(0)
  }

  const handleChoice = (track) => {
    //console.log(track)
    choiceOne ? setChoiceTwo(track) : setChoiceOne(track)
  }

  useEffect(() => {
      if(choiceOne && choiceTwo){
        if(choiceOne.id === choiceTwo.id){
          console.log('cards match')
          // console.log(choiceOne)
          // console.log(choiceTwo)
          setTracks(prevTracks => {
            return prevTracks.map(track => {
                if(track.id === choiceOne.id){
                  return {...track, type: true};

                } else {
                  return track;
                }
            })
          })
          console.log(tracks)
          resetTurn()
        } else {
          console.log('cards do not match')
          resetTurn()
        }
      }
    
  },[choiceOne, choiceTwo])

  // console.log(tracks)

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }
  
  useEffect(() => {
    shuffleCards()
  }, [])


  return (
    <div className='container'>
      {tracks ? tracks.map((track, index) => (
        <SingleCard
          tracks={tracks}
          key={index}
          index={index}
          track={track}
          handleChoice={handleChoice}
          flipped={track === choiceOne || track === choiceTwo || track.type === true}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
        />
      )): ''}
    </div>
  );
}

export default Cards;
