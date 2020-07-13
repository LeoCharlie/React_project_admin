import React, { Component } from 'react'
import {Card,Form,Select,Button} from 'antd'
import {reqAllCourse} from '@/api/edu/course'
import {getChapterList} from '@/pages/Edu/Chapter/redux'
import {connect} from 'react-redux'
import PubSub from 'pubsub-js'
import './index.less'
const {Item} = Form
const {Option} = Select

@connect(
	()=>({}),
	{getChapterList}
)
class Search extends Component {
	state = {
		courseList:[]//所有课程信息
	}
	componentDidMount(){
		//获取所有课程信息
		this.getAllCourse()
	}
	//请求所有课程信息
	getAllCourse = async()=>{
		let result = await reqAllCourse()
		this.setState({courseList:result})
	}
	//表单校验成功的回调
	onFinish = async(values)=>{
		values.page = 1
		values.pageSize = 5
		this.props.getChapterList(values)
		//清空掉expandedIds
		PubSub.publish('clearExpandedIds');
	}
	//重置表单
	resetForm = ()=>{
		this.form.resetFields()
	}
	render() {
		const {courseList} = this.state
		return (
			<Card style={{height:100}}>
				<Form
					ref={(current)=>this.form = current}
					layout="inline"
					// 每个Item的默认值对应一个对象
					initialValues={{courseId:''}}
					onFinish={this.onFinish}
				>
					<Item
						label="选择课程"
						name="courseId"
						labelCol={{span:8}}
						wrapperCol={{span:16}}
						rules={[{required:true,message:"保修选择一个课程"}]}
					>
						<Select style={{width:200}}>
							<Option key="0" value="">请选择课程</Option>
							{
								courseList.map((course)=>(
									<Option key={course._id} value={course._id}>{course.title}</Option>
								))
							}
						</Select>
					</Item>
					<Item wrapperCol={{offset:10}}>
						<Button type="primary" htmlType="submit">搜索</Button>
					</Item>
					<Item wrapperCol={{offset:10}}>
						<Button onClick={this.resetForm}>重置</Button>
					</Item>
				</Form>
			</Card>
		)
	}
}
export default Search