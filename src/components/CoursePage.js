import React, { useState } from "react";
import { useEffect } from "react";
import CourseService from "../services/course.service";
import courseService from "../services/course.service";

const CoursePage = ({ currentUser, setCurrentUser }) => {
  let [courseData, setCourseData] = useState("");
  let [updating, setUpdating] = useState("");
  let [updateTitle, setUpdateTitle] = useState("");
  let [updateDescription, setUpdateDescription] = useState("");
  let [toggle, setToggle] = useState(false);

  useEffect(() => {
    let courseID = JSON.parse(localStorage.getItem("CPage"));
    console.log(1);
    CourseService.getCourseById(courseID)
      .then((data) => {
        setCourseData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [toggle]);

  const courseHandler = () => {
    setUpdating(true);
    setUpdateTitle(courseData.title);
    setUpdateDescription(courseData.description);
  };
  const doneHandler = () => {
    setUpdating("");
    CourseService.updateCourseDetail(
      courseData._id,
      updateTitle,
      updateDescription
    ).then(() => {
      setToggle(!toggle);
    });

    // window.location.reload();
  };
  const titleHandler = (e) => {
    setUpdateTitle(e.target.value);
  };
  const descriptionHandler = (e) => {
    setUpdateDescription(e.target.value);
  };
  const studentHandler = (e) => {
    let noteItem = e.target.parentElement;
    noteItem.remove();
    courseService.deleteStudent(courseData._id, e.target.id);
  };
  return (
    <div>
      {currentUser.user.role == "student" && (
        <h1>此頁面為導師頁面，身分為學生則不可以進入</h1>
      )}
      {courseData && currentUser.user.role == "instructor" && (
        <div>
          <button onClick={courseHandler}>更新課程</button>

          <h1 style={{ margin: "1rem 0rem" }}>課程名稱:{courseData.title}</h1>
          {updating && (
            <div className="updateInput">
              <label htmlFor="username">新的課程名稱：</label>
              <input
                defaultValue={courseData.title}
                type="text"
                onChange={titleHandler}
                className="form-control"
                name="email"
              />
            </div>
          )}

          <h3>課程介紹:{courseData.description}</h3>
          {updating && (
            <div className="updateInput">
              <label htmlFor="username">新的課程介紹：</label>
              <input
                defaultValue={courseData.description}
                type="text"
                onChange={descriptionHandler}
                className="form-control"
                name="email"
              />
            </div>
          )}

          {updating && <button onClick={doneHandler}>完成</button>}
          <h3 style={{ margin: "2rem 0rem" }}>
            講師:{courseData.instructor.username}
          </h3>

          <h3>目前學生:</h3>
          <div
            className="container-lg studentCard"
            style={{ paddingTop: "2rem" }}
          >
            {courseData.students.map((student, index) => {
              return (
                <div key={index}>
                  <p>學生姓名: {student.username}</p>
                  <p>學生email: {student.email}</p>
                  <button
                    courseid={courseData._id}
                    id={student._id}
                    onClick={studentHandler}
                  >
                    刪除學生
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
