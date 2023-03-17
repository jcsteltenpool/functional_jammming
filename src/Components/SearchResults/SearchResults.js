import React from 'react';
import './SearchResults.css';
import { TrackList } from '../TrackList/TrackList';

export class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList  tracks={this.props.searchResults} 
                            onAdd={this.props.onAdd}
                            onPlay={this.props.onPlay}
                            onPause={this.props.onPause}
                            currentPreviewId={this.props.currentPreviewId}
                            isRemoval={false}
                             />
            </div>  
        )
    }
}