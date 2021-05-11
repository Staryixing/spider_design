import React,{Component} from 'react';
import PropTypes from 'prop-types';
import '../styles.css';
/**
 * 下拉框组件
 * overlay 下拉内容
 * onClick 下拉li的点击事件
 * className 下拉li的样式
 */
class Dorpdown extends Component {
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

  // 焦点离开组件消失
  close (){
    this.setState({
      dialogVisible:false
    })
  };
  handleChoose(item){
    this.close();
    this.props.onClick(item)
  }

  render(){
    let newStyle = Object.assign({},{
        display: this.state.dialogVisible ? "block":"none",
    });
    return (
      <div onBlur={() => {this.close()}} tabIndex='122' className="dorpdown-root">                                                                                         
         {/* BUTTON按钮 */}
        <div onClick={this.toggleVis} >
          {this.props.children}
        </div>
        {/* 下拉内容 */}
        <div style={newStyle} className='dorpdown-down'>
            {
              this.props.overlay.length>0?<ul className={`${this.props.className} dorpdown-menu`}>
                {
                  this.props.overlay.map((item, index) =>
                    <li key={index} onClick={() => this.handleChoose(item)} className="dorpdown-menu-item">
                      {item.name}
                    </li>
                  )
                }
              </ul>: null
            }
        </div> 
      </div>
    )
  }
}
Dorpdown.propTypes = {
  overlay: PropTypes.array,
  onClick: PropTypes.func,
  className: PropTypes.string
}
Dorpdown.defaultProps = {
  overlay: [],
  onClick: () => {},
  className: ''
}

export default Dorpdown
