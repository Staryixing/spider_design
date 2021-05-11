import * as React from 'react';
import Animate from 'rc-animate';
import style from './index.less';

const Div = (props) => {
    const { style, show, } = props;
    console.log('styles', style);
    const newStyle = {  width: '200px',
    height: '200px',
    backgroundColor: 'red',display: show ? '' : 'none' };
    return <div  style={newStyle}/>;
};

class Dialog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            exclusive: false,
            enter: true,
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle () {
        this.setState({
            exclusive: true
        })
    }

    render(){
        const style = {
            width: '200px',
            height: '200px',
            backgroundColor: 'red',
        };
        return(
            <div>
                <span onClick={this.toggle}>show</span>
                <Animate
                    component=""
                    exclusive={this.state.exclusive}
                    showProp="show"
                    transitionName="fade"
                    >
                        {/* <div>2222</div> */}
                    <Div show={this.state.enter} style={style} />
                </Animate>
            </div>
        )
    }
}


export default Dialog
