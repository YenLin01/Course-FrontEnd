import axios from "axios";
const API_URL = "https://courseweb-backend.onrender.com/api/course";
// const API_URL = "http://localhost:8080/api/course/";

function getToken() {
  let token;
  if (localStorage.getItem("user")) {
    token = JSON.parse(localStorage.getItem("user")).token;
  } else {
    token = null;
  }
  return token;
}

class CourseService {
  post(title, description, price) {
    return axios.post(
      API_URL,
      { price, title, description },
      { headers: { Authorization: getToken() } }
    );
  }
  getAllCourse() {
    return axios.get(API_URL, { headers: { Authorization: getToken() } });
  }

  deleteStudent(courseID, studentID) {
    return axios.post(
      API_URL + "deleteStudent",
      { courseID, studentID },
      { headers: { Authorization: getToken() } }
    );
  }

  getCourseById(_id) {
    return axios.get(API_URL + _id, { headers: { Authorization: getToken() } });
  }

  getCourseByName(name) {
    return axios.get(API_URL + "findByName/" + name, {
      headers: {
        Authorization: getToken(),
      },
    });
  }

  updateCourseDetail(course_id, title, description) {
    return axios.post(
      API_URL + "/updateDetail",
      { course_id, title, description },
      { headers: { Authorization: getToken() } }
    );
  }

  getEnrollCourse(_id) {
    return axios.get(API_URL + "student/" + _id, {
      headers: {
        Authorization: getToken(),
      },
    });
  }

  enroll(_id) {
    return axios.post(
      API_URL + "enroll/" + _id,
      { _id },
      { headers: { Authorization: getToken() } }
    );
  }

  get(_id) {
    return axios.get(API_URL + "instructor/" + _id, {
      headers: {
        Authorization: getToken(),
      },
    });
  }
}

export default new CourseService();
