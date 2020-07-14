import React, { Component } from 'react'
import {Card,Button,Alert,Table,Tooltip,Modal} from 'antd'
import {getLessonListByChapter,getChapterListSync} from '@/pages/Edu/Chapter/redux'
import {
	PlusOutlined,
	FullscreenOutlined,
	FullscreenExitOutlined,
	ReloadOutlined,
	SettingOutlined,
	FormOutlined,
	DeleteOutlined,
	EyeOutlined
} from '@ant-design/icons';
import './index.less'
import {connect} from 'react-redux'
import PubSub from 'pubsub-js'
import screenfull from 'screenfull'
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import {withRouter} from 'react-router-dom'

@connect(
	state=>({
		chapterInfo:state.chapterInfo
	}),
	{getLessonListByChapter,getChapterListSync}
)
@withRouter
class List extends Component {

	state={
		expandedIds:[], //展开了哪些菜单
		isFull:false, //用于标识是否处于全屏状态
		visibleVideo:false,
		videoInfo:{
			title:'',
			url:''
		}
	}
	componentDidMount(){
		PubSub.subscribe('clearExpandedIds',()=>{
			this.setState({expandedIds:[]})
		})
		//检测浏览器页签变化===>无论使用哪一种方式让页签全屏，都会被screenfull检测到
		screenfull.on('change',()=>{
			//屏幕全屏发生变化时，调用该回调
			const {isFull} = this.state
			this.setState({isFull:!isFull})
		})
	}
	componentWillUnmount(){
		PubSub.unsubscribe('clearExpandedIds')
		this.props.getChapterListSync({total:0,items:[]})
	}
	handleExpanded = (expandedIds)=>{
		//从状态中获取expandedKeys
		const {expandedIds:keys} = this.state
		const {chapterInfo} = this.props
		//判断是展开还是折叠，展开再发请求
		if(keys.length < expandedIds.length){
			//获取当前展开章节的_id
			const id =  expandedIds.slice(-1)[0]
			//获取当前展开的章节
			const currentChapter  = chapterInfo.items.find((chapterObj)=> chapterObj._id === id)
			if(!currentChapter.children.length) this.props.getLessonListByChapter(id)
		}
		//将当前的展开项的id数组，维护进状态
		this.setState({expandedIds})
	}
	handleFullScreen = ()=>{
		screenfull.toggle(this.refs.demo) //切换全屏
	}
	handleCancel = ()=>{
		this.setState({visibleVideo:false})
	}
	showVideo = ({title,video})=>{
		this.setState({visibleVideo:true,videoInfo:{title,url:video}})
	}
	render() {
			const {expandedIds,visibleVideo,videoInfo} = this.state
			//表格列的配置
			const columns = [
				{ 
					title: '章节名称',
					dataIndex: 'title',
					key: 'title',
					width:'40%'
				},
				{ 
					title: '是否免费', 
					//dataIndex: 'free',
					key: 'free', 
					render:(item)=>(
						"free" in item ? item.free ? '是' : '否' : ''
					)
				},
				{ 
					title: '视频', 
					//dataIndex: 'video', 
					key: 'video',
					render:(item)=> 'video' in item ? 
					<Button onClick={()=>this.showVideo(item)} icon={<EyeOutlined />}></Button> : ''
				},
				{ 
					title: '操作', 
					align:'center',
					//dataIndex: '_id',//数据索引(改列展示什么信息)
					key: 'option',
					render:(item)=>(
						<>
							{ "free" in item ? "" : 
								<Tooltip placement="top" title="新增课时">
									<Button 
											onClick={()=>this.props.history.push('/edu/chapter/addlesson',item._id)}
											type="primary" 
											className="edit_btn" 
											icon={<PlusOutlined />}
									>
									</Button>
								</Tooltip>
							}
							<Tooltip placement="top" title="编辑">
								<Button 
										type="primary" 
										className="edit_btn" 
										icon={<FormOutlined />}
								>
								</Button>
							</Tooltip>
							<Tooltip placement="top" title="删除">
								<Button 
									type="danger" 
									icon={<DeleteOutlined />}
								></Button>
							</Tooltip>
						</>
					)
				},
			];
			// 获取redux中传递过来的数据
			const data = this.props.chapterInfo.items

		return (
			<div ref="demo" className="wraper">
				<Card 
					title="课程章节列表"
					extra={
						<>
							<Button type="primary" icon={<PlusOutlined />}>新增章节</Button>		
							<Button className="batch_delete_btn" type="danger">批量删除</Button>
							<Button 
								size="large"
								onClick={this.handleFullScreen}
								className="option_btn" 
								type="link" 
								icon={this.state.isFull ? <FullscreenExitOutlined/> : <FullscreenOutlined/>}
							></Button>
							<Button className="option_btn" type="link" icon={<ReloadOutlined />}></Button>
							<Button className="option_btn" type="link" icon={<SettingOutlined />}></Button>
						</>
					}
					className="chapter_list"
				>
					<Alert message="已选择0项" type="info" />
					<Table
						className="table_list"
						rowKey="_id" //唯一标识
						columns={columns} //表格中列的配置
						dataSource={data}//表格的数据源(存储数据的数组)
						expandable={{ //配置展开属性
							onExpandedRowsChange:this.handleExpanded,
							expandedRowKeys:expandedIds
						}}
						rowSelection={{
							onChange:(a,b)=>console.log('onChange',a),
							// onSelect:(a,b,c,d)=>console.log(a,b,c,d),
							// onSelectAll:(a,b,c)=>console.log(a,b,c)
						}}
					/>
				</Card>
				<Modal
					footer={null}
					destroyOnClose={true}
					title={videoInfo.title} //弹窗标题
					visible={visibleVideo} //控制弹窗隐藏还是显示
					//onOk={this.handleOk}//确认按钮的回调
					onCancel={this.handleCancel}//取消按钮的回调
					>
					<Player>
						<source src={videoInfo.url} />
					</Player>
				</Modal>
			</div>
		)
	}
}
export default List
