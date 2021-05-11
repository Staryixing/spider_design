import React,{ useState } from 'react';
import style from './index.less';
import { DropDown } from '../../../srcCreateElement/index';
import { Message } from '../../../srcMessage/index';

const FRIUT = [
  {
    id: '1',
    name: '苹果'
  },{
    id: '2',
    name: '梨子'
  },{
    id: '3',
    name: '香蕉'
  }
]

function MyDropDown(){
  const [num, setNum] = useState(1)
  const [friut, setFriut] = useState('苹果')
  const [ dialogVisible, setdialogVisible ] = useState(true)

  const handleFriut = (item) => {
    let c;
    c = FRIUT.filter(f => {return f.id === item} )
    setFriut(c[0].name)
    setdialogVisible(!dialogVisible)
  }

  const menu = (
    <ul className={style.menuStyle}>
       {
         FRIUT.map(item => <li key={item.id} onClick={() => handleFriut(item.id)}>
           {item.name}
         </li>)
       }
    </ul>
  )

  const handleNum = (item) => {
    setNum(item)
  }

  const handleSuccess = ()=> {
    console.log('点击删除')
    Message.success('删除成功！', 6000)
  }
  const handleError = ()=> {
      Message.error('编辑成功！')
  }
  const handleWaring = () => {
      Message.warning('小心提示')
  }
  const handleClose = ()=>{

  }
  return (
    <div>
      <section>
        <div className={style.bar}>
          <div style={{ width: 200 }}>
            <DropDown overlay={menu} >
              <div className={style.selectContent}>
                {dialogVisible}
                <span className={style.selected}>{friut}</span>
              </div>
            </DropDown>
          </div>
        </div>
      </section>
      <section>
        <div onClick={handleSuccess}>点击成功</div>
        <div onClick={handleError}>点击失败</div>
        <div onClick={handleWaring}>点击警告</div>
        <div onClick={handleClose}>关闭</div>
      </section>
    </div>
  )
}

export default MyDropDown;
