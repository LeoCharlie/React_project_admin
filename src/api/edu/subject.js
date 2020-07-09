// 课程分类相关的请求

import request from "@/utils/request";

const BASE_URL = "/admin/edu/subject";

// 获取课程一级分类数据(分页)
export function reqNo1SubjectPagination(page,pageSize){
    return request(`${BASE_URL}/${page}/${pageSize}`)
}
// 获取某一级分类的二级分类(分页)
export function reqAllNo2SubjectById(parentId) {
    return request(`${BASE_URL}/get/${parentId}`);
  }