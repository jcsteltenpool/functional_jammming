import React, {useEffect, useState} from "react";
import "./Track.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";

export default function Track (props) {
    const {track, onAdd, onPlay, onPause, previewId, onRemove, isRemoval, progress} = props;

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (track.id === previewId) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    }, [track.id, previewId]);

    const addTrack = () => onAdd(track);

    const removeTrack = () => onRemove(track);

    return (
        <div className="Track">
                <div>
                <button className="Preview-button" 
                        data-state={isPlaying && "isPlaying"} 
                        onClick= {() => {isPlaying ? onPause() : onPlay(track)}}>
                    <img className="Track-image" src={track.imageUrl} alt=""/>
                    {isPlaying && 
                    <svg stroke="white" fill="none" className="Preview-circle" viewBox="0 0 100 100" width="36">
                        <path
                            className="line"
                            strokeWidth="6"
                            strokeLinecap="butt"
                            strokeDasharray={progress}

                            d="m 50 10 A 1 1 0 0 1 50 90 A 1 1 0 0 1 50 10">
                        </path>
                    </svg>}
                    {isPlaying  ? <FontAwesomeIcon icon={faPause} />
                                : <FontAwesomeIcon icon={faPlay} />}
                    
                </button>
                </div>
                <div className="Track-information">
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album}</p>
                </div>
                {isRemoval  ? <button className="Track-action" onClick={removeTrack}>-</button>
                            : <button className="Track-action" onClick={addTrack}>+</button>}
        </div>
    )
};