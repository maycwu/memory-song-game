import { useEffect, useState } from 'react';
import Spotify from './Spotify';

import axios from 'axios';

function App() {
 


  return (
    <div className='App'>
      <div className="container"></div>
      
      <h3>Memory Song Game</h3>
   
      <Spotify/>
    </div>
  );
}

export default App;
