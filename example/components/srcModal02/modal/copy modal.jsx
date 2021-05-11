import React,{ Fragment } from 'react';
import PropTypes from 'prop-types';
import Protal from './index';
import './index.css';

class Modal extends React.Component{
  constructor(props){
    super(props)
    this.cancel = this.cancel.bind(this);
    this.comfirm = this.comfirm.bind(this);
    this.state = {
      show: true
    }
  }

  componentDidMount(){
    // console.log(this.props)
  }

  cancel(){
    this.props.onOk()
  }

  comfirm(){
    // this.setState({
    //   show: false
    // })
    this.props.onCancel()
  }

  render(){
    const {height,visiable,title,okText,cancelText} = this.props;
    return (
      <div className={`${visiable? 'wb-modal-mask':'wb-modal-mask-fade'}` } >
        <div className='wb-modal-cont' style={{ display: visiable?'block':'none' }} >
          <span className='wb-modal-close' onClick={this.cancel}>
            <svg t="1587556142462" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1893" width="16" height="16"><path d="M503.466667 467.285333l319.829333-319.829333a25.6 25.6 0 1 1 36.181333 36.181333l-319.829333 319.829334 319.829333 319.829333a25.6 25.6 0 1 1-36.181333 36.181333l-319.829333-319.829333-319.829334 319.829333a25.6 25.6 0 1 1-36.181333-36.181333l319.829333-319.829333-319.829333-319.829334a25.6 25.6 0 1 1 36.181333-36.181333l319.829334 319.829333z" p-id="1894"></path></svg>
          </span>
          <div className='wb-modal-title'>{title}</div>
          <div className='wb-modal-body'>
            {this.props.children}
          </div>
          <div className='wb-modal-footer'>
            <div onClick={this.comfirm} className="wb-modal-footer-comfirm" style={{ marginRight: 8 }}>{okText}</div>
            <div onClick={this.cancel} className="wb-modal-footer-cancel">{cancelText}</div>
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  visiable: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  title: PropTypes.string
}
Modal.defaultProps = {
  visiable: false,
  onOk: () => {},
  onCancel: () => {},
  okText: '确定',
  cancelText: '取消',
  title: 'Basic Modal'
}
export default Protal(Modal)
