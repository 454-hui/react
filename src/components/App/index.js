import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Button, Popconfirm, Input,  Form, } from 'antd';
import Card from '../react-spring'
import Loading from '../Loading';
import {
    Link,
} from 'react-router-dom';
import { mapDispatch, mapState } from "../../Action"
import 'antd/dist/antd.css';
import './App.css';
import TableCell from '../Table'
const EditableContext = React.createContext();
class App extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount = () => {
        this.setDataInFetch()
    }
    setDataInFetch = () => {
        this.props.FetchAsync("FETCH")
    }
    handleChange = (pagination, filters, sorter) => {
        console.log('各种参数', pagination, filters, sorter);
        this.props.SortFliterAction({ filters, sorter })
    }
    //删除
    clearThis = (key) => {
        const { result } = this.props.results
        const dataSource = result
        // fetch(
        //     'http://localhost:8000/delete',
        //     {
        //         method: "POST",
        //         body: key,
        //     }
        // ).then(res => {
        //     return res.json
        // })
        this.props.FetchAsync("DeleteFetch", { key, dataSource })
        setTimeout(() => {
            this.props.LoadingAction()
        }, 1000)
    }
    //搜索
    onSearch = (value, event) => {
        if(value === null){
            return
        }
        console.log(typeof(value))
        this.props.FetchAsync("SearchFetch", value)
        // console.log(event)
        setTimeout(() => {
            this.props.LoadingAction()
        }, 1000)
    }
    //重置
    reset = () => {
        this.refs.searchBar.input.state.value='';
        this.setDataInFetch()
        this.props.ResetAction()
        setTimeout(() => {
            console.log(this.props.loading)
            this.props.LoadingAction()
        }, 1000)
    }
    isEditing = record => record.id === this.props.editingKey;
    edit = (key) => {
        this.props.EditAction(key)
    }
    //修改
    save = (form, key) => {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            let dataObj = row;
            dataObj.id = key;
            dataObj = JSON.stringify(dataObj)
            fetch("http://localhost:8000/edit", { method: "POST", body: dataObj })
                .then(res => {
                    console.log(res)
                })
            const { oldData } = this.props.results
            const newData = [...oldData];
            const index = newData.findIndex(item => key === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.props.SaveAction(newData)
            } else {
                newData.push(row);
                this.props.SaveAction(newData)
            }
        });
    }
    cancel = () => {
        this.props.EditAction('')
    }
    onLonding = () => {
        this.props.LoadingFlase()
    }
    
    addData = (value) => {
        console.log(value)
        let newValue = JSON.stringify(value.values)
        fetch(
            'http://localhost:8000/add',
            {
                method: "POST",
                body: newValue,
            }
        )
        const { results } = this.props
        results.result.push(value)
        this.props.AddAction(results.result)
        setTimeout(() => {
                this.props.LoadingAction()
        }, 1000)
    }
    render() {
        let {
            sortedInfo,
            filteredInfo,
            results,
            loading,
        } = this.props;
        const { location } = this.props.history
        if(location.state && location.state.flag ){
                this.props.location.state.flag = false
                this.props.LoadingAction()
        }
        if (location.state && location.state.addflag) {
            console.log('添加了一次')
            this.props.location.state.addflag = false
            this.addData(location.state)
        }
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const data = results.result;
        const { Search } = Input
        const components = {
            body: {
                cell: TableCell,
            },
        };
        const column = [
            {
                width: 150,
                align: "center",
                title: '作者',
                dataIndex: 'author',
                sortOrder: sortedInfo.columnKey === 'author' && sortedInfo.order,
                sorter: (a, b) => a.who.localeCompare(b.who),
                key: 'author',
                ellipsis: true,
                editable: true,
            },
            {
                width: 650,
                align: "center",
                title: '推文',
                dataIndex: 'content',
                key: 'content',
                sortOrder: sortedInfo.columnKey === 'content' && sortedInfo.order,
                sorter: (a, b) => a.content.localeCompare(b.content),
                editable: true,
                ellipsis: true,
            },
            {
                width: 150,
                align: "center",
                title: '类型',
                dataIndex: 'type',
                sorter: (a, b) => a.type.localeCompare(b.type),
                key: 'type',
                filters: [
                    { text: 'Android', value: 'Android' },
                    { text: 'App', value: 'App' },
                    { text: 'iOS', value: 'iOS' },
                    { text: '休息视频', value: '休息视频' },
                    { text: '前端', value: '前端' },
                    { text: '拓展资源', value: '拓展资源' },
                    { text: '瞎推荐', value: '瞎推荐' },
                    { text: '福利', value: '福利' },
                ],
                filteredValue: filteredInfo.type || null,
                onFilter: (value, record) => record.type.includes(value),
                sortOrder: sortedInfo.columnKey === 'type' && sortedInfo.order,
                ellipsis: true,
            },
            {
                width: 300,
                align: "center",
                title: '发布时间',
                dataIndex: 'time',
                sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
                key: 'time',
                sorter: (a, b) => a.time.localeCompare(b.time),
                editable: true,
                ellipsis: true,
            },
            {
                width: 400,
                align: "center",
                title: '链接',
                dataIndex: 'url',
                sortOrder: sortedInfo.columnKey === 'url' && sortedInfo.order,
                sorter: (a, b) => a.url.localeCompare(b.url),
                key: 'url',
                editable: true,
                ellipsis: true,
            },
            {
                align: "center",
                title: "修改",
                render: (text, record) => {
                    const { editingKey } = this.props;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <a
                                        onClick={() => this.save(form, record.id)}
                                        style={{ marginRight: 8 }}
                                    >
                                        更改
                                    </a>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm
                                title="确定放弃更改吗"
                                onConfirm={() => this.cancel(record.id)}
                                cancelText='取消'
                                okText='确认'
                            >
                                <a>撤销</a>
                            </Popconfirm>
                        </span>
                    ) : (
                            <a disabled={editingKey !== ''} onClick={() => this.edit(record.id)}>
                                修改
                            </a>
                        );
                },
            },
            {
                align: "center",
                title: '删除',
                ellipsis: true,
                render: (text, record) => {
                    return (
                        <Popconfirm
                            title="确定要删除吗"
                            onConfirm={() => this.clearThis(record.id)}
                            cancelText='取消'
                            okText='确认'
                        >
                            <a>删除</a>
                        </Popconfirm>
                    )
                },
            },
        ];
        const columns = column.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <div>
                {
                    data
                        ? <div className="table-operations">
                            <Search
                            ref='searchBar'
                                placeholder="按推文进行搜索....."
                                enterButton="搜索"
                                size="large"
                                onSearch={(value, event) => this.onSearch(value, event)}
                                style={{ width: 600 }}
                                className="search"
                            />

                            <Button
                                onClick={this.reset}
                                className="reset"
                            >
                                重置
                            </Button>
                            <Button
                                className='set_button'
                                onClick={this.onLonding}
                            >
                                <Link to='/form'>
                                    创建
                                </Link>
                            </Button>
                            {
                                loading ?
                                    <EditableContext.Provider value={this.props.form}>
                                        <Table
                                            components={components}
                                            bordered
                                            rowKey="id"
                                            columns={columns}
                                            rowClassName="editable-row"
                                            dataSource={data}
                                            pagination={{
                                                onChange: this.cancel,
                                            }}
                                            onChange={this.handleChange}
                                        />
                                        <Card></Card>
                                    </EditableContext.Provider>
                                    : <Loading></Loading>
                            }

                        </div>
                        :
                        <Loading></Loading>
                }
            </div>
        );
    }
}

const FormTableApp = Form.create()(connect(mapState, mapDispatch)(App));
export {
    EditableContext
}
export default FormTableApp