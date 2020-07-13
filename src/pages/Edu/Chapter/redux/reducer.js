import {GET_CHAPTER_LIST,GET_LESSON_LIST_BY_CHAPTER} from './constants'

const initState={
    total:0,
    items:[]
}

export default function chapterInfo (preState = initState,action){
    const {type,data} = action
    switch (type) {
        case GET_CHAPTER_LIST:
            let {total,items} = data
            // 给每个章节添加children属性来展开
            items.map((item)=>{
                item.children=[]
                return item
            })
            return {total,items}
        //如果是获取课时列表
		case GET_LESSON_LIST_BY_CHAPTER:
			/* 
				1.不能暴力的替换chapterInfo
				2.要拿到展开的那个章节的id
				3.给对应的章节中的children属性加入课时数组数据
			*/
			const {chapterId,lessonList} = data
			let {total:pretotal,items:preitems} = preState
			//在众多章节中查找到，展开的那个章节，给children加数据
			preitems = preitems.map((chapterObj)=>{
				if(chapterId === chapterObj._id) chapterObj.children = [...lessonList]
				return chapterObj
			})
			return {total:pretotal,items:preitems}
		//如果是初始化
        default:
            return preState
    }
}