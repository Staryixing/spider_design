import React, { Fragment } from 'react';
import Protal from './index.js';
import '../styles.css';

class DropDown extends React.Component{
  constructor(props){
    super(props);
  }
  handleChoose(item){
    this.props.onCancel();
    this.props.onClick(item)
  }
  render(){
    const { style,overlay } = this.props;
    let newStyle = Object.assign({}, style)
    return (
      <Fragment>
        <div style={newStyle} className="dorpdown-root" tabIndex={122}>
          <ul className={`${this.props.className} dorpdown-menu`}>
            {
              overlay.map(item => {
                return <li className="dorpdown-menu-item" onClick={() => this.handleChoose(item)} key={item.name}>{item.name}</li>
              })
            }
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default Protal(DropDown)
