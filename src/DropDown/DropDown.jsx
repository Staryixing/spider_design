import React,{Component} from 'react';
import PropTypes from 'prop-types';
import style from './index.less';

export default class extends Component {
  constructor(props){
    super(props)
    this.state ={
      dialogVisible: false,
    }
    this.toggleVis = this.toggleVis.bind(this)
    this.close = this.close.bind(this)
  }

  componentWillReceiveProps(newProps){
    if(!newProps.showor){
      this.setState({
        dialogVisible: false
      })
    }
  }

  toggleVis (e){
    e.persist()
    this.setState({
      dialogVisible:!this.state.dialogVisible,
    })
  };

  close (){
    this.setState({
      dialogVisible:false
    })
  };

  render(){
    let newStyle = Object.assign({},style,{
        display: this.state.dialogVisible ? "block":"none",
    });
    return (
      <div onBlur={() => {this.close()}} className={style.root} tabIndex='122'>
         {/* BUTTON按钮 */}
        <div onClick={this.toggleVis} className={style.selectBtn}>
          {this.props.children}
        </div>
        {/* 下拉内容 */}
        <div style={newStyle} className={style.modelContent}>
         {this.props.overlay}
        </div>
      </div>
    )
  }
}
