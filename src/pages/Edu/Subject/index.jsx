import React, { Component } from 'react'
import { Card,Button,Table } from 'antd';
import { PlusOutlined,FormOutlined,DeleteOutlined } from '@ant-design/icons';
import {reqNo1SubjectPagination,reqAllNo2SubjectById} from '@/api/edu/subject'
import './index.less'

export default class Subject extends Component {

	state = {
		pageSize:5,//页大小
		expandIds:[],//当前展开的菜单
		no1SubjectInfo:{ //一级分类信息
			total:0,//总数
			items:[]//当前页的数据
		},
		
	}

	//根据页码、页大小请求一级分类数据(分页)
	getNo1SubjectPagination = async(page,pageSize=this.pageSize)=>{
		// 清空当前页展开的一级分类数组
		this.setState({expandIds:[]})
		let result = await reqNo1SubjectPagination(page,pageSize)
		const {total,items} = result
		// 加工items给一级分类追加children属性，为了可以展开
		items.map(item=>{
			item.children=[]
			return item
		})
		this.setState({no1SubjectInfo:{total:total,items:items}})
	}

	componentDidMount(){
		//请求一级分类数据(分页)
		this.getNo1SubjectPagination(1)
	}
	handleExpanded = async (ids)=>{
		const {expandIds,no1SubjectInfo} = this.state
		// 获取当前展开的一级分类id
		const id = ids[ids.length-1]
		const findSubject = no1SubjectInfo.items.find(item=>item._id===id)
		// 只有展开才请求
		if(expandIds.length<ids.length){
			// 如果已经存在children，就不再请求
			if(findSubject.children　&&　!findSubject.children.length){
				const secondArr = await reqAllNo2SubjectById(id)
				const newNo1 = no1SubjectInfo.items.map(item=>{
					if(item._id === id){
						item.children = [...secondArr.items]
						if(!secondArr.items.length) delete item.children
					}
					return item
				})
				const {total} = no1SubjectInfo
				this.setState({
					no1SubjectInfo:{total, items:newNo1}
				})
			}
		}
		this.setState({expandIds:ids})
	}
	render() {
		//从状态中获取一级分类数据
		const {no1SubjectInfo,pageSize,expandIds} = this.state

		const columns = [
			{ 
				title: '分类名', 
				dataIndex: 'title', //数据索引(该列展示什么信息)
				key: 'title', //每一列的唯一标识，保证唯一即可
				width:'70%',
			},
			{ 
				title: '操作', 
				align:'center',
				//dataIndex: '',//数据索引(改列展示什么信息)
				key: 'option',
				//render用于做高级渲染，当和dataIndex冲突的时候以render为主(暂时)
				render: () => (//render方法返回什么，就展示什么
					<>
						<Button type="primary" className="edit_btn" icon={<FormOutlined />}></Button>
						<Button type="danger" icon={<DeleteOutlined />}></Button>
					</>
				)    
			},
		];

		return (
			<Card 
				title={
					<Button type="primary" icon={<PlusOutlined/>}
					onClick={()=>{this.props.history.push('/edu/subject/add')}}>
						新建课程分类
					</Button>
				}
			>
				<Table
					rowKey="_id" //唯一标识
					pagination={{//分页器配置
                        pageSize,
                        total:no1SubjectInfo.total,
                        onChange: (page)=>{
                            this.getNo1SubjectPagination(page)
                        },
                        showSizeChanger:true,
                        pageSizeOptions:['1','3','5'],
                        onShowSizeChange:(current,pageSize)=>{
                            this.setState({pageSize},()=>{
                                this.getNo1SubjectPagination(1)
                            })
                            
                        }
					}}
					columns={columns} //表格中列的配置
					dataSource={no1SubjectInfo.items}//表格的数据源(存储数据的数组)
					expandable={{ //配置表格展开项
						// 适用于展开后进行其他业务逻辑，例如发请求。如果想让该项展开，需要有children属性
						onExpandedRowsChange:this.handleExpanded,
						expandedRowKeys:expandIds
						// expandedRowRender: record => {}, //此属性适用于展开该项身上固有的属性，而不是在此发请求
						// rowExpandable: record => record.name !== 'Not Expandable', //控制该项是否可以展开
					}}
				/>
			</Card>
		)
	}
}
