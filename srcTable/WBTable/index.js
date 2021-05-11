import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
class YTable extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            rowAllSelect: false,
            length: '',
            dataList: [],
            selectList: []
        }
    }
    static getDerivedStateFromProps(props, state){
        function getSelect(arr){
            let selectList = [];
            arr.forEach(el => {
                selectList.push({
                    selected: false
                })	
            })
            return selectList
        }
        if(props.dataSource !== state.dataList){
            return {
                selectList: getSelect(props.dataSource),
                dataList: props.dataSource
            }
        }
        return null
    }
    // 单个选择
    selectChange(e, index){
        let value = e.target.checked;
        this.props.rowSelection.onChange(value, index);
        let { selectList } = this.state;
        selectList[index].selected = value;
        this.setState({
            selectList: selectList
        },() => {
                let foo = this.state.selectList.every(val => {
                        return val.selected
                })
                foo? this.setState({ rowAllSelect: true }):this.setState({ rowAllSelect: false })
        })
    }
    // total选择
    allSelectChange(e){
        let value = e.target.checked;
        let { selectList} = this.state;
        selectList.forEach(el => {
            el.selected = value
        })
        this.setState({	
            selectList,
            rowAllSelect: value
        })
    }
    /**
     * 渲染表格的数据的行
     * @param {*} list 表格的每行数据
     */
    readerTd(list, index){
        return <tr key={list.id}>
            {
                this.props.rowSelection?<td>
                    <div className={styles.checkbox}>
                        <input type="checkbox" className={styles.check_orige} 
                            checked={this.state.selectList[index].selected}
                            onChange={(e)=>this.selectChange(e, index)}/>
                    </div>
                </td>:null
            }
            {
                this.props.columns.map((item, index) => {
                    if(item.dataIndex){
                        return (
                            <td key={index}>
                                <div>{list[item.key]}</div>
                            </td>
                        )
                    }else{
                        return <td key={index}>
                            <div>{item.render()}</div>
                        </td>
                    }
                })
            }
        </tr>
    }
    /**
     * 渲染表头
     * @param {*} item 
     */
    renderTr(item){
        return (
            <th align="center" key={item.key}>
                <div>{item.title}</div>
            </th>
        )
    }
    render(){
        return (
            <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            {
                                this.props.rowSelection?<th>
                                        <div className={styles.checkbox}>
                                                <input type="checkbox" id="test" className={styles.check_orige} 
                                                        checked={this.state.rowAllSelect}
                                                        onChange={(e)=>this.allSelectChange(e)}/>
                                        </div>
                                </th>:null
                            }
                            {
                                    this.props.columns.map(item => 
                                            {	return this.renderTr(item) }
                                    )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                                this.state.dataList.map((i, index) =>{
                                        return this.readerTd(i, index)
                                })
                        }
                    </tbody>
            </table>
        )
    }
}

YTable.propTypes = {
	columns: PropTypes.array,
	dataSource: PropTypes.array,
	rowSelection: PropTypes.object
}
YTable.defaultProps = {
	columns: [{}],
	dataSource: [{}],
}

export default YTable;
