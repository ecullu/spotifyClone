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
		handleHeaderClick: function(){
			document.getElementById('artistSuggestions').style.visibility = 'hidden'
		},
		render: function(){
			return (
					<div id='header' onClick={this.handleHeaderClick}>
						<h1><span className="header-title">Spot</span>.Ident<span className="header-title">ify</span>.</h1>
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
			this.refs.suggestionsDiv.style.visibility = 'visible'
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
					this.setState({
						suggestionState: suggestions.models[0].attributes.items 
					})
				})
			}
			else if (event.keyCode === 13){
				let artistName = event.target.value.replace(/ /g,'%20')
				location.hash = 'artist/' + artistName
				this.refs.suggestionsDiv.style.visibility = 'hidden'
				event.target.value = artistName
			}
		},

		handleClick: function(name){
				return (event)=>{
					location.hash = 'artist/' + name
					this.refs.searchInput.value = name
					this.refs.suggestionsDiv.style.visibility = 'hidden'
				}			
		},

		handleInputClick: function(event){
			event.target.value = ''
		},

		handleSearchBoxClick:function(){
			document.getElementById('artistSuggestions').style.visibility = 'hidden'
		},

		getSuggestions: function(){
			let artistJSXArr = []
			this.state.suggestionState.forEach((artist)=>{
				artistJSXArr.push(<div onClick={this.handleClick(artist.name)} key={artist.id} value={artist.name}>{artist.name}</div>)
			})
			return artistJSXArr
		},

		render: function(){
			return (
					<div id='searchBox' onClick={this.handleSearchBoxClick}>
							<div id='searchBoxInputDiv'>
								<input placeholder='Search Artists' ref='searchInput' list='artistSuggestions' onKeyUp={this.handleKeyUp} onClick={this.handleInputClick} type='text'/>
									<div ref='suggestionsDiv' id="artistSuggestions">
									    	{this.getSuggestions()}
									</div>
							</div>
					</div>
				)
		}
	})

export {HomeView, Header, SearchBox }