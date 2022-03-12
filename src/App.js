import { useEffect, useState } from 'react';
import Spotify from './Spotify';

import axios from 'axios';

function App() {
 
function handlerClick() {
   window.location.reload();
}

  return (
    <div className='App'>
      <div className="container"></div>
      
      <h3>Memory Song Game</h3>
      <button className="btn" onClick={handlerClick}>Play Again</button>
      <Spotify/>
    </div>
  );
}

export default App;
