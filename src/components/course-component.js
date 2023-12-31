import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  let Navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [message, setMessage] = useState("");

  const backHandler = () => {
    Navigate("/");
  };

  const courseHandler = (e) => {
    localStorage.setItem("CPage", JSON.stringify(e.target.id));
  };

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        CourseService.get(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            setMessage(e.response.data);
          });
      } else if (currentUser.user.role == "student") {
        _id = currentUser.user._id;
        CourseService.getEnrollCourse(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            setMessage(e.response.data);
          });
      }
    }
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {message && <div className="alert alert-danger">{message}</div>}
      {!currentUser && (
        <div>
          <p>您必須先登錄。</p>
          <button className="btn btn-primary btn-lg" onClick={backHandler}>
            返回首頁
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>歡迎來到講師的課程頁面。</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>歡迎來到學生的課程頁面。</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course, index) => {
            return (
              <div
                className="card"
                key={index}
                style={{ width: "18rem", margin: "1rem" }}
              >
                <div className="card-body courseCard">
                  <div>
                    <h5 className="card-title">課程名稱: {course.title}</h5>
                    <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                      {course.description}
                    </p>
                    <p style={{ margin: "0.5rem 0rem" }}>
                      學生人數: {course.students.length}
                    </p>
                    <p style={{ margin: "0.5rem 0rem" }}>
                      課程價格: {course.price}
                    </p>
                  </div>
                  {currentUser.user.role == "instructor" && (
                    <Link
                      data={course}
                      onClick={courseHandler}
                      to="/eachCourse"
                      className=" card-text  btn  btn-primary "
                      id={course._id}
                    >
                      進入課程
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
