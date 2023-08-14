import axios from "axios";
const API_URL = "https://courseweb-backend.onrender.com/api/note/";

function getToken() {
  let token;
  if (localStorage.getItem("user")) {
    token = JSON.parse(localStorage.getItem("user")).token;
  } else {
    token = null;
  }
  return token;
}

class NoteService {
  post(title, content, month, date) {
    return axios.post(
      API_URL,
      { title, content, month, date },
      { headers: { Authorization: getToken() } }
    );
  }

  get(_id) {
    return axios.get(API_URL + _id, { headers: { Authorization: getToken() } });
  }

  updateStateDone(data) {
    return axios.post(
      API_URL + "state",
      { data },
      { headers: { Authorization: getToken() } }
    );
  }

  cancelDone(data) {
    return axios.post(
      API_URL + "cancelDone",
      { data },
      { headers: { Authorization: getToken() } }
    );
  }

  todoToday() {
    return axios.post(
      API_URL + "todoToday",
      {},
      {
        headers: { Authorization: getToken() },
      }
    );
  }
  expired() {
    return axios.post(
      API_URL + "expired",
      {},
      {
        headers: { Authorization: getToken() },
      }
    );
  }

  deleteNote(_id) {
    return axios.post(
      API_URL + "delete",
      { _id },
      { headers: { Authorization: getToken() } }
    );
  }
}

export default new NoteService();
