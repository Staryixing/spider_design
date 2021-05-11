import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';

export default function Protal(WrappedComponent){
  return class extends Component{
    constructor(props){
      super(props)
      this.state = {
        style: {
          left: 0,
          top: 0,
          width: 0
        },
        visiable: false
      }
      this.myRef = React.createRef();
    }
    componentDidMount(){
      let myRef = this.myRef.current;
      let styles = {
        left: myRef.offsetLeft,
        top: myRef.offsetTop + myRef.offsetHeight,
        width: myRef.offsetWidth,
      }
      this.setState({ style: styles })
    }
    show(){
      this.setState({
        visiable: true
      })
    }
    unshow(){
      this.setState({
        visiable: false
      })
    }
    componentWillMount(){
      this.node && this.node.remove()
    }
    renderContent(){
      return (
        <WrappedComponent {...this.props} style={ this.state.style} onCancel={()=>this.unshow()}/>
      )
    }
    render(){
      if(this.state.visiable){
        this.node = document.createElement('div');
        document.body.appendChild(this.node)
        return (
          <div onMouseLeave={()=>this.unshow()}>
            <div ref={this.myRef} onClick={() => this.show()}>
              {this.props.children}
            </div>
            {this.node && ReactDom.createPortal(this.renderContent(), this.node)}
          </div>
        )
      }else{
        this.node && this.node.remove()
        return (
          <div onMouseLeave={()=>this.unshow()}>
            <div ref={this.myRef} onClick={() => this.show()}>
              {this.props.children}
            </div>
          </div>
        )
      }
    }
  }
}
