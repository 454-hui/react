import React from 'react'
import { Button, Form, Input, Radio } from 'antd';
import './Form.css'
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Form layout="vertical">
                    <Form.Item label="作者">
                        {getFieldDecorator('author', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入你的名字！'
                                },
                                {
                                    pattern: /^(?!(\s+$))/, 
                                    message: '禁止输入空格',
                                }
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="推文">
                        {getFieldDecorator('content', {
                            rules: [
                                {
                                    required: true,
                                    message: '内容不能为空！'
                                },
                                {
                                    pattern: /^(?!(\s+$))/,
                                    message: '禁止输入空格',
                                }
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="链接">
                        {getFieldDecorator('url', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入你的文章链接！'
                                },
                                {
                                    pattern: /^(?!(\s+$))/,
                                    message: '禁止输入空格',
                                }
                            ],
                        },
                            
                        )(<Input />)}
                    </Form.Item>
                    <Form.Item className="collection-create-form_last-form-item">
                        {getFieldDecorator('type', {
                            initialValue: 'Android',
                        })(
                            <Radio.Group>
                                <Radio value="Android">Android</Radio>
                                <Radio value="App">App</Radio>
                                <Radio value="iOS">iOS</Radio>
                                <Radio value="休息视频">休息视频</Radio>
                                <Radio value="前端">前端</Radio>
                                <Radio value="拓展资源">拓展资源</Radio>
                                <Radio value="瞎推荐">瞎推荐</Radio>
                                <Radio value="福利">福利</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                    <Button
                        style={{ backgroundColor: "#1890ff",color : "#ffffff"}}
                        onClick={onCreate}
                    >
                        添加
                    </Button>
                    <Button
                        className='cancel_button'
                        onClick={onCancel}
                    >
                        取消
                    </Button>
                </Form>
            );
        }
    },
);

class CollectionsPage extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.props.history.push({
            pathname : '/app',
            state : {
                flag : true,
            }
        })
    };
    //时间
    Timealong = () => {
        const newDate = new Date();
        const year = newDate.getFullYear()
        const month = newDate.getMonth() + 1;  // 获取月份(0-11,0代表1月,用的时候记得加上1)
        const day = newDate.getDate();  // 获取日(1-31)
        const hours = newDate.getHours();  // 获取小时数(0-23)
        const minut = newDate.getMinutes();  // 获取分钟数(0-59)
        const second = newDate.getSeconds();  // 获取秒数(0-59)
        const timeStr = `${year}-${month}-${day}T${hours}:${minut}:${second}.0Z`
        return timeStr
    }
    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.time = this.Timealong()
            values.id = new Date()
            this.props.history.push({
                pathname: '/app',
                state: {
                    values,
                    addflag : true
                }
            });
            form.resetFields();
            this.setState({ visible: false });
        });
    };
    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div className='form_data'>

                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    onCreate={this.handleCreate}
                    onCancel={this.handleCancel}
                />
            </div>
        );
    }
}

export default CollectionsPage