import { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './Cards';
import 'boxicons';

function Spotify() {
  const CLIENT_ID = '0e54567ee7f64c469bac869f0d6cfa6e';
  const REDIRECT_URI = 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const TRACKS_ENDPOINT =
    'https://api.spotify.com/v1/me/tracks/?time_range=long_term';
  const PROFILE_ENDPOINT = 'https://api.spotify.com/v1/me';
  const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search';
  //const OAUTH_TOKEN =
  //  'BQCBp8BYzvxA7uVV1UQe0RgLYBbdC_45dVAUDnZQdi0DVdZID496zOIpiIPTv9i6Fx9zVMwWJSJv0vStIB7VHa-RYviKYp23PZ6m7ggymh1wYwn0mVP442SXcE8IwRO5K9p46eaPAUfY3gNK7DfB5P0p0MhGpeM9SIOm8mJczdo2xflx6hB4cg';

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

      //console.log(token);
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
          perPage: 5,
        },
      });
      //   console.log(artists)
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
      // setTracks2(data.tracks.slice(0,7));
    } catch (error) {
      console.log(error);
    }
  };

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

        {/* {console.log('ARTIST ID', artists)} */}

        {token ? (
          <div>
            <form
              onChange={(e) => {
                searchArtist(e);
                searchTracks(e);
              }}
            >
              <label>
                Find Artist on{' '}
                <box-icon
                  name='spotify'
                  type='logo'
                  flip='vertical'
                  animation='tada'
                  color='#ffffff'
                ></box-icon>{' '}
              </label>
              <input
                placeholder='search...'
                type='text'
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </form>
          </div>
        ) : (
          ''
        )}
      </div>
      <Cards tracks={tracks} setTracks={setTracks} token={token} />
    </div>
  );
}

export default Spotify;
