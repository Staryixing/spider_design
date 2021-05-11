import React,{ Component } from 'react';
import ReactDom from 'react-dom';

export default function Protal(WrappedComponent){
      return class extends Component{
        constructor(props){
          super(props)
          this.state = {
            // rcDialogTitle:rcDialogTitle0
          }
          this.modalNum = 0;
          this.modalList = [];
        }
        
        componentWillMount(){
          this.node && this.node.remove()
        }
        renderContent(){
          return (
            <WrappedComponent {...this.props}/>
          )
        }
        componentWillMount(){
          this.node && this.node.remove()
        }
        /**
         * 如果第一次打开模态框,visiable为true，则创建dom
         * 再取消，则隐藏dom
         * 第二次，直接显示dom
         * 
         */
        render(){
          // console.log('弹框')
          // if(this.modalNum === 0 && !this.props.visiable){
          //   console.log('开始',this.modalNum)
          //   return null
          // }else if(this.modalNum === 0 && this.props.visiable){
          //   console.log('打开', this.modalNum)
          //   let node = document.createElement('div');
          //   let foo = {
          //     node: node,
          //     title:  'rgdialog' + this.modalNum
          //   }
          //   this.modalNum = 1;
          //   this.modalList.push(foo)
          //   document.body.appendChild(node);
          //   return ReactDom.createPortal(this.renderContent(), node)
          // }else if(this.modalNum === 1 && !this.props.visiable){
          //   console.log('关闭',this.modalNum)
          //   return ReactDom.createPortal(this.renderContent(), this.modalList[0].node)
          // }else{
          //   console.log('其他')
          //   return ReactDom.createPortal(this.renderContent(), this.modalList[0].node)
          // }
          if(this.props.visiable){
              this.node = document.createElement('div');
              document.body.appendChild(this.node);
              return this.node && ReactDom.createPortal(this.renderContent(), this.node)
          }else{
            return null
          }
        }
    }
}

