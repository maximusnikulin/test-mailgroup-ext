import React, { Component } from 'react';

import Dragger from './Dragger';
import SearchBar from './SearchBar';
import Links from './Links';

import './style.scss';

class App extends Component {
    render() {
        return (
            <div className = "wrapper">               
                <SearchBar /> 
                <Dragger />   
                <Links />                               
            </div>
        );
    }
}

export default App;
