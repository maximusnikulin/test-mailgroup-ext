import React, { Component } from 'react';
import DraggerItem from './DraggerItem';
import './style.scss';

class Dragger extends Component {
  state = {
      order:null,
      visited:null,                        
      pageX:null,
      pageY:null,
      from:null,
      to:null,
      isDragging:false
  }
  componentDidMount() {
      this.setHistory()        
  }   
  componentDidUpdate (prevProps, prevState) {        
      if (prevState.isDragging !== this.state.isDragging) {
          const {visited, order} = this.state;
          this.setStorage(visited, order);
      }        
  }
  setHistory() {
      this.getHistory().then(res => {                                    
          this.setState({
              ...this.state,
              ...res
          })
      })
  }   
  getDomain(url) {
      const reg =/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/
      return url.match(reg)[1]
  }
  getHistory() {        
      return new Promise((resolve) => {              
          chrome.storage.sync.get(['visited', 'order'], data => {                                
              let {visited, order} = data;
              if (!visited) {
                  chrome.history.search({
                      text:'',
                      maxResults:8
                  }, res => {
                      let order = res.map((el, index) => index)
                      let visited = res.map(el => {
                          el.domain = this.getDomain(el.url);                        
                          return el;
                      })                           
                      this.setStorage(visited, order);                                    
                      resolve({
                          order,
                          visited
                      });
                  });                                                                                      
              } else {
                  resolve({
                      visited,
                      order                        
                  });      
              }
          })                          
      })
  }
  setStorage = (visited, order) => {
    chrome.storage.sync.set({ visited, order });
  }
  setFrom = (index) => {
    this.setState({
        from: index,
        isDragging: true
    })
  }  
  setTo = (index) => {
    this.setState({
        to: index
    })
  }    
  renderItems = () => {   
    const { visited, order } = this.state;
    if (visited == null) {
      return null;
    } else {
      return visited.map((val, index) => <DraggerItem key = {index} val = {val} order = {order[index]} isCaptured = {this.state.from === order[index] && this.state.isDragging} pageX = {this.state.pageX} pageY = {this.state.pageY} setFrom = {this.setFrom} setTo = {this.setTo}/>)
    }        
  }   
  handleMouseUp = (e) => {                       
      const {from ,to, order, isDragging} = this.state;
      if (isDragging) {
          let newOrder = order.map(el => {
              if (el == from) {
                  return to;
              } if (el == to) {
                  return from;
              } else {
                  return el
              }
          })
          this.setState({
              isDragging:false,
              order:newOrder
          })
      }                    
      
  }
  handleMouseMove = (e) => {
      const { pageX, pageY } = e;
      this.setState({
          pageX,
          pageY
      })
  }
  render() {
      return (
          <div className = "grid" ref = {(node) => this.node = node} onMouseUp = {this.handleMouseUp} onMouseMove = {this.handleMouseMove} onMouseLeave = {this.handleMouseUp}>
               <h1 className="grid__title">История</h1>
               <div className="grid__content">
                  {this.renderItems()}
               </div>                
          </div>
      );
  }
}

export default Dragger;