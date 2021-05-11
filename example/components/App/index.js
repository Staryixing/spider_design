import React from 'react';
// import TabelCom from '../Table/table.jsx';
// import Dialog from '../Dialog/index';
import style from './index.less';
import Input from '../SpiderInput/index';

export default () => (
  <div className={style.root}>
    <div className={style.sidebar}>
      主页菜单
    </div>
    <Input />
  </div>
)