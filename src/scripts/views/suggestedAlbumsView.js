import React from 'react'
import {Header, SearchBox} from './homeView'
import {SearchCollection, SearchModel, SuggestedAlbumCollection} from '../models/models'


const SuggestedAlbumsView = React.createClass({
	render: function(){
		console.log(this.props)
		return (
			<div className="suggested-albums-wrapper">
				<Header/>
				<SearchBox/>
				<SuggestedAlbumsList albumList={this.props.albumCol.models}/>
			</div>
		)
	}
	
})

const SuggestedAlbumsList = React.createClass({
	getInitialState: function(){
		return {
			artistReady: false,
			artistId: ''
		}
	},

	getAlbumJSXArray: function(albumList){
		var suggestedAlbumsCollection = []
		albumList.forEach((album)=>{
			suggestedAlbumsCollection.push(<Album key={album.id} details={album}/>)
		})
		return suggestedAlbumsCollection
	},

	handleAlbumListClick: function(){
		document.getElementById('artistSuggestions').style.visibility = 'hidden'
	},

	render: function(){
		return (
			<div onClick={this.handleAlbumListClick} className="album-list-wrapper">
				<div className="suggested-albums-header"><h3>Suggested Albums:</h3></div>
				<div className="album-list">
					{this.getAlbumJSXArray(this.props.albumList)}
				</div>
			</div>
		)
	}
	
})

const Album = React.createClass({
	showAlbumDetails:function(){
		location.hash = 'album/' + this.props.details.get('id') 
	},

	render: function(){
		return (
				<div onClick={this.showAlbumDetails} className="album-container">
					<img src={this.props.details.get('images')[1].url}/>
					<h2> {this.props.details.get('name')}</h2>
				</div>
			)
	}
})

export {SuggestedAlbumsView, SuggestedAlbumsList}