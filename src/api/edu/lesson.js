//所有课时相关的请求都在此发出
import request from "@/utils/request";

const BASE_URL = "/admin/edu/lesson";

// 获取某章节下属所有的课时列表
export function reqAllLessonByChapter(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",
  });
}
