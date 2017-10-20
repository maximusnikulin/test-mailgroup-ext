import React, { Component } from 'react';
import './style.scss';

class SearchBar extends Component {
  state = {
      search: ''
  }
  handleChange = (e) => {
      this.setState({
          search: e.target.value
      })
  }
  handleClick = () => {
      if (this.state.search) {                        
          chrome.tabs.update({
              url: `http://www.ya.ru/?q=${this.state.search}`
          });        
      }
  }
  render() {
      return (            
          <div className = "search-bar">
              <h1 className="search-bar__title">Поиск</h1>
              <div className="search-bar__search search">
                  <input className = "search__text" type="text" onChange = {this.handleChange}/> 
                  <button className = "search__button" onClick = {this.handleClick}>Найти</button>
              </div>
              
          </div>
      );
  }
}

export default SearchBar;   