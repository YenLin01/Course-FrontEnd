import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import noteService from "../services/note.service";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  let [expired, setExpired] = useState("");
  let [todoToday, setTodoToday] = useState("");

  useEffect(() => {
    noteService.todoToday().then((data) => {
      setTodoToday(data.data);
    });
    noteService.expired().then((data) => {
      setExpired(data.data);
    });
  }, []);
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>在獲取您的個人資料之前，您必須先登錄。</div>}
      {currentUser && (
        <div>
          <h2>以下是您的個人檔案：</h2>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>姓名：{currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您的用戶ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您註冊的電子信箱: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>身份: {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {currentUser && (
        <div>
          <h1>今日代辦事項</h1>
          <div className="container text-center ">
            <div className="row row-cols-auto">
              {todoToday.map((todo, index) => {
                return (
                  <div className="col homepageMsg" key={index}>
                    {todo.title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {currentUser && (
        <div>
          <h1>過期事項</h1>
          <div className="container text-center ">
            <div className="row row-cols-auto">
              {expired.map((expire, index) => {
                return (
                  <div className="col homepageMsg" key={index}>
                    {expire.title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
