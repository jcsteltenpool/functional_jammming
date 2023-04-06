import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import SearchBar from '../Searchbar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

export default function App () {

  /* PLAYLIST MANIPULATION */
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  
  const updatePlaylistName = name => setPlaylistName(name);
  
  const addTrack = track => {
    setPlaylistTracks(prev => { 
      if (prev.find(savedTrack => savedTrack.id === track.id)) {
        return prev.filter(t => t !== track.id);
      }
      return [track, ...prev];
    })
  };
  
  const removeTrack = track => {
    setPlaylistTracks(prev => prev.filter(currentTrack => currentTrack.id !== track.id));
  };
  
  const savePlaylist = () => {
    const trackUris = playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    })
  };

  /* PREVIEW TRACK MANIPULATION */
  const [previewTrack, setPreviewTrack] = useState(null);
  const [previewId, setPreviewId] = useState(null);
  const timeoutRef = useRef(null);

  const playPreview = (track) => {
    if (previewId !== null) {
      previewTrack.pause();
      stopResetTimer();
    }
    setPreviewId(track.id);
    setPreviewTrack(new Audio(track.previewUrl));
  }
  
  useEffect(() => {
    if (previewTrack !== null) {
      previewTrack.play();
      startResetTimer();
    }
  }, [previewTrack]);

  const pausePreview = () => {
    previewTrack.pause();
    stopResetTimer()
    setPreviewId(null);
    setPreviewTrack(null);
  };

  const startResetTimer= () => {
    const timeoutId = setTimeout(() => {
      setPreviewId(null);
      setPreviewTrack(null);
    }, 30000);
    timeoutRef.current = timeoutId;
  };

  const stopResetTimer = () => {
    const timeoutId = timeoutRef.current;
    clearTimeout(timeoutId);
  };

  /* Search */
  const [searchResults, setSearchResults] = useState([]);

  const search = term => {
    Spotify.search(term).then(searchResults => 
      setSearchResults(searchResults));
  };

  return (
    <section>
      <h1>Functional Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
        <SearchResults  onAdd={addTrack}
                        onPlay={playPreview}
                        onPause={pausePreview}
                        previewId={previewId}
                        searchResults={searchResults} />
        <Playlist playlistName={playlistName}
                  playlistTracks={playlistTracks} 
                  previewId={previewId} 
                  onRemove={removeTrack}
                  onSave={savePlaylist}
                  onPlay={playPreview}
                  onPause={pausePreview}
                  onNameChange={updatePlaylistName} />
        </div>
      </div>
    </section>
  );
};