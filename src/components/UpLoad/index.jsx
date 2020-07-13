import React, { Component } from 'react'
import { Upload as AntdUpload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const MAX_VIDEO_SIZE = 1024 * 1024  * 8 //视频文件大小不能超过8MB
export default class Upload extends Component {
    /* 
		上传前的准备：
				1.限制上传文件的格式(视频格式)
				2.限制上传文件的大小
    */
   beforeUpload = (file)=>{
        /* 
            file:
                lastModified: 1592457451155 //最后修改时间(时间戳)
                lastModifiedDate: Thu Jun 18 2020 13:17:31 GMT+0800 (中国标准时间) {} //最后修改日期
                name: "video2.mp4" //文件原始名
                size: 892927 //文件大小(字节为单位)
                type: "video/mp4" //文件类型
                uid: "rc-upload-1594544550454-2" //antd帮我们给文件起的名字(唯一)
        */
        return new Promise((resolve,reject)=>{
            if(file.size > MAX_VIDEO_SIZE){
                reject('视频大小超过8MB，禁止上传')
                message.error('视频大小超过8MB，禁止上传')
            }else{
                resolve(file)
            }
        })
    }
    render() {
        return (
            <AntdUpload
				accept='video/mp4'
				beforeUpload={this.beforeUpload}
			>
				<Button>
					<UploadOutlined />点击上传
				</Button>
			</AntdUpload>
        )
    }
}
