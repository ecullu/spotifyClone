import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import {HomeView} from './views/homeView'
import SuggestedAlbumsView from './views/suggestedAlbumsView'
import AlbumDetailView from './views/albumDetailView'
import {SearchCollection, SearchModel, SuggestedAlbumCollection, AlbumModel} from './models/models'



const app = function() {
	var spotifyRouter = Backbone.Router.extend({
		routes: {
			'home': 'showHomepage',
			'artist/:name': 'handleSuggestedAlbumsView',
			'album/:id': 'handleAlbumDetailsView',
			'*catchall': 'redirectHome'
		},

		showHomepage: function(){
  			ReactDOM.render(<HomeView/>, document.querySelector('.container'))
		},

		handleSuggestedAlbumsView: function(){
			var artistId = ""
			var artistName = location.hash.split('/')
			console.log(artistName)
			artistName[1] = artistName[1].replace(/%20/g, ' ')
			console.log('artist name>', artistName[1])
			var searchedArtist = new SearchModel()
					searchedArtist.fetch({
						dataType: 'json',
						data: {
							type: 'artist',
							q: artistName[1],
							limit: 1
						}
					}).then(()=>{
						artistId = searchedArtist.get('items')[0].id
						var suggestedAlbums = new SuggestedAlbumCollection()
						suggestedAlbums.url = 'https://api.spotify.com/v1/artists/' + artistId + '/albums'
						suggestedAlbums.fetch({
							dataType: 'json',
							data:{
								limit: 10,
								album_type: 'album',
								market: 'MX'
							}
							
						}).then(()=> {
					  			ReactDOM.render(<SuggestedAlbumsView albumCol={suggestedAlbums}/>, document.querySelector('.container'))
						})
					})

		},

		handleAlbumDetailsView: function(albumId){
			var albumModel = new AlbumModel()
			albumModel.url += albumId
			albumModel.fetch({
				dataType: 'json'
			}).then(()=>{
				ReactDOM.render(<AlbumDetailView albumDetails={albumModel}/>, document.querySelector('.container'))
			})
		},

  		redirectHome: function(){
			location.hash = "home"
		},

		initialize: function(){
			Backbone.history.start()
		}
  // document.querySelector('.container').innerHTML = "<h1>Woah!</h1>"
	})
	new spotifyRouter()
}



// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..