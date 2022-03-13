import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

function SpotifyLogin() {
  const CLIENT_ID = '0e54567ee7f64c469bac869f0d6cfa6e';
  const REDIRECT_URI = 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search';
  const RESPONSE_TYPE = 'token';

  const [token, setToken] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    //if we dont have have a token, then set it to the local storage value
    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  const searchArtist = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(SEARCH_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: 'artist',
        },
      });
      setArtists(data.artists.items[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  const searchTracks = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${artists}/top-tracks?market=ES`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTracks(data.tracks.slice(0, 8).concat(data.tracks.slice(0, 8)));
    } catch (error) {
      console.error(error);
    }
  };

  function handlerClick() {
    window.location.reload();
  }

  return (
    <div className='App'>
      <div className='spotify-searchbar'>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            <h5>Login to Spotify </h5>
          </a>
        ) : (
          <button className='btn' onClick={logout}>
            Log out
          </button>
        )}
      </div>
      {token ? (
        <SearchBar
          setArtists={setArtists}
          setTracks={setTracks}
          token={token}
          setSearchKey={setSearchKey}
          searchArtist={searchArtist}
          searchTracks={searchTracks}
          tracks={tracks}
          handlerClick={handlerClick}
        />
      ) : (
        ''
      )}
    </div>
  );
}
export default SpotifyLogin;
