import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

export default function SearchResults (props) {
    const {searchResults, onAdd, onPlay, onPause, previewId} = props;

    return (
        <div className="SearchResults">
                <h2>Results</h2>
                <TrackList  tracks={searchResults} 
                        onAdd={onAdd}
                        onPlay={onPlay}
                        onPause={onPause}
                        previewId={previewId}
                        isRemoval={false}
                        />
        </div>
    )
};