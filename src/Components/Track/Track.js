import React from "react";
import "./Track.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";


export class Track extends React.Component {
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.playPreview = this.playPreview.bind(this);
        this.pausePreview = this.pausePreview.bind(this);
        this.renderPlayButton = this.renderPlayButton.bind(this);
    }

    renderPlayButton() {
       return this.props.track.id === this.props.currentPreviewId
        ? <button className="Track-preview" onClick={this.pausePreview}>
                <FontAwesomeIcon icon={faPause} />
            </button>
        : <button className="Track-preview" onClick={this.playPreview}>
                <FontAwesomeIcon icon={faPlay} />
            </button>
    }
    
    playPreview() {
        this.props.onPlay(this.props.track.previewUrl, this.props.track.id);
    }

    pausePreview() {
        this.props.onPause();
    }

    renderAction() {
        return this.props.isRemoval
        ? <button className="Track-action" onClick={this.removeTrack}>-</button>
        : <button className="Track-action" onClick={this.addTrack}>+</button>
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                {this.renderPlayButton()}
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}