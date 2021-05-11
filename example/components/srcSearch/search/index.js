import React,{ Fragment } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Search extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      show: false
    }
    this.spreadSearch = this.spreadSearch.bind(this)
  }
  // 当传入的visiable发生变化时，更新state，仅由props驱动
  // static getDerivedStateFromProps(props, state){
  //   if(props.visiable !== state.show){
  //     return {
  //       show: props.visiable
  //     }
  //   }
  //   return null
  // }
  spreadSearch(){ 
    this.setState({
      show: !this.state.show
    })
  }
  render(){
    const { show } = this.state;
    const { height } =  this.props;
    var searchHidden = {
      height: 0,
    }
    var searchShow = {
      height: height,
    }
    return (
      <Fragment>
        <div className="wb-search-title">
          <div onClick={this.spreadSearch} className="wb-search-spread">
              {
                this.state.show?<span className='wb-search-spreadOut'>收起</span>:<span className='wb-search-spreadIn'>展开</span>
              }
          </div>
        </div>
        <div className="wb-search-root" style={show?searchShow:searchHidden}>
          {this.props.children}
        </div>
      </Fragment>
    )
  }
}

Search.propTypes = {
  visiable: PropTypes.bool,
  height: PropTypes.number
}
Search.defaultProps = {
  visiable: true,
  height: 100
}

export default Search
