import React from 'react';
import Cards from './Cards';

function SearchBar({
  setSearchKey,
  tracks,
  handlerClick,
  setTracks,
  searchArtist,
  searchTracks,
  token,
}) {
  return (
    <div>
      <button className='btn' onClick={handlerClick}>
        Play Again
      </button>
      <form
        onChange={(e) => {
          searchArtist(e);
          searchTracks(e);
        }}
      >
        <label>
          Find Artist on
          <box-icon
            name='spotify'
            type='logo'
            flip='vertical'
            animation='tada'
            color='#ffffff'
          ></box-icon>
        </label>
        <input
          placeholder='search...'
          type='text'
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </form>

      <Cards tracks={tracks} setTracks={setTracks} token={token} />
    </div>
  );
}

export default SearchBar;
