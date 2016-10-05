import React from 'react'
import {SearchColl, SearchCollection} from '../models/models'

const HomeView = React.createClass({

	render: function(){
		return (
				<div id='wrapper'>
					<Header/>
					<SearchBox/>
				</div>
			)
	}
})

const Header = React.createClass({
		render: function(){
			return (
					<div id='header'>
						<h3>Welcome to Spotify</h3>
					</div>
				)
		}
	})

const SearchBox = React.createClass({
		getInitialState: function(){
		return {
				suggestionState: []
			}

		},

		handleKeyUp: function(event){
			if (event.keyCode !== 13){
				var suggestions = new SearchCollection()
				suggestions.fetch({
					dataType: 'json',
					data: {
						type: 'artist',
						q: event.target.value,
						limit: 10
					}
				}).then(()=>{
					console.log(suggestions)
					this.setState({
						suggestionState: suggestions.models[0].attributes.items 
					})
				console.log('state>', this.state.suggestionState)

				})
			}
			else if (event.keyCode === 13){
				let artistName = event.target.value.replace(/ /g,'%20')
				location.hash = 'artist/' + artistName
				event.target.value = ''
			}
		},

		handleChange: function(event){
			// if (event.keyCode === undefined){
				console.log('handle change on option')
				let artistName = event.target.value.replace(/ /g,'%20')
				location.hash = 'artist/' + artistName
				// event.target.value = ''
			// }
			
		},

		getSuggestions: function(){
			let artistJSXArr = []
			this.state.suggestionState.forEach((artist)=>{
				artistJSXArr.push(<option key={artist.id} value={artist.name}/>)
			})
			return artistJSXArr
		},

		render: function(){
			return (
					<div id='searchBox'>
							<input list='artistSuggestions' onKeyUp={this.handleKeyUp} type='text'/>
							<datalist id="artistSuggestions">
								<select onClick={this.handleChange}>
						    	{this.getSuggestions()}
						    	</select>
							</datalist>
					</div>
				)
		}
	})

export {HomeView, Header, SearchBox }