import { GET_COURSE,
         UPDATE_SEARCH_INPUT,
         CREATE_COURSE,
         GET_COURSES,
         SET_DRAFT_COURSE,
         UPDATE_COURSE,
         UPDATE_COURSE_APPROVE_STATUS,
         DROP_COURSE } from "../constants/courses";

import Courses from '../../components/plugs/courses_plug'

let initialState = {
  courses: [],
  searchInput: '',
  currentCourse: Courses[0],
  currentDraftCourse: {},
};

const CourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSES: {
      return { ...state, courses: action.value, currentCourse: action.value[0] }
    }
    case DROP_COURSE: {
      return { ...state, courses: action.value }
    }
    case UPDATE_COURSE_APPROVE_STATUS: {
      return { ...state, courses: [...state.courses.filter(el => el.id !== action.value.id), action.value] }
    }
    case GET_COURSE: {
      return { ...state, currentCourse: state.courses.find(el => el.id === action.value) };
    }
    case UPDATE_SEARCH_INPUT: {
      return { ...state, searchInput: action.value}
    }
    case UPDATE_COURSE: {
      console.log(action.value)
      return { ...state, courses: [ action.value, ...state.courses.filter(el => el.id !== action.value.id)],
              currentDraftCourse: action.value, currentCourse: action.value }
    }
    case CREATE_COURSE: {
      return {...state, courses: [ action.value, ...state.courses], currentDraftCourse: action.value }
    }
    case SET_DRAFT_COURSE: {
      return { ...state, currentDraftCourse: state.courses.find(el => el.id === action.value) }
    }
    default:{
      return state;
    }
  }
};

export default CourseReducer;