import React,{ Fragment } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Table extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            rowAllSelect: false,
            length: '',
            dataList: [], // 将props中的dataSource转换到state中
            selectList: [], // 选中框数据
            sorterList: [] // 用于排序记录
        }
        this.loading = false;
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
        function getSortList(arr){
          let sorterList = [];
          sorterList = arr.filter((el, index) => {
            return el.sorter
          })
          sorterList.map(el => {
            el.sorterIndex = 0
          })
          return sorterList
        }
        
        // 根据props中的dataSource 来确定selectList
        if(props.dataSource !== state.dataList){
            return {
                selectList: getSelect(props.dataSource),
                dataList: props.dataSource,
                sorterList: getSortList(props.columns)
            }
        }
        return null
    }

    // 单个选择
    selectChange = (e, index)=>{
      let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
      console.log('z',z);
        let value = e.target.checked;
        this.props.rowSelection.onChange && this.props.rowSelection.onChange(value, index);
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
    allSelectChange = (e)=>{
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
    // 排序
    sorterFuc(func,key){
      let flag =0;
      let { sorterList, dataList } = this.state;
      sorterList.forEach(el => {
        if(key === el.key){
          if(el.sorterIndex === 2){
            el.sorterIndex = 0
          }else{
            el.sorterIndex ++;
          }
          flag = el.sorterIndex
        }
      })
      if(flag === 1){
        dataList.sort(func);
      }else if(flag === 2){
        dataList.reverse();
      }else if(flag === 0){
        dataList.sort((a,b)=> {return a.key - b.key})
      }
      this.setState({dataList})
    }
    /**
     * 渲染表格的数据的行
     * 根据rowSelection判断是否有勾选框
     * @param {*} list 表格的每行数据
     */
    readerTd(list, index){
        return <tr key={index} className='wb-table-tbody-tr'>
            {
                this.props.rowSelection?<td className='wb-table-tbody-td'>
                    <div>
                        <label >
                          <input type="checkbox" className='checkbox-orige' 
                              checked={this.state.selectList[index].selected}
                              onChange={(e)=>this.selectChange(e, index)}/>
                        </label>
                    </div>
                </td>:null
            }
            {
                this.props.columns.map((item, index) => {
                    if(item.dataIndex){
                        return (
                            <td key={index} className='wb-table-tbody-td'>
                                <div>{list[item.key]}</div>
                            </td>
                        )
                    }else{
                        return <td key={index} className='wb-table-tbody-td'>
                            <div>{item.render(list)}</div>
                        </td>
                    }
                })
            }
        </tr>
    }
    /**
     * 渲染表头
     * 根据sorter判断是否有排序
     * @param {*} item 
     */
    renderTr(item){
        return (
            <th align="left" key={item.key} className='wb-table-thead-th'>
                {
                  item.sorter?
                  <Fragment>
                    <div className="wb-table-thead-title" onClick={() =>this.sorterFuc(item.sorter,item.key)}>
                      <span>{item.title}</span> 
                      <span className="wb-table-thead-title-order">
                        <span className={`wb-table-up ${item.sorterIndex === 1?'wb-table-up-color': ''}`}></span>
                        <span className={`wb-table-down ${item.sorterIndex === 2?'wb-table-down-color':''}`}></span>
                      </span>
                    </div>
                    <div className="wb-table-thead-sort">
                      <svg t="1586863400364" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2742" width="16" height="16"><path d="M576 940.8c-17.6 0-35.2-4.8-51.2-14.4l-128-80c-28.8-17.6-44.8-48-44.8-81.6V491.2L156.8 252.8A95.68 95.68 0 0 1 144 150.4c16-33.6 49.6-54.4 86.4-54.4H792c38.4 0 72 20.8 88 54.4 16 33.6 11.2 73.6-12.8 102.4L672 491.2v353.6c0 35.2-19.2 67.2-49.6 83.2-14.4 8-30.4 12.8-46.4 12.8zM230.4 160c-19.2 0-27.2 14.4-28.8 17.6s-8 19.2 4.8 33.6l203.2 248c4.8 6.4 8 12.8 8 20.8v284.8c0 11.2 6.4 20.8 14.4 27.2l128 80c14.4 9.6 27.2 3.2 32 1.6 4.8-3.2 16-11.2 16-27.2V480c0-8 3.2-14.4 8-20.8l203.2-248c11.2-14.4 6.4-30.4 4.8-33.6-1.6-4.8-9.6-17.6-28.8-17.6H230.4z" fill="" p-id="2743"></path></svg>
                    </div>
                  </Fragment>
                  :<span>{item.title}</span>
                }
            </th>
        )
    }
    /**
     * 表格loading图形
     */
    loadingRender(){
      return  <div className={`wb-table-loading ${this.props.loading ? 'wb-table-content-blue' : ''}`}>
        <span className='wb-tabel-loading-icon'>
            <svg t="1586487416740" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3010" width="32" height="32"><path d="M750.59008766 239.67803955c9.13128638 0 17.03155541 3.29260253 23.7156372 9.9865725 6.69891334 6.69891334 9.99151587 14.62884546 9.99151659 23.7947383 0 9.26971435-3.29260253 17.30346656-9.9865725 23.89361572L679.00317383 392.62585473c-6.52587891 6.59509253-14.43603539 9.78881836-23.74530029 9.78881836-9.64050293 0-17.70391822-3.1986692-24.09136987-9.58117676-6.39733911-6.38745094-9.60095239-14.42120385-9.60095167-24.10125732 0-9.26971435 3.25799537-17.20458984 9.7245481-23.69091821l95.34704566-95.37176537c6.66430688-6.69891334 14.66839599-9.99151587 23.94799852-9.99151588zM512 141.21142578c9.29937744 0 17.23425293 3.29754663 23.84417701 9.88769508 6.56048608 6.59014916 9.86792016 14.52502465 9.86792016 23.79473901v134.81872558c0 9.37353516-3.30743408 17.30346656-9.86792016 23.89855981-6.60992408 6.59014916-14.54479957 9.88769508-23.84417701 9.88769507-9.3092649 0-17.24414039-3.29754663-23.85406518-9.88769507-6.56048608-6.59509253-9.86792016-14.52502465-9.86791944-23.89855981V174.89385987c0-9.26971435 3.30743408-17.20458984 9.86791944-23.79473901C494.76080298 144.50897241 502.69567847 141.21142578 512 141.21142578z m202.24291992 337.11108422h134.82861305c9.29937744 0 17.24414039 3.29260253 23.81451463 9.88769508C879.51574731 494.79541016 882.78857422 502.72534156 882.78857422 512c0 9.26971435-3.27777099 17.20458984-9.89758325 23.79473901-6.57531762 6.59014916-14.51513648 9.88769508-23.81451392 9.88769507h-134.82861304c-9.31915307 0-17.23425293-3.29754663-23.85406518-9.88769507-6.5505979-6.59509253-9.87780761-14.52502465-9.87780762-23.79473901 0-9.26971435 3.32720971-17.20458984 9.87780762-23.79473901 6.62475562-6.59014916 14.53491211-9.88769508 23.85406518-9.88769507zM273.69171166 239.67309547c9.12634301 0 17.03649878 3.29260253 23.72058058 9.9865725L392.73956299 345.04626489c6.65441871 6.69396997 10.00140405 14.52502465 10.00140404 23.69091749 0 9.26971435-3.28271508 17.30346656-9.87780761 23.89361572-6.60003662 6.49127173-14.55468773 9.88769508-23.86395264 9.88769579-9.4674685 0-17.46167016-3.29260253-23.93811035-9.78387498L249.71405006 297.35296607c-6.49127173-6.48632836-9.7245481-14.41625977-9.72454811-23.89361572 0-9.37353516 3.28765845-17.30346656 9.87780763-23.89361573 6.58026099-6.59509253 14.54479957-9.88769508 23.844177-9.88769507h-0.01977492zM512 680.50115967c9.29937744 0 17.23425293 3.29754663 23.84417701 9.88769507 6.56048608 6.59509253 9.86792016 14.52502465 9.86792016 23.89855981v134.71984888c0 9.36859107-3.30743408 17.30346656-9.86792016 23.89361571-6.60992408 6.59014916-14.54479957 9.88769508-23.84417701 9.88769508-9.3092649 0-17.24414039-3.29754663-23.85406518-9.88769508-6.56048608-6.59014916-9.86792016-14.52502465-9.86791944-23.89361571v-134.71984888c0-9.37353516 3.30743408-17.30346656 9.86791944-23.89855981 6.60992408-6.59014916 14.54479957-9.88769508 23.85406518-9.88769507zM174.92352295 478.32251h134.82861304c9.3092649 0 17.23425293 3.29260253 23.85406518 9.88769508 6.56048608 6.59014916 9.87780761 14.52008057 9.87780761 23.78979492 0 9.26971435-3.31237817 17.20458984-9.87780761 23.79473901-6.62475562 6.59014916-14.54479957 9.88769508-23.85406518 9.88769507H174.92352295c-9.29937744 0-17.24414039-3.29754663-23.81451392-9.88769507C144.48425269 529.19470239 141.21142578 521.26477027 141.21142578 512c0-9.26971435 3.27777099-17.20458984 9.89758325-23.79473901 6.57531762-6.59014916 14.51513648-9.88769508 23.81451392-9.88769507z m194.07568383 142.95629859c9.3092649 0 17.26391602 3.29754663 23.86395264 9.88769508 6.59509253 6.59509253 9.87780761 14.52502465 9.87780761 23.79473901 0 9.36859107-3.34698462 17.30346656-10.00140404 23.99743652l-95.32727075 95.26794457c-6.6840818 6.69891334-14.59423828 9.99645996-23.72058058 9.99645997-9.29937744 0-17.26391602-3.19372583-23.85406518-9.78881836-6.59509253-6.59014916-9.89758325-14.52008057-9.89758324-23.89361573 0-9.47735596 3.253052-17.51110816 9.7542119-23.89361572l95.32727003-95.37670946c6.67419434-6.69396997 14.65356445-9.9865725 23.95788598-9.98657179h0.01977563z m286.25866676 0c9.14611793 0 17.03649878 3.29754663 23.74530029 9.99151588l95.30255103 95.37670946c6.69891334 6.59014916 9.99151587 14.62390137 9.99151659 23.89361572 0 9.16589356-3.29260253 17.09582496-9.98657251 23.69091749-6.68902588 6.69396997-14.58435082 9.9865725-23.72552466 9.98657251-9.27960181 0-17.28369164-3.29260253-23.94799852-9.98657251L631.29504418 678.95373511c-6.46655273-6.49127173-9.7245481-14.52502465-9.72454881-23.99743652 0-9.26971435 3.31237817-17.20458984 9.87780761-23.79473829 6.6049807-6.59014916 14.54479957-9.88769508 23.84912109-9.88769579h-0.03460645z" p-id="3011" fill="#1296db"></path></svg>
        </span>
      </div>
    }
    render(){
        const {rowSelection,columns,loading,dataSource } = this.props;
        const { dataList } = this.state;
        return (
            <div className='wb-table-wrapper'>
              { loading ? this.loadingRender(): <span></span> }
              <table className='wb-table-content'>
                  <thead className='wb-table-thead'>
                      <tr className='wb-table-thead-tr'>
                          {
                              rowSelection?<th className='wb-table-thead-th' align="left">
                                  <div>
                                      <input type="checkbox" id="test" className='checkbox-orige' 
                                          checked={this.state.rowAllSelect}
                                          onChange={(e)=>this.allSelectChange(e)}/>
                                  </div>
                              </th>:null
                          }
                          {
                              columns.map(item => 
                                  {	return this.renderTr(item) }
                              )
                          }
                      </tr>
                  </thead>
                  <tbody className='wb-table-tbody'>
                      {
                        dataSource.length>0?
                          dataList.map((i, index) =>{
                              return this.readerTd(i, index)
                          }): <tr>
                            <td colspan={columns.length}>
                              <div className="wb-table-tbody-emptycont">数据为空</div>  
                            </td>
                          </tr>
                      }
                  </tbody>
              </table>
            </div>
        )
    }
}

Table.propTypes = {
	columns: PropTypes.array,
	dataSource: PropTypes.array,
  rowSelection: PropTypes.object,
  loading: PropTypes.bool
}
Table.defaultProps = {
	columns: [],
  dataSource: [],
  rowSelection: null,
  loading: false
}

export default Table;
