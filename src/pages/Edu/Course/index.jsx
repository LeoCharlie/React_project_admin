import React, { Component } from 'react';
import CourseList from './components/CourseList'
import SearchCourse from './components/SearchCourse'
class Course extends Component {
  render() {
    return (
      <div>
        <SearchCourse></SearchCourse>
        <CourseList></CourseList>
      </div>
    );
  }
}

export default Course;