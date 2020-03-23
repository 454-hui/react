import React, { useState } from 'react'
// import { Button } from 'antd'
import './SetCom.css'
import { Button, Form, Input, Radio } from 'antd';


const SetCom = function (props) {
    const [author, setUsername] = useState('');
    const [content, setUserText] = useState('');
    const [url, setUserUrl] = useState('');
    const [type, setUserType] = useState('')
    const click = () => {
        props.history.push({
            pathname: '/biao',
            state: {
                author,
                content,
                type,
                url
            }
        });
    };
    const cancel = () => {
        props.history.push({
            pathname: '/biao'
        })
    }
    return (
        <div className='main'>
            <div className='context'>
                <span
                    className='spandiv'
                >
                    填写你要添加的内容
                </span>
                作者&nbsp;:&nbsp;<input placeholder="请输入你的姓名" onChange={(e) => { setUsername(e.target.value) }} /><br />
                推文&nbsp;:&nbsp;<input placeholder="请输入你的推文标题" onChange={(e) => { setUserText(e.target.value) }} /><br />
                链接&nbsp;:&nbsp;<input placeholder='请输入你的推文地址' onChange={(e) => { setUserUrl(e.target.value) }} /><br />
                类型&nbsp;:&nbsp;<input placeholder='请输入你的推文类型' onChange={(e) => { setUserType(e.target.value) }} /><br />
                <Button
                    onClick={click}
                    className='setadd'
                >添加
                </Button>
                <Button
                    onClick={cancel}
                >
                    取消
                </Button>
            </div>
        </div>
    );
};
export default FormModal
