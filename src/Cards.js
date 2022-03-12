import { useState } from 'react';
import Card from './Card';
const audio = document.createElement('audio');

function Cards({ tracks, setTracks }) {

  // tracks = tracks ? tracks.sort(() => Math.random() - 0.5) : []

  const [prevIndex, setPrevIndex] = useState(-1);

  function check(currentIndex){
    if(tracks[currentIndex].id === tracks[prevIndex].id){
        tracks[currentIndex].type = "correct"
        tracks[prevIndex].type = "correct"
        setTracks([...tracks])
        setPrevIndex(-1)
    }else {
        // tracks[currentIndex].type = "wrong"
        // tracks[prevIndex].type = "wrong"
        setTracks([...tracks])

        setTimeout(() => {
            tracks[currentIndex].type = ""
            tracks[prevIndex].type = ""
            setTracks([...tracks])
            setPrevIndex(-1)
        }, 300)
  }
}

  function chooseSong(index){
    if(prevIndex == -1){
    tracks[index].type = "active"
    setTracks([...tracks])
    setPrevIndex(index)
    } else {
      check(index)
    }
}

  return (
    <div className='container'>
      {tracks ? tracks.map((track, index) => (
        <Card
          tracks={tracks}
          key={index}
          track={track}
          index={index}
          music={audio}
          setTracks={setTracks}
          chooseSong={chooseSong}
          setPrevIndex={setPrevIndex}
          prevIndex={prevIndex}
        />
      )): ''}
    </div>
  );
}

export default Cards;
