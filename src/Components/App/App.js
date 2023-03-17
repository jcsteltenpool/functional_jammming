import React from 'react';
import './App.css';
import { SearchBar } from '../Searchbar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: [],
      currentPreview: null,
      currentPreviewId: null
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.playPreview = this.playPreview.bind(this);
    this.pausePreview = this.pausePreview.bind(this);
    // this.startResetTimer = this.startResetTimer.bind(this);

    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
    this.setState({ playlistTracks: tracks });
  }

  playPreview(trackUrl, trackId) {
    let currentPreview = this.state.currentPreview;
    const currentPreviewId = this.state.currentPreviewId;
    if(currentPreviewId !== null) {
      currentPreview.pause();
      this.stopResetTimer();
    }
    fetch(this.setState({ 
      currentPreview: new Audio(trackUrl),
      currentPreviewId: trackId
     })
    ).then(() => {
        currentPreview = this.state.currentPreview;
        currentPreview.play();
        this.startResetTimer();
      })
  }

  pausePreview() {
    let currentPreview = this.state.currentPreview;
    currentPreview.pause();
    this.setState({ 
      currentPreviewId: null,
      currentPreview: null 
    });
  }

  startResetTimer() {
    this.timeoutId = setTimeout(() => {
      this.setState({ 
        currentPreviewId: null,
        currentPreview: null });
    }, 30000);
  }

  stopResetTimer() {
    clearTimeout(this.timeoutId);
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          <SearchResults  onAdd={this.addTrack}
                          onPlay={this.playPreview}
                          onPause={this.pausePreview}
                          currentPreviewId={this.state.currentPreviewId}
                          searchResults={this.state.searchResults} />
          <Playlist playlistName={this.state.playlistName}
                    playlistTracks={this.state.playlistTracks} 
                    onRemove={this.removeTrack}
                    onSave={this.savePlaylist}
                    onPlay={this.playPreview}
                    onPause={this.pausePreview}
                    currentPreviewId={this.state.currentPreviewId} 
                    onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}