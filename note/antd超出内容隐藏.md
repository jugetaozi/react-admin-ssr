#### 一、 实现思路

我们都知道让溢出内容变成...,只需要以下:


```
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```

表格里的内容直接引用这段代码可不行。

因为table的宽度我们并不能控制,我们加的内容会自动撑大表格列表宽度.

关键的一步是给`table`加上一个样式:**table-layout:fixed;**

这条属性就是让table的内部布局固定大小

归纳总结Table要实现这个功能,需要这几个条件:

1. table宽度可控: `table-layout:fixed;`
2. 父层(table)宽度固定,并且设置超出隐藏:

```
width: 500px;
overflow: hidden;
```

1. 应用的列加上以下样式:

```
white-space: nowrap;        //强制不换行
overflow: hidden;           //超出部分隐藏
text-overflow: ellipsis;    //显示省略符号来代表被修剪的文本
```

#### 二、 普通Table

为了美观,加了一些css样式,大家可以忽略,重点看带有***的即可

```
//css
<style>
    table{
        table-layout:fixed; //******
    }
    
    .gridtable {
        width: 500px;       //******
        overflow: hidden;   //******
        font-family: verdana,arial,sans-serif;
        font-size:11px;
        color:#333333;
        border-width: 1px;
        border-color: #666666;
        border-collapse: collapse;
        margin: 20px auto;
        text-align: center;
    }
    .gridtable th {
        border-width: 1px;
        padding: 8px;
        border-style: solid;
        border-color: #666666;
        background-color: #dedede;
    }
    .gridtable td {
        border-width: 1px;
        padding: 8px;
        border-style: solid;
        border-color: #666666;
        background-color: #ffffff;
    }
    .personInfo{
        white-space: nowrap;    //******
        overflow: hidden;       //******
        text-overflow: ellipsis;//******
    }
</style>



//html
<table class="gridtable">
    <tr>
        <th style="width:100px">姓名</th>
        <th style="width:100px">年龄</th>
        <th class="personInfo">信息</th>
    </tr>
    <tr>
        <td>xiaobe</td>
        <td>18</td>
        <td class="personInfo">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaa</td>
    </tr>
    <tr>
        <td>xiaobi</td>
        <td>20</td>
        <td class="personInfo">bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbabbbbbbb</td>
    </tr>
</table>
```

**效果:**
![img](https://img2018.cnblogs.com/blog/1414709/201809/1414709-20180926185007926-1280470088.png)

#### 三、 ANT Design实现

```
//css
table{
    table-layout:fixed;
}
.resultColumns{
    overflow: hidden;
}
.resultColumnsDiv{
    width:92%;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
//html
let columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 150
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 350,
    }, {
      title: '信息',
      dataIndex: 'info',
      key: 'info',
      className: styles.resultColumns,
      render:
        (text, record) => (
          <div title={record.result} className={styles.resultColumnsDiv}>{record.result}</div>
        ),
    },
]
let detectList = [{
    key: 1,
    name: 'xiaobe',
    age: 18,
    info: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaa'
},{
    key: 2,
    name: 'xiaobi',
    age: 20,
    info: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbabbbbbbb'
},]

<Table
    className={styles.detectListTable}
    dataSource={detectList}
    columns={columns}
/>
```

注意: 我们可以不用给省略的列加宽度,给其他的列固定宽度后,antd会自动计算该列的宽度.

**如果三列都设置了宽度,会导致无效的。antd还是会按照原来百分比计算**

因为引入antd比较麻烦,所以就没有放出效果图。有什么疑问,欢迎留言