import * as React from 'react';
import classNames from 'classnames';
import './index.css';

interface InputProps {
  value: string,
  type: string,
  disabled: boolean,
  maxLength: number,
  defaultValue: any,
  placeholder: string,
  onChange: (value:string)=> void
}

interface InputState {
  value: string,
  prevValue: any
}

class Input extends React.Component<InputProps,InputState>{
  
  constructor(props:InputProps){
    super(props)
    const value = typeof props.value === 'undefined'?props.defaultValue:props.value;
    this.state = {
      value: props.value,
      prevValue: props.value
    }
  }

  static getDerivedStateFromProps(nextProps: InputProps, currentState: InputState){
    const newState: Partial<InputState> = {prevValue: nextProps.value}
    if(nextProps.value !== undefined || currentState.prevValue !== nextProps.value){
      newState.value = nextProps.value;
    }
    return newState;
  }

  setValue(value: string, callback?: () => void) {
    this.props.onChange && this.props.onChange(value)
  }

  getControlled = ()=> {
    let { placeholder,type,disabled,maxLength } = this.props;
    return {
      placeholder,
      type,
      disabled,
      value: this.state.value,
      maxLength: maxLength,
      className: classNames(`${disabled?'spider_input_disabled':''}`,'input_root' ),
      onChange: (e:React.ChangeEvent<HTMLInputElement>) => {
        this.setValue(e.target.value)
      }
    }
  }

  render(){
    const inputContent = ()=> {
      return React.cloneElement(<input />, this.getControlled())
    }
    return inputContent()
  }
}

export default Input
