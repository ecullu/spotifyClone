import Backbone from 'backbone'
import $ from 'jquery'
import {app_name} from '../app'

// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
const UserAuthModel = Backbone.Model.extend({
	urlRoot: '/api/users',
	idAttribute: '_id'
})

const SearchCollection = Backbone.Collection.extend({
	url: 'https://api.spotify.com/v1/search/',
	parse: function(rawJSONP){
		// console.log(rawJSONP)
		return rawJSONP.artists
		}
})

const SearchModel = Backbone.Model.extend({
	url: 'https://api.spotify.com/v1/search/',
	parse: function(rawJSONP){
		// console.log(rawJSONP)
		return rawJSONP.artists
		}
})

const SuggestedAlbumCollection = Backbone.Collection.extend({
	// url: 'https://api.spotify.com/v1/artists/',
	parse: function(rawJSONP){
		// console.log('raw jsonp',rawJSONP)
		return rawJSONP.items
	}
})

const AlbumModel = Backbone.Model.extend({
	url: 'https://api.spotify.com/v1/albums/',
	parse: function(rawJSONP){
		// console.log('raw', rawJSONP)
		return rawJSONP

	}
})

const SearchColl = SearchCollection.extend({
	initialize: function(){
	}
})

export { SearchModel, SearchCollection, SuggestedAlbumCollection, AlbumModel }
