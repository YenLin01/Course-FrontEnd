import React from "react";
import { useState } from "react";
import NoteService from "../services/note.service";
import { useNavigate } from "react-router-dom";

const Notecomponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [month, setMonth] = useState("");
  let [date, setDate] = useState("");
  let [message, setMessage] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const handleMonth = (e) => {
    setMonth(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const postNote = () => {
    NoteService.post(title, content, month, date)
      .then(() => {
        window.alert("新稱筆記成功將導向記事本頁面");
        navigate("../note");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      {message && (
        <div className="alert alert-warning" role="alert">
          {message}
        </div>
      )}
      {currentUser && (
        <div className="form-group">
          <label htmlFor="exampleforTitle">記事標題</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleTitle}
          />
          <br />
          <label htmlFor="exampleforContent">內容：</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleContent}
          />
          <br />
          <label htmlFor="exampleforPrice">月份</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleMonth}
          />
          <br />
          <label htmlFor="exampleforPrice">日期</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleDate}
          />
          <br />
          <button className="btn btn-primary" onClick={postNote}>
            交出表單
          </button>
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default Notecomponent;
