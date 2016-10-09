import React from 'react'
import {SuggestedAlbumsList} from './suggestedAlbumsView'
import {Header, SearchBox} from './homeView'

const AlbumDetailView = React.createClass({
	render: function(){
		return (
				<div className="detail-view">
					<Header/>
					<SearchBox/>
					<AlbumDetails albumDetails={this.props.albumDetails}/>
				</div>
			)
	}
})

const AlbumDetails = React.createClass({
	getTrackListJSXArray: function(){
		let tracksArr = []
		this.props.albumDetails.get('tracks').items.forEach((track)=>{
			tracksArr.push(<Track key={track.id} trackInfo={track}/>)
		})
		return tracksArr
	},

	render: function(){
		console.log(this.props.albumDetails)
		return(
			<div className="album-detail-wrapper">
				<div className="album-cover">
					<img src={this.props.albumDetails.get('images')[0].url}/>
				</div>
				<div className="album-info">
					<div className="album-info-header">
						<h1>{this.props.albumDetails.get('name')}</h1>
						<h2>{this.props.albumDetails.get('artists')[0].name}</h2>
						<h3>Release Date: {this.props.albumDetails.get('release_date')}</h3>
					</div>
					<div className="track-list">
						{this.getTrackListJSXArray()}
					</div>
				</div>
			</div>
			)
	}
})

const Track = React.createClass({
	msToTime: function (duration){
		let milliseconds = parseInt((duration%1000)/100),
        	seconds = parseInt((duration/1000)%60),
            minutes = parseInt((duration/(1000*60)))

	    minutes = (minutes < 10) ? "0" + minutes : minutes;
	    seconds = (seconds < 10) ? "0" + seconds : seconds;

	    return minutes + ":" + seconds;
	},

	render: function(){
		return (
				<div className="track-info">
					<div className="track-name">
						{this.props.trackInfo.name}
					</div>
					<div className="track-duration">
						{this.msToTime(this.props.trackInfo.duration_ms)}
					</div>
				</div>
			)
	}
})

export default AlbumDetailView