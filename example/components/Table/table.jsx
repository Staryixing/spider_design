import React from 'react';
import Table from '../srcTable/index';

class TabelCom extends React.Component{
    
    render(){
        const dataList = [
            {"id":"00000000018888","name":"dolore","roleId":"2","roleName":"运营","account":"test","active":true},
            {"id":"00000000028888","name":"occaecat","roleId":"1","roleName":"管理员","account":"17521311300","active":true},
            {"id":"00000000068888","name":"账户01","roleId":"2","roleName":"运营","account":"1111","active":true},
            {"id":"00000000088888","name":"苏妲己","roleId":"2","roleName":"运营","account":"111111","active":true},
            {"id":"00000000098888","name":"费用1","roleId":"2","roleName":"运营","account":"18612345678","active":true},
            {"id":"00000000108888","name":"三生三世","roleId":"2","roleName":"运营","account":"11","active":true},
            {"id":"00000000118888","name":"枕上书","roleId":"1","roleName":"管理员","account":"111","active":true},
            {"id":"00000000138888","name":"十里桃花","roleId":"2","roleName":"运营","account":"1234","active":true},
            {"id":"00000000158888","name":"zhanghu","roleId":"1","roleName":"管理员","account":"19012344321","active":true},
            {"id":"00000000228888","name":"账户胡","roleId":"3","roleName":"监管","account":"17611112222","active":true}]
        const rowSelection = {
            onChange:(value, index) => {
             // console.log('123', value, index)
            }
        };
        const columns = [
            {
              title: '账户名',
              key: 'name',
              dataIndex: 'name'
            },{
              title: '角色',
              key: 'roleName',
              dataIndex: 'roleName'
            },{
              title: '登入账号',
              key: 'account',
              dataIndex: 'account'
            },{
              title: '操作',
              key: 'oper',
              render: ()=>{
                // return <div className={styles.oper}>
                //   <img src={editorimg} alt="" onClick={this.addRole}/>
                //   <img src={deleteimg} alt=""/>
                // </div>
                return <div>
                    操作
                </div>
              }
            }
          ]
        return (
            <div>
                <span>表格</span>
                <div>
                <Table rowSelection={rowSelection} columns={columns} dataSource = {dataList} />
                </div>
            </div>
        )
    }

}

export default TabelCom
