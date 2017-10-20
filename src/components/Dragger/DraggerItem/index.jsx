import React, { Component } from 'react';
import './style.scss';

class DraggerItem extends Component {   
  state = {        
      y:0,
      x:0,
      offsetLeft:null,
      offsetTop:null
  }     
  componentWillReceiveProps(nextProps) {           
      if (nextProps.isCaptured) {                        
          this.setState({
              y: nextProps.pageY - this.state.offsetTop - window.scrollY + 5,
              x: nextProps.pageX - this.state.offsetLeft - 5
          })
      } else {
          this.setDimentions();
      }        
  }
  componentDidMount() {
      this.setDimentions();
  }    
  setDimentions = () => {
      const coords = this.node.getBoundingClientRect();
      this.setState({
          offsetLeft: coords.left,
          offsetTop: coords.top,
          y:0,
          x:0
      })
  }
  handleMouseDown = (e) => {        
      this.props.setFrom(this.props.order);
  }
  handleMouseOver = () => {
      if (this.props.isCaptured) {
          return;
      } else {
          this.props.setTo(this.props.order)
      }
  }    
  handleClickLink = (e) => {        
      e.stopPropagation();        
      chrome.tabs.update({
          url: e.target.href
      }); 
  }
  render() {
      const { isCaptured, order, val } = this.props;
      return (            
              <div className="grid__item" 
                   ref = {node => this.node = node}
                   onMouseDown = {this.handleMouseDown}
                   onMouseOver = {this.handleMouseOver}
                   style = {{
                       transform:`translate(${this.state.x}px, ${this.state.y}px)`,
                       zIndex:isCaptured ? 100 : 0,
                       order: order                         
                   }}>
                   <img className="grid__item-icon" src = {`http://favicon.yandex.ru/favicon/${val.domain}`}/>
                   <a href={`${val.url}`} className="grid__item-link" onMouseDown = {this.handleClickLink}>Перейти</a>
              </div>                                            
      );
  }
}

export default DraggerItem;