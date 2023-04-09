import React from "react";
import './TrackList.css';
import Track from '../Track/Track';

export default function TrackList (props) {
    const {tracks, onAdd, onPlay, onPause, previewId, onRemove, isRemoval, progress, audioRef} = props;
    return (
        <div className="TrackList">
                {
                    tracks.map(track => {
                        return <Track track={track}
                                        key={track.id}
                                        onAdd={onAdd}
                                        onPlay={onPlay}
                                        onPause={onPause}
                                        previewId={previewId}
                                        progress={progress}
                                        audioRef={audioRef}
                                        onRemove={onRemove}
                                        isRemoval={isRemoval}
                                        />
                    })
                }
        </div>
    )
};