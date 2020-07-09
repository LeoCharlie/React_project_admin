import React, { Component } from 'react'
import {Card,Button,Form, Input} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';

const {Item} = Form //从Form组件中获取Item组件

export default class AddSubject extends Component {
	//表单校验成功的回调
	onFinish = values => {
		console.log('表单校验成功',values);
	};
	//表单校验失败的回调
	onFinishFailed = err => {
		console.log('表单校验失败:', err);
	};
	render() {
		return (
			<Card 
				title={
					<>
						<Button 
							onClick={()=>{this.props.history.goBack()}}
							type="link" 
							icon={<ArrowLeftOutlined />}
						></Button>
						<span>添加课程分类</span>
					</>
				}
			>
				<Form
					labelCol={{span:3}}//文字提示去所占比
					wrapperCol={{span:6}}//输入区域去所占比
					//name="basic"//表单的名字(非必须)
					onFinish={this.onFinish}//点击提交按钮，且表单校验成功的回调
					onFinishFailed={this.onFinishFailed}//点击提交按钮，且表单校验失败的回调
				>
					<Item 
						name="name" //必须给输入项一个名字
						label="课程分类名" 
						rules={[ //rules中配置校验规则
							//每一条规则就是一个对象，注意：必须给Item一个name属性
							{required:true,message:'必须填写！'},
							{max:6,message:"超过6位！"}
						]}
					>
						<Input/>
					</Item>
					<Item name="parentId" label="父级分类" rules={[{required:true,message:'必须填'}]}>
						<Input />
					</Item>
					<Item wrapperCol={{offset: 3}}>
						<Button type="primary" htmlType="submit">
							提交
						</Button>
					</Item>
				</Form>
			</Card>
		)
	}
}
