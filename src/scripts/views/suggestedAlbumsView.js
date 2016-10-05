import React from 'react'
import {Header, SearchBox} from './homeView'
import {SearchCollection, SearchModel, SuggestedAlbumCollection} from '../models/models'


const SuggestedAlbumsView = React.createClass({
	render: function(){
		console.log(this.props)
		return (
			<div className="suggested-albums-div">
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

	componentWillMount: function(){
		// this.getArtistId()
	},

	// getArtistId: function(){
	// 	var artistId = ""
	// 	var artistName = location.hash.split('/')
	// 	artistName[1] = artistName[1].replace('%20', ' ')
	// 	console.log('artist name>', artistName[1])
	// 	var searchedArtist = new SearchModel()
	// 			searchedArtist.fetch({
	// 				dataType: 'json',
	// 				data: {
	// 					type: 'artist',
	// 					q: artistName[1],
	// 					limit: 1
	// 				}
	// 			}).then(()=>{
	// 				console.log(searchedArtist)
	// 				artistId = searchedArtist.get('items')[0].id
	// 				console.log('artis id>>', artistId)
	// 				this.setState({
	// 					artistReady: true,
	// 					artistId: artistId
	// 				})
	// 			})
	// },

	// getAlbums: function(){
	// 	console.log(this.state.artistReady)
	// 	var suggestedAlbumsCollection = []
	// 	if (this.state.artistReady){
	// 		var suggestedAlbums = new SuggestedAlbumCollection()
	// 		suggestedAlbums.url = 'https://api.spotify.com/v1/artists/' + this.state.artistId + '/albums'
	// 		suggestedAlbums.fetch({
	// 			dataType: 'json',
	// 		}).then(()=> {
	// 			console.log('suggestedAlbums', suggestedAlbums.models)
	// 			suggestedAlbums.models.forEach((album)=>{
	// 				suggestedAlbumsCollection.push(<Album key={album.id} details={album}/>)
	// 			})
	// 		})
	// 	}
	// 	console.log('suggestedAlbums', suggestedAlbumsCollection)
	// 	return suggestedAlbumsCollection

	// },

	getAlbumJSXArray: function(albumList){
		var suggestedAlbumsCollection = []
		albumList.forEach((album)=>{
			suggestedAlbumsCollection.push(<Album key={album.id} details={album}/>)
		})
		return suggestedAlbumsCollection
	},

	render: function(){
		
		return (
			<div className="album-list">
				{this.getAlbumJSXArray(this.props.albumList)}
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

export default SuggestedAlbumsView