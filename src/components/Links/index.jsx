import React, {Component} from 'react';
import './style.scss';

class Links extends Component {    
    toLink(e) {
        chrome.tabs.create({ "url": e.target.href, "active": true });
    }
    render() {
        return <div className="links">
            <a className="links__item" href="chrome://bookmarks" onClick={this.toLink}>Избранное</a>
            <a className="links__item" href="chrome://history" onClick={this.toLink}>История</a>
            <a className="links__item" href="chrome://downloads" onClick={this.toLink}>Загрузки</a>
        </div>
    }
}

export default Links;