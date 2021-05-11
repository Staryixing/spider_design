import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Card extends React.Component{
  /**
   * 渲染head的其他信息
   */
  renderHeader(arr, data){
    return arr.map((el)=> {
      return <div className="wb-card-unit-pd" key={el.key}>
        {`${el.label}: `}
        {data[el.key]}
      </div>
    })
  }
  /**
   * 渲染foot信息
   */
  renderFoot(arr,data){
    return arr.map((el) => {
      return <div className="wb-card-unit-pd" key={el.key}>
        {`${el.label}: `}
        <span style={{ color: '#5AB431' }}>
          { data[el.key]}
          { el.unit }
        </span>
      </div>
    })
  }

  render(){
    const {headSource,footSource,dataSource,title,width} = this.props;
    return (
      <div className="wb-card-root">
          <div className="wb-card-root-header">
            <div className="wb-card-root-header-title">{title}</div>
              { this.renderHeader(headSource,dataSource) }
            <div className="wb-card-root-oper">
              {this.props.children}
            </div>
          </div>
          <div className="wb-card-root-footer">
            { this.renderFoot(footSource,dataSource) }
          </div>
      </div>
    )
  }
}

Card.propTypes = {
  headSource: PropTypes.array,
  footSource: PropTypes.array,
  dataSource: PropTypes.object,
  title:PropTypes.string,
}
Card.defaultProps = {
  headSource: [],
  footSource: [],
  dataSource: {},
  title: '自定义',
}
export default Card
