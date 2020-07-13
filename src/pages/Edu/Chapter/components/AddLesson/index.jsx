import React, { Component } from 'react'
import {Card,Button,Form,Input,Switch } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';
import Upload from '@/components/UpLoad'
const {Item} = Form
export default class AddLesson extends Component {

    handleFinish = (values)=>{
		console.log(values);
	}
    render() {
        return (
            <Card
                title = {
                    <>
                        <Button 
                        type="link"
                        onClick={()=>{this.props.history.goBack()}}
                        icon={<ArrowLeftOutlined/>}
                        ></Button>
                        <span>添加课时</span>
                    </>
                }
            >
                <Form
                    wrapperCol={{span:6}}
                    onFinish={this.handleFinish}
                    initialValues={{free:true}}
                >
                    <Item 
                        label="课时名称"
                        name="name"
                        rules={[{required:true,message:"必须输入"}]}>
                        <Input></Input>
                    </Item>
                    <Item
                        label="是否免费"
                        rules={[{required:true,message:'必须选择'}]}
                        name="free"    
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="是" unCheckedChildren="否" />
                    </Item>
                    <Item
						label="课时视频"
						name="video"
					>
						<Upload/>
					</Item>
                    <Item wrapperCol={{offset:2}}>
						<Button type="primary" htmlType="submit">添加</Button>
					</Item>
                </Form>
            </Card>
        )
    }
}
