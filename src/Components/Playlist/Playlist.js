import React from "react";
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

export default function Playlist (props) {
    const {onNameChange, playlistTracks, playlistName, onRemove, onPlay, onPause, previewId, onSave} = props;
    
    const handleNameChange = ({ target }) => onNameChange(target.value);
    
    return (
        <div className="Playlist">
            <input value={playlistName}
                    placeholder="Enter Playlist Name"
                    onChange={handleNameChange} />
            <TrackList  tracks={playlistTracks}
                        onRemove={onRemove}
                        onPlay={onPlay}
                        onPause={onPause}
                        previewId={previewId}
                        isRemoval={true}/>
            <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
        </div>
    )
}