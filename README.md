## 项目名称
  构建ui组件

## 项目结构
  1. example 使用组件的例子
  2. src 组件源码
  3. dist 发布打包码

## 项目构建

## UI组件
  1. src为下拉组件(1.0.0 版)

| 参数        | 说明    |  类型  |
| --------   | -----:   | :----: |
| 子组件(children) |  被挂载的dom     |   ReactNode    |
| overlay        |  menu数据    |    Array   |
| onClick        |  menu点击事件   |  Function     |
| className      |  自定义menu样式     |   string    |

  2. src下拉组件(1.0.1版)

  3. srcTable 表格组件

| 参数        | 说明    |  类型  |
| --------   | -----:   | :----: |
| columns     |  表头信息     |   Array    |
| dataSource  |  表单数据    |    Array   |
| rowSelection |  勾选        |  object     |
| loading     |  数据加载样式     |   boolean    |

  4. srcCard 卡片组件

| 参数        | 说明    |  类型  |
| --------   | -----:   | :----: |
| title     |  名称     |    String    |
| headSource  |  第一行的信息    |    Array   |
| footSource |  第二行的信息       |  Array     |
| dataSource     |  数据值     |   object    |
| children     |  右边操作的内容     |   ReactNode   |

  5. srcSearch 折叠搜索框

| 参数        | 说明    |  类型  | 默认 |
| --------   | -----:   | :----: | :----: |
| visiable   |  是否展开     |    Bool    |  true |
| height  |  第一行的信息    |    Array   |

##  发布组件
 1. 修改package.json 中 scripts/transpile 里的文件名
 2. 修改package.json 中 name 和description 
 3. npm run transpile  打包成dist文件
 4. npm login --registry=http://192.168.1.29:8081/repository/npm-hosted/   // 输入用户名密码
 5. npm publish --registry=http://192.168.1.29:8081/repository/npm-hosted/ 

## 下载组件
1. nrm add team http://192.168.1.24:8081/repository/npm-group/  // 增加这个源 命名为team
2. nrm use team  
3. npm install XX

